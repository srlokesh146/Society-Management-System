import React, { useState } from 'react';

export default function AddResidentModal({ isOpen, onClose, onSave }) {
  const [residentStatus, setResidentStatus] = useState('Occupied');

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
        <div className="bg-white rounded-lg p-6 max-w-[410px] w-full">
          <h3 className="text-[20px] font-semibold pb-[10px]">Add Resident</h3>
          <div className='border-[1px] border-[#F4F4F4] mb-[20px]'></div>
          
          <div className="mb-[20px]">
            <h4 className="text-sm font-medium mb-2">Resident Status</h4>
            <div className="flex justify-between">
              <label className="flex items-center border rounded-[10px] w-[175px] py-[10px] px-[15px] h-[42px]">
                <input
                  type="radio"
                  value="Occupied"
                  checked={residentStatus === 'Occupied'}
                  onChange={(e) => setResidentStatus(e.target.value)}
                  className="mr-2"
                />
                <span className={`rounded-lg py-2 px-4 cursor-pointer ${residentStatus === 'Occupied' ? 'text-black' : 'bg-white'}`}>
                  Occupied
                </span>
              </label>
              <label className="flex items-center border rounded-[10px] w-[175px] py-[10px] px-[15px] h-[42px]">
                <input
                  type="radio"
                  value="Vacate"
                  checked={residentStatus === 'Vacate'}
                  onChange={(e) => setResidentStatus(e.target.value)}
                  className="mr-2"
                />
                <span className={`rounded-lg py-2 px-4 cursor-pointer ${residentStatus === 'Vacate' ? 'text-black' : 'bg-white'}`}>
                Vacate
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-between mt-4 flex-col sm:flex-row">
            <button
              onClick={onClose}
              className="py-[13.5px] px-[58.5px] rounded-[10px] border border-gray-300 w-full text-black leading-[27px] mr-[20px] mb-4 sm:mb-0"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-custom-gradient text-white py-[12px] px-[57.5px] rounded-[10px] w-full font-semibold leading-[27px]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
  );
}
