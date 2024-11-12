import React from "react";
import { FaTimes } from "react-icons/fa";

const ViewRequestModal = ({ isOpen, onClose, Request }) => {
  if (!isOpen) return null;
  let avatar = "https://mighty.tools/mockmind-api/content/human/65.jpg";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">View Request</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* User Info Section */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src={avatar}
              alt={Request.requester}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {Request.requester}
              </h3>
              <p className="text-sm text-gray-500">
                {new Date(Request.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Request Details */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Request Name
              </label>
              <p className="mt-1 text-base font-medium text-gray-900">
                {Request.name}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-500">
                Description
              </label>
              <p className="mt-1 text-base text-gray-900">
                {Request.description}
              </p>
            </div>

            <div className="flex gap-12">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Wing
                </label>
                <p className="mt-1 text-base font-medium text-[#5678E9]">
                  {Request.wing || "A"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Unit
                </label>
                <p className="mt-1 text-base font-medium text-gray-900">
                  {Request.unit || "1002"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Priority
                </label>
                <p className="mt-1">
                  <span className="px-3 py-1 text-sm font-medium text-white bg-[#5678E9] rounded-full">
                    {Request.priority || "Medium"}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  Status
                </label>
                <p className="mt-1">
                  <span className="px-3 py-1 text-sm font-medium text-[#5678E9] bg-[#5678E91A] rounded-full">
                    {Request.status || "Open"}
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

export default ViewRequestModal;
