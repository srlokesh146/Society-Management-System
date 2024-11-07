import React, { useState } from 'react';
import { FaCheck, FaEye, FaTrash, FaPlus, FaPencilAlt, FaTimes, FaCalendarAlt, FaClock } from 'react-icons/fa';

const initialProtocols = [
  { id: 1, title: "Physical Security", description: "Implementing surveillance cameras in public spaces.", date: "11/01/2024", time: "3:45 PM" },
  { id: 2, title: "Cybersecurity", description: "Securing critical infrastructure, government systems.", date: "12/01/2024", time: "6:40 AM" },
  { id: 3, title: "Legal Measures", description: "Enforcing and updating laws and regulations.", date: "13/01/2024", time: "1:00 PM" },
  { id: 4, title: "Social Engagement", description: "Fostering collaboration between law enforcement.", date: "14/01/2024", time: "6:20PM" },
  { id: 5, title: "Education and Training", description: "Implementing surveillance cameras in public spaces.", date: "15/01/2024", time: "3:45 PM" },
  // Add more protocols as needed
];

function SecurityProtocols() {
  const [protocols, setProtocols] = useState(initialProtocols);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentProtocol, setCurrentProtocol] = useState(null);
  const [newProtocol, setNewProtocol] = useState({ title: '', description: '', date: '', time: '' });
  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleCreate = () => {
    setIsCreateOpen(true);
    setNewProtocol({ title: '', description: '', date: '', time: '' });
    setIsFormFilled(false);
  };

  const handleEdit = (protocol) => {
    setIsEditOpen(true);
    setCurrentProtocol(protocol);
    setNewProtocol({ ...protocol });
  };

  const handleView = (protocol) => {
    setIsViewOpen(true);
    setCurrentProtocol(protocol);
  };

  const handleDelete = (protocol) => {
    setIsDeleteOpen(true);
    setCurrentProtocol(protocol);
  };

  const handleSave = () => {
    if (isCreateOpen) {
      setProtocols([...protocols, { ...newProtocol, id: Date.now() }]);
    } else if (isEditOpen) {
      setProtocols(protocols.map(p => p.id === currentProtocol.id ? newProtocol : p));
    }
    setIsCreateOpen(false);
    setIsEditOpen(false);
  };

  const handleConfirmDelete = () => {
    setProtocols(protocols.filter(p => p.id !== currentProtocol.id));
    setIsDeleteOpen(false);
  };

  const checkFormFilled = (protocol) => {
    if (isCreateOpen) {
      return protocol.title.trim() !== '' && protocol.description.trim() !== '';
    }
    return protocol.title.trim() !== '' && protocol.description.trim() !== '' && 
           protocol.date.trim() !== '' && protocol.time.trim() !== '';
  };

  const handleProtocolChange = (field, value) => {
    const updatedProtocol = { ...newProtocol, [field]: value };
    setNewProtocol(updatedProtocol);
    setIsFormFilled(checkFormFilled(updatedProtocol));
  };

  return (
    <div className="container mx-auto p-4 sm:p-6  bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black-800">Security Protocols</h1>
        <button 
          onClick={handleCreate}
          className="px-4 py-2 bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)]  text-white rounded-md hover:opacity-90 flex items-center gap-2"
        >
           Create Protocol
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="  bg-indigo-50 ">
              <tr>
                {["Title", "Description", "Date", "Time", "Action"].map((header) => (
                  <th key={header} className="px-6 py-4 text-left text-md font-bold text-black-500">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {protocols.map((protocol) => (
                <tr key={protocol.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-[#4F4F4F]">{protocol.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm  font-medium text-[#4F4F4F]">{protocol.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-[#4F4F4F]">{protocol.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex px-3 py-1 text-sm text-[#4F4F4F] bg-[#F6F8FB] rounded-md">
                      {protocol.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleEdit(protocol)}
                        className="p-1.5 rounded-full bg-green-50 text-green-600 hover:bg-green-100"
                      >
                        <FaPencilAlt size={14} />
                      </button>
                      <button 
                        onClick={() => handleView(protocol)}
                        className="p-1.5 rounded-full  bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        <FaEye size={14} /> 
                      </button>
                      <button 
                        onClick={() => handleDelete(protocol)}
                        className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(isCreateOpen || isEditOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-2xl font-bold text-black">
                {isCreateOpen ? 'Create Protocol' : 'Edit Protocol'}
              </h2>
              <button onClick={() => {setIsCreateOpen(false); setIsEditOpen(false);}} className="text-gray-600 hover:text-gray-800">
                <FaTimes size={24} />
              </button>
            </div>
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newProtocol.title}
                  onChange={(e) => handleProtocolChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter protocol title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black-700 mb-1">Description</label>
                <textarea
                  value={newProtocol.description}
                  onChange={(e) => handleProtocolChange('description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Enter protocol description"
                />
              </div>

              {/* Date and Time inputs */}
              {isEditOpen && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-black-700 mb-1">Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={newProtocol.date}
                        onChange={(e) => handleProtocolChange('date', e.target.value)}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black-700 mb-1">Time</label>
                    <div className="relative">
                      <input
                        type="time"
                        value={newProtocol.time}
                        onChange={(e) => handleProtocolChange('time', e.target.value)}
                        className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => {setIsCreateOpen(false); setIsEditOpen(false);}} 
                  className="w-full px-4 py-3 text-md font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  onClick={handleSave}
                  disabled={!isFormFilled}
                  className={`w-full px-4 py-3 text-md font-medium text-black rounded-md transition-all duration-300
                    ${isFormFilled 
                      ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] hover:opacity-90' 
                      : 'bg-[#F6F8FB] text-black-400 cursor-not-allowed'
                    }`}
                >
                  {isCreateOpen ? 'Create' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isViewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Protocol Details</h2>
              <button onClick={() => setIsViewOpen(false)} className="text-gray-600 hover:text-gray-800">
                <FaTimes size={24} />
              </button>
            </div>
            <div className="space-y-4 bg-gray-50 p-4 rounded-md">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Title</h3>
                <p className="mt-1 text-lg font-semibold text-gray-900">{currentProtocol.title}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-md text-black-700">{currentProtocol.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="mb-2 sm:mb-0">
                  <h3 className="text-sm font-medium text-gray-500">Date</h3>
                  <p className="mt-1 text-md text-black-700 flex items-center">
                    <FaCalendarAlt className="mr-2 text-blue-500" /> {currentProtocol.date}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Time</h3>
                  <p className="mt-1 text-md text-black-700 flex items-center">
                    <FaClock className="mr-2 text-blue-500" /> {currentProtocol.time}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setIsViewOpen(false)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Delete Protocol ?</h2>
              <button onClick={() => setIsDeleteOpen(false)} className="text-gray-600 hover:text-gray-800">
                <FaTimes size={24} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this protocol?
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button 
                onClick={() => setIsDeleteOpen(false)} 
                className="w-full px-4 py-3 text-md font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmDelete} 
                className="w-full px-4 py-3 text-md font-medium text-white bg-red-500 rounded-md hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SecurityProtocols;
