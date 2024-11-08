import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";

export default function AddResidentModal({ isOpen, onClose, onSave, resident }) {
  const [selectedStatus, setSelectedStatus] = useState('Occupied');
  const [showVacateModal, setShowVacateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [wing, setWing] = useState('A');
  const [unit, setUnit] = useState('1001');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setResidentStatus(e.target.value);
  };

  const handleSave = () => {
    if (selectedStatus === 'Occupied') {
      navigate('/ownerform', { 
        state: { 
          mode: 'edit',
          residentData: resident 
        } 
      });
      onClose();
    } else if (selectedStatus === 'Vacate') {
      setShowVacateModal(true);
    }
  };

  // Confirmation Modal Component
  const ConfirmationModal = () => {
    if (!showConfirmModal) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center z-[70]">
        <div className="bg-white rounded-lg p-6 w-full max-w-md min-h-[200px] flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-medium mb-2">
              Do you want to vacate the finlay flat?
            </h2>
            <p className="text-gray-500 text-sm">
              Are you sure you want to delete all details?
            </p>
          </div>

          <div className="flex justify-end gap-4 mt-auto pt-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="w-[200px] h-[45px] border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave({ status: 'Vacate', wing, unit });
                setShowConfirmModal(false);
                setShowVacateModal(false);
                onClose();
              }}
              className="w-[200px] h-[45px] bg-[#E74C3C] text-white rounded-lg hover:bg-[#E74C3C]"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Vacate Modal Component
  const VacateModal = () => {
    if (!showVacateModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-medium mb-6">
            Residence Status
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Wing Dropdown */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Wing<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  value={wing}
                  onChange={(e) => setWing(e.target.value)}
                  className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] appearance-none bg-white"
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
                <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Unit Dropdown */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Unit<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] appearance-none bg-white"
                >
                  <option value="1001">1001</option>
                  <option value="1002">1002</option>
                  <option value="1003">1003</option>
                </select>
                <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex  justify-between gap-4">
            <button
              onClick={() => setShowVacateModal(false)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowConfirmModal(true)}
              className="flex-1 px-4 py-2 bg-custom-gradient text-white rounded-lg hover:bg-[#FF5500]"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Handle closing both modals
  const handleClose = () => {
    setShowVacateModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* First Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-medium mb-6">
            Residence Status
          </h2>
          
          {/* Status Options */}
          <div className="flex gap-4 mb-6">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
                selectedStatus === 'Occupied' 
                  ? 'border-[#FF6B07] bg-white text-[#FF6B07]' 
                  : 'border-gray-200'
              }`}
              onClick={() => setSelectedStatus('Occupied')}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedStatus === 'Occupied' ? 'border-[#FF6B07]' : 'border-gray-300'
              }`}>
                {selectedStatus === 'Occupied' && (
                  <div className="w-2 h-2 bg-[#FF6B07] rounded-full"></div>
                )}
              </div>
              Occupied
            </button>

            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
                selectedStatus === 'Vacate' 
                  ? 'border-[#FF6B07] bg-white text-[#FF6B07]' 
                  : 'border-gray-200'
              }`}
              onClick={() => setSelectedStatus('Vacate')}
            >
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                selectedStatus === 'Vacate' ? 'border-[#FF6B07]' : 'border-gray-300'
              }`}>
                {selectedStatus === 'Vacate' && (
                  <div className="w-2 h-2 bg-[#FF6B07] rounded-full"></div>
                )}
              </div>
              Vacate
            </button>
          </div>

          {/* Info Text */}
          <p className="text-sm text-gray-500 mb-6 flex items-start gap-2">
            <span className="text-[#FF6B07] text-lg">•</span>
            By submitting, you agree to select Occupied
          </p>

          {/* Action Buttons */}
          <div className="flex justify-between gap-4">
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-custom-gradient text-white rounded-lg hover:bg-[#FF5500]"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Vacate Modal */}
      <VacateModal />

      {/* Confirmation Modal */}
      <ConfirmationModal />
    </>
  );
}