import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VacateModal from "./VacateModal"; // Keep this import
import ConfirmationModal from "./ConfirmationModal";

export default function AddResidentModal({ isOpen, onClose, onSave, resident, setShowVacateModal }) {
  const [selectedStatus, setSelectedStatus] = useState("Occupied");
  const navigate = useNavigate();

  const handleSave = () => {
    if (selectedStatus === "Occupied") {
      navigate("/ownerform", {
        state: {
          mode: "edit",
          residentData: resident,
        },
      });
      onClose();
    } else if (selectedStatus === "Vacate") {
      onClose();
      setShowVacateModal(true)
    }
  };

  const handleClose = () => {
    setShowVacateModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* First Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-lg p-6 w-full max-w-[410px]">
          <h2 className="text-lg font-semibold mb-[10px]">Residence Status</h2>
          <div className="border-b border-[#F4F4F4] mb-[30px]"></div>
          {/* Status Options */}
          <div className="flex gap-4 mb-6">
            <button

              className={`flex items-center gap-2 px-4 py-2 rounded-md border ${selectedStatus === "Occupied"
                ? "border-[#FF6B07] bg-white text-[#FF6B07]"
                : "border-gray-200"
                }`}
              onClick={() => setSelectedStatus("Occupied")}
              className={`flex w-48 items-center gap-2 px-4 py-2 rounded-md border ${selectedStatus === 'Occupied'
                  ? 'border-[#FF6B07] bg-white text-[#FF6B07]'
                  : 'border-gray-200'
                }`}
              onClick={() => setSelectedStatus('Occupied')}

            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedStatus === "Occupied" ? "border-[#FF6B07]" : "border-gray-300"
                  }`}
              >
                {selectedStatus === "Occupied" && (
                  <div className="w-2 h-2 bg-[#FF6B07] rounded-full"></div>
                )}
              </div>
              Occupied
            </button>

            <button

              className={`flex items-center gap-2 px-4 py-2 rounded-md border ${selectedStatus === "Vacate"
                ? "border-[#FF6B07] bg-white text-[#FF6B07]"
                : "border-gray-200"
                }`}
              onClick={() => setSelectedStatus("Vacate")}

              className={`flex w-48 items-center gap-2 px-4 py-2 rounded-md border ${selectedStatus === 'Vacate'
                  ? 'border-[#FF6B07] bg-white text-[#FF6B07]'
                  : 'border-gray-200'
                }`}
              onClick={() => setSelectedStatus('Vacate')}

            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedStatus === "Vacate" ? "border-[#FF6B07]" : "border-gray-300"
                  }`}
              >
                {selectedStatus === "Vacate" && (
                  <div className="w-2 h-2 bg-[#FF6B07] rounded-full"></div>
                )}
              </div>
              Vacate
            </button>
          </div>

          {/* Info Text */}
          <p className="text-sm text-gray-500 mb-6 flex items-start gap-2">
            <input type="checkbox" required className="w-4 h-4 text-[#FE512E] border-gray-300 rounded focus:ring-[#FE512E]" />
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


      {/* Confirmation Modal */}

    </>
  );
}
