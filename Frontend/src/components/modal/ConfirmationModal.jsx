import React from "react";

const ConfirmationModal = ({ showConfirmModal, onClose }) => {
  if (!showConfirmModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-full max-w-md min-h-[200px] flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-medium mb-2">
            Do you want to vacate the final flat?
          </h2>
          <p className="text-gray-500 text-sm">
            Are you sure you want to delete all details?
          </p>
        </div>

        <div className="flex justify-end gap-4 mt-auto pt-4">
          <button
            onClick={() => onClose()}
            className="w-[200px] h-[45px] border border-gray-200 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
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

export default ConfirmationModal;