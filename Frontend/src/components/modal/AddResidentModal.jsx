import React, { useState } from 'react';

export default function AddResidentModal({ isOpen, onClose, onSave }) {
  const [residentStatus, setResidentStatus] = useState('Occupied');

  const handleChange = (e) => {
    setResidentStatus(e.target.value);
  };

  const handleSave = () => {
    const newResident = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: '',
      unit: '',
      unitStatus: 'Occupied',
      residentStatus,
      phone: '',
      member: '',
      vehicle: '',
    };
    onSave(newResident);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[9999]">
        <div className="bg-white rounded-lg p-6 max-w-[420px] w-full">
          <h3 className="text-[20px] font-semibold pb-[10px]">Resident Status</h3>
          <div className='border-[1px] border-[#F4F4F4] mb-[20px]'></div>

          {/* Radio Button Group */}
          <div className="mb-[20px]">
            <div className="flex justify-between">
              {['Occupied', 'Vacate'].map((status) => (
                <label
                key={status}
                className={`flex items-center w-[175px] h-[41px] p-2 text-[14px] cursor-pointer rounded-[10px]
                  ${residentStatus === status ? 'text-white border-transparent border-2' : 'border border-gray-300'}`}
                style={residentStatus === status ? { 
                  borderImage: 'linear-gradient(90deg, #FE512E 0%, #F09619 100%) 1', 
                  borderRadius: '10px' 
                } : {}}
              >
                  <input
                    type="radio"
                    name="residentStatus"
                    value={status}
                    checked={residentStatus === status}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span
                    className={`h-[20px] w-[20px] rounded-full border-2 flex items-center justify-center ${residentStatus === status ? 'border-custom-gradient' : 'border-gray-300'}`}
                  >
                    {residentStatus === status && (
                      <span className="h-[12px] w-[12px] rounded-full bg-custom-gradient"></span>
                    )}
                  </span>
                  <span className={`ml-2 ${residentStatus === status ? 'font-semibold text-black ' : 'text-[#A7A7A7]'}`}>
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center mb-[20px]">
            <input
              type="checkbox"
              className="h-3 w-3 rounded border-2 border-gray-300 bg-custom-gradient cursor-pointer"
            />
            <label className="ml-2 text-[14px] text-[#A7A7A7]">
              By submitting, you agree to select the Occupied.
            </label>
          </div>

    
          <div className="flex justify-between mt-4 flex-col sm:flex-row">
            <button
              onClick={onClose}
              className="py-3 px-8 rounded-[10px] border border-gray-300 w-full text-black leading-[27px] sm:mr-4 mb-4 sm:mb-0"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-custom-gradient text-white py-3 px-8 rounded-[10px] w-full font-semibold leading-[27px]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
}
