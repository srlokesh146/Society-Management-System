import React, { useState } from 'react';
import { BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs';

function ComplaintTable() {
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      complainer: 'Evelyn Harper',
      name: 'Unethical Behavior',
      description: 'Providing false information or deliberately.',
      unit: 'A 1001',
      wing: 'A',
      priority: 'Medium',
      status: 'Pending',
    },
    {
      id: 2,
      complainer: 'Esther Howard',
      name: 'Preventive Measures',
      description: 'Regular waste collection services.',
      unit: 'B 1002',
      wing: 'B',
      priority: 'Low',
      status: 'Open',
    },
    {
      id: 3,
      complainer: 'Jenny Wilson',
      name: 'Parking Issue',
      description: 'Designated garages for residents and guests.',
      unit: 'C 1003',
      wing: 'C',
      priority: 'High',
      status: 'Solved',
    },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const handleCreate = () => setIsCreateOpen(true);

  const handleEdit = (complaint) => {
    setSelectedComplaint(complaint);
    setIsCreateOpen(true);
  };

  const handleView = (complaint) => {
    setSelectedComplaint(complaint);
    setIsViewOpen(true);
  };

  const handleDelete = (complaint) => {
    setSelectedComplaint(complaint);
    setIsDeleteOpen(true);
  };

  const handleSaveComplaint = (newComplaint) => {
    if (selectedComplaint) {
      setComplaints(
        complaints.map((c) => (c.id === selectedComplaint.id ? newComplaint : c))
      );
    } else {
      setComplaints([
        ...complaints,
        { ...newComplaint, id: complaints.length + 1 },
      ]);
    }
    setIsCreateOpen(false);
    setSelectedComplaint(null);
  };

  const handleDeleteConfirmed = () => {
    setComplaints(complaints.filter((c) => c.id !== selectedComplaint.id));
    setIsDeleteOpen(false);
    setSelectedComplaint(null);
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Create Complaint</h1>
          <button
            className="w-full sm:w-auto bg-orange-500 text-white px-4 sm:px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300 shadow-md"
            onClick={handleCreate}
          >
            Create Complaint
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-indigo-50 text-black-500  text-xs sm:text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">Complainer Name</th>
                  <th className="py-3 px-6 text-left">Complaint Name</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-center">Unit Number</th>
                  <th className="py-3 px-6 text-center">Priority</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-black-600 text-md font-lighter">
                {complaints.map((complaint) => (
                  <tr key={complaint.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <img className="w-6 h-6 rounded-full" src={`https://i.pravatar.cc/150?u=${complaint.id}`} alt={complaint.complainer} />
                        </div>
                        <span>{complaint.complainer}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">{complaint.name}</td>
                    <td className="py-3 px-6 text-left">{complaint.description}</td>
                    <td className="py-3 px-6 text-center">
                      <span className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs">
                        {complaint.unit}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className={`text-xs font-semibold inline-block py-1 px-2 rounded-full ${getPriorityStyle(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <span className={`text-xs font-semibold inline-block py-1 px-2 rounded-full ${getStatusStyle(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center space-x-2">
                        <button onClick={() => handleEdit(complaint)} className="transform hover:scale-110 transition duration-300">
                          <BsPencilSquare className="text-green-700 hover:text-green-700" />
                        </button>
                        <button onClick={() => handleView(complaint)} className="transform hover:scale-110 transition duration-300">
                          <BsEye className="text-blue-700 hover:text-blue-700" />
                        </button>
                        <button onClick={() => handleDelete(complaint)} className="transform hover:scale-110 transition duration-300">
                          <BsTrash className="text-red-700 hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isViewOpen && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <ComplaintDetails complaint={selectedComplaint} onClose={() => setIsViewOpen(false)} />
        </div>
      )}

      {isCreateOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-2xl w-full">
            <ComplaintForm
              complaint={selectedComplaint}
              onSave={handleSaveComplaint}
              onClose={() => setIsCreateOpen(false)}
            />
          </div>
        </div>
      )}

      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <p className="text-gray-700 mb-4">Are you sure you want to delete this complaint?</p>
            <div className="flex justify-end space-x-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                onClick={handleDeleteConfirmed}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ComplaintForm({ complaint, onSave, onClose }) {
  const [formData, setFormData] = useState(
    complaint || {
      complainer: '',
      name: '',
      description: '',
      unit: '',
      wing: '',
      priority: 'Low',
      status: 'Open',
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
        {complaint ? 'Edit Complaint' : 'Create New Complaint'}
      </h2>
      <div className="grid grid-cols-1 w sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Complainer Name</label>
          <input
            name="complainer"
            value={formData.complainer}
            onChange={handleChange}
            placeholder="Enter complainer name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Complaint Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter complaint name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter complaint description"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
          <input
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            placeholder="Enter unit number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wing</label>
          <input
            name="wing"
            value={formData.wing}
            onChange={handleChange}
            placeholder="Enter wing"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <div className="flex flex-wrap gap-4">
            {['Low', 'Medium', 'High'].map((level) => (
              <label key={level} className="inline-flex items-center">
                <input
                  type="radio"
                  name="priority"
                  value={level}
                  checked={formData.priority === level}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="flex flex-wrap gap-4">
            {['Open', 'Pending', 'Solved'].map((status) => (
              <label key={status} className="inline-flex items-center">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={formData.status === status}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-gray-700">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {complaint ? 'Update Complaint' : 'Create Complaint'}
        </button>
      </div>
    </form>
  );
}

function ComplaintDetails({ complaint, onClose }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Complaint Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-gray-500">Complainer</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{complaint.complainer}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Complaint Name</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{complaint.name}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm font-medium text-gray-500">Description</p>
          <p className="mt-1 text-lg text-gray-900">{complaint.description}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Unit</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{complaint.unit}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Wing</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">{complaint.wing}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Priority</p>
          <span className={`mt-1 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${getPriorityStyle(complaint.priority)}`}>
            {complaint.priority}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Status</p>
          <span className={`mt-1 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${getStatusStyle(complaint.status)}`}>
            {complaint.status}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <button
          className="w-full bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow hover:bg-gray-200 transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

// Helper functions for styling priority and status
const getPriorityStyle = (priority) => {
  switch (priority) {
    case 'Low':
      return 'bg-green-500 text-white';
    case 'Medium':
      return 'bg-blue-500 text-white';
    case 'High':
      return 'bg-red-500 text-white';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const getStatusStyle = (status) => {
  switch (status) {
    case 'Open':
      return 'bg-blue-100 text-blue-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Solved':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

export default ComplaintTable;
