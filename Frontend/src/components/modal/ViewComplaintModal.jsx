import React from 'react';
import { FaTimes } from 'react-icons/fa';

const ViewcomplaintModal = ({ isOpen, onClose, complaint }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">View complaint</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* User Info Section */}
          <div className="flex items-center gap-3 mb-6">
            <img 
              src={complaint.avatar || `https://ui-avatars.com/api/?name=${complaint.complainterName}`} 
              alt={complaint.complainterName} 
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{complaint.complainterName}</h3>
              {/* <p className="text-sm text-gray-500">{complaint.complaintDate || 'Aug 5, 2024'}</p> */}
            </div>
          </div>

          {/* complaint Details */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">complaint Name</label>
              <p className="mt-1 text-base font-medium text-gray-900">{complaint.complaintName}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">Description</label>
              <p className="mt-1 text-base text-gray-900">{complaint.description}</p>
            </div>

            <div className="flex gap-12">
              <div>
                <label className="text-sm font-medium text-gray-500">Wing</label>
                <p className="mt-1 text-base font-medium text-[#5678E9]">{complaint.wing || 'A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Unit</label>
                <p className="mt-1 text-base font-medium text-gray-900">{complaint.unit || '1002'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Priority</label>
                <p className="mt-1">
                  <span className="px-3 py-1 text-sm font-medium text-white bg-[#5678E9] rounded-full">
                    {complaint.priority || 'Medium'}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <p className="mt-1">
                  <span className="px-3 py-1 text-sm font-medium text-[#5678E9] bg-[#5678E91A] rounded-full">
                    {complaint.status || 'Open'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-[#F6F8FB] rounded-md hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewcomplaintModal;
