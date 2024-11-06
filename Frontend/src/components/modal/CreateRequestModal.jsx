import React, { useState } from 'react';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';

const CreateRequestModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [formData, setFormData] = useState({
    requesterName: '',
    requestName: '',
    date: '',
    wing: '',
    unit: ''
  });

  // Check if form is valid
  const isFormValid = () => {
    return formData.requesterName && 
           formData.requestName && 
           formData.date &&
           formData.wing && 
           formData.unit && 
           selectedPriority && 
           selectedStatus;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const RequestData = {
      requesterName: formData.get('requesterName'),
      requestName: formData.get('requestName'),
      description: formData.get('description'),
      wing: formData.get('wing'),
      unit: formData.get('unit'),
      priority: selectedPriority,
      status: selectedStatus
    };

    onSubmit(e, RequestData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Create Request</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Complainant Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requester Name*
            </label>
            <input
              type="text"
              name="requesterName"
              value={formData.requesterName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-orange-500"
              placeholder="Enter name"
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
              name="requestName"
              className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-orange-500"
              placeholder="Enter name"
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
                value={formData.date}
                onChange={handleInputChange}
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
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-orange-500"
                placeholder="Enter wing"
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
                className="w-full p-2 border border-gray-300 rounded-md outline-none focus:border-orange-500"
                placeholder="Enter unit"
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
              {['High', 'Medium', 'Low'].map((priority) => (
                <label key={priority} className="flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={priority}
                    checked={selectedPriority === priority}
                    onChange={() => setSelectedPriority(priority)}
                    className="hidden"
                    required
                  />
                  <span className={`flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-md text-sm cursor-pointer
                    ${selectedPriority === priority ? 'border-orange-500 bg-orange-50' : ''}
                    hover:border-orange-500 transition-all duration-200`}
                  >
                    <div className={`w-3 h-3 rounded-full border-2 
                      ${selectedPriority === priority ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}
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
              {['Open', 'Pending', 'Solve'].map((status) => (
                <label key={status} className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={() => setSelectedStatus(status)}
                    className="hidden"
                    required
                  />
                  <span className={`flex items-center gap-2 px-4 py-1.5 border border-gray-300 rounded-md text-sm cursor-pointer
                    ${selectedStatus === status ? 'border-orange-500 bg-orange-50' : ''}
                    hover:border-orange-500 transition-all duration-200`}
                  >
                    <div className={`w-3 h-3 rounded-full border-2 
                      ${selectedStatus === status ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}
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
              className="w-full px-4 py-3 text-md font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`w-full px-4 py-3 text-md font-medium rounded-md transition-all duration-300
                ${isFormValid() 
                  ? 'bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white hover:opacity-90' 
                  : 'bg-[#F6F8FB] text-black'
                }`}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequestModal;