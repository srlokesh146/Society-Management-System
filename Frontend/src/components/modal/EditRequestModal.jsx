import React, { useState } from "react";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";

const EditRequestModal = ({ isOpen, onClose, Request, onSubmit }) => {
  if (!isOpen) return null;

  const [selectedPriority, setSelectedPriority] = useState(Request?.priority);
  const [selectedStatus, setSelectedStatus] = useState(Request?.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedRequest = {
      requester: formData.get("requester"),
      name: formData.get("name"),
      date: formData.get("date"),
      description: formData.get("description"),
      wing: formData.get("wing"),
      unit: formData.get("unit"),
      priority: selectedPriority,
      status: selectedStatus,
    };

    onSubmit(Request._id, updatedRequest);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-lg w-full max-w-[410px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Request</h2>
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
              name="requester"
              defaultValue={Request?.requester}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Request Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Request Name*
            </label>
            <input
              type="text"
              name="name"
              defaultValue={Request?.name}
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
              defaultValue={Request?.description}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date*
            </label>
            <div className="relative">
              <input
                type="date"
                name="date"
                defaultValue={
                  Request?.date
                    ? new Date(Request.date).toISOString().split("T")[0]
                    : ""
                }
                className="w-full p-2 pl-10 border border-gray-300 rounded-md outline-none focus:border-orange-500"
                required
              />
              <FaCalendarAlt
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
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
                defaultValue={Request?.wing}
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
                defaultValue={Request?.unit}
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
            <div className="flex justify-between gap-4">
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
                    className={`flex items-center gap-2 ps-4 py-1.5 border border-gray-300 rounded-[10px] w-[113px] text-sm cursor-pointer
                    ${selectedPriority === priority
                       ? "border-[#FF6B07] bg-white font-medium"
                        : "border-gray-200"
                      }
                    hover:border-orange-500 transition-all duration-200`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                      ${selectedPriority === priority
                          ? "border-[#FF6B07]"
                          : "border-gray-300"
                        }`}
                    >
                       {selectedPriority === priority && (
                        <div className="w-2 h-2 bg-[#FF6B07] rounded-[10px]"></div>
                      )}
                    </div>
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
            <div className="flex justify-between gap-4">
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
                    className={`flex items-center gap-2 ps-4 py-1.5 border border-gray-300 rounded-[10px] w-[113px] text-sm cursor-pointer
                    ${selectedStatus === status
                        ? "border-[#FF6B07] bg-white font-medium"
                        : ""
                      }
                    hover:border-orange-500 transition-all duration-200`}
                  >
                    <div
                      className={`w-4 h-4 rounded-[10px] border-2 flex items-center justify-center 
                      ${selectedStatus === status
                          ? "border-[#FF6B07]"
                          : "border-gray-300"
                        }`}
                    >
                      {selectedStatus === status && (
                        <div className="w-2 h-2 bg-[#FF6B07] rounded-[10px]"></div>
                      )}
                    </div>
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

export default EditRequestModal;
