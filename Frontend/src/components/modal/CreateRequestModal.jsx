import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const CreateRequestModal = ({ isOpen, onClose, onSubmit }) => {
  // Add form validation state
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [formData, setFormData] = useState({
    requesterName: '',
    requestName: '',
    description: '',
    wing: '',
    unit: '',
    priority: '',
    status: ''
  });

  // Check if all required fields are filled
  const checkFormFilled = (data) => {
    return data.requesterName.trim() !== '' &&
           data.requestName.trim() !== '' &&
           data.description.trim() !== '' &&
           data.wing.trim() !== '' &&
           data.unit.trim() !== '' &&
           data.priority.trim() !== '' &&
           data.status.trim() !== '';
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    setIsFormFilled(checkFormFilled(updatedFormData));
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        requesterName: '',
        requestName: '',
        description: '',
        wing: '',
        unit: '',
        priority: '',
        status: ''
      });
      setIsFormFilled(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Create Request</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FaTimes size={24} />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="requesterName"
                value={formData.requesterName}
                onChange={handleChange}
                placeholder="Requester Name*"
                className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            
            {/* Add other form fields similarly */}
            {/* ... */}

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full p-3 text-gray-700 bg-white border border-gray-200 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormFilled}
                className={`w-full p-3 text-sm font-medium rounded-lg transition-all duration-300
                  ${isFormFilled 
                    ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90' 
                    : 'bg-[#F6F8FB] text-black-400 cursor-not-allowed'}`}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequestModal;