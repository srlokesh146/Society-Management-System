import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[410px]">
        <h4 className="text-xl font-semibold mb-[10px] leading-[30px] text-[20px]">Delete Complaine?</h4>
        <div className="border-b border-[#F4F4F4] mb-[30px]"></div>
        <p className="mb-[20px] leading-[21px] text-[14px] text-[#A7A7A7]">Are you sure you want to delete this number?</p>
        <div className="flex justify-between">
          <button
            onClick={onClose} 
            className="py-[13.5px] px-[58.5px] rounded-[10px] border border-gray-300 w-full text-black leading-[27px] mr-[20px]"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onDelete(); 
              onClose(); 
            }}
            className="bg-custom-gradient text-white py-[12px] px-[57.5px] rounded-[10px] w-full font-semibold leading-[27px]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;