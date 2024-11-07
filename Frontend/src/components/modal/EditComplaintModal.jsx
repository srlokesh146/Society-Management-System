import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const EditComplaintModal = ({ isOpen, onClose, complaint, onSubmit }) => {
  if (!isOpen) return null;

  const [selectedPriority, setSelectedPriority] = useState(complaint?.priority);
  const [selectedStatus, setSelectedStatus] = useState(complaint?.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedComplaint = {
      complainer: formData.get("complainer"),
      name: formData.get("name"),
      description: formData.get("description"),
      unit: formData.get("unit"),
      wing: formData.get("wing"),
      priority: selectedPriority,
      status: selectedStatus,
    };

    onSubmit(complaint._id, updatedComplaint);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Complaint
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Complainant Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complainer Name*
            </label>
            <input
              type="text"
              name="complainer"
              defaultValue={complaint?.complainer}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Complaint Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complaint Name*
            </label>
            <input
              type="text"
              name="name"
              defaultValue={complaint?.name}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description*
            </label>
            <textarea
              name="description"
              defaultValue={complaint?.description}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Wing and Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wing*
              </label>
              <input
                type="text"
                name="wing"
                defaultValue={complaint?.wing}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit*
              </label>
              <input
                type="text"
                name="unit"
                defaultValue={complaint?.unit}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority*
            </label>
            <div className="flex gap-4">
              {["High", "Medium", "Low"].map((priority) => (
                <label key={priority} className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={selectedPriority === priority}
                    onChange={() => setSelectedPriority(priority)}
                    className="hidden"
                  />
                  <span
                    className={`flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-full text-sm cursor-pointer
                    ${
                      selectedPriority === priority
                        ? "border-orange-500 bg-orange-50"
                        : ""
                    }
                    hover:border-orange-500 transition-all duration-200`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 
                      ${
                        selectedPriority === priority
                          ? "border-orange-500 bg-orange-500"
                          : "border-gray-300"
                      }`}
                    ></div>
                    {priority}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status*
            </label>
            <div className="flex gap-4">
              {["Open", "Pending", "Solve"].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={() => setSelectedStatus(status)}
                    className="hidden"
                  />
                  <span
                    className={`flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-full text-sm cursor-pointer
                    ${
                      selectedStatus === status
                        ? "border-orange-500 bg-orange-50"
                        : ""
                    }
                    hover:border-orange-500 transition-all duration-200`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 
                      ${
                        selectedStatus === status
                          ? "border-orange-500 bg-orange-500"
                          : "border-gray-300"
                      }`}
                    ></div>
                    {status}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] rounded-md hover:opacity-90"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditComplaintModal;
