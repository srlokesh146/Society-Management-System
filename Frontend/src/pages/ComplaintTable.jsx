import React, { useState } from 'react';
import { FaCheck, FaEye, FaTrash, FaPen } from 'react-icons/fa';
import CreateComplaintModal from '../components/modal/CreateComplaintModal';
import ViewComplaintModal from '../components/modal/ViewComplaintModal';
import EditComplaintModal from '../components/modal/EditComplaintModal';
import DeleteConfirmModal from '../components/modal/DeleteConfirmModal';

const ComplaintPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      requesterName: "Evelyn Harper",
      avatar: "https://ui-avatars.com/api/?name=Evelyn+Harper",
      requestName: "Unethical Behavior",
      description: "Regular waste collection services.",
      requestDate: "10/02/2024",
      unitNumber: "A 1001",
      priority: "Medium",
      status: "Pending"
    },
    {
      id: 2,
      requesterName: "Evelyn Harper",
      avatar: "https://ui-avatars.com/api/?name=Evelyn+Harper",
      requestName: "Unethical Behavior",
      description: "Regular waste collection services.",
      requestDate: "10/02/2024",
      unitNumber: "A 1001",
      priority: "Medium",
      status: "Pending"
    },
    {
      id: 3,
      requesterName: "Evelyn Harper",
      avatar: "https://ui-avatars.com/api/?name=Evelyn+Harper",
      requestName: "Unethical Behavior",
      description: "Regular waste collection services.",
      requestDate: "10/02/2024",
      unitNumber: "A 1001",
      priority: "Medium",
      status: "Pending"
    },
    {
      id: 4,
      requesterName: "Evelyn Harper",
      avatar: "https://ui-avatars.com/api/?name=Evelyn+Harper",
      requestName: "Unethical Behavior",
      description: "Regular waste collection services.",
      requestDate: "10/02/2024",
      unitNumber: "A 1001",
      priority: "Medium",
      status: "Pending"
    },
    // ... your other data entries
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const newComplaint = {
      id: complaints.length + 1,
      requesterName: formData.get('requesterName'),
      avatar: `https://ui-avatars.com/api/?name=${formData.get('requesterName').replace(' ', '+')}`,
      requestName: formData.get('requestName'),
      description: formData.get('description'),
      requestDate: new Date().toLocaleDateString(),
      unitNumber: `${formData.get('wing')} ${formData.get('unit')}`,
      priority: formData.get('priority'),
      status: formData.get('status')
    };

    setComplaints([...complaints, newComplaint]);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setComplaints(complaints.filter(complaint => complaint.id !== id));
    setIsDeleteModalOpen(false);
  };

  const handleUpdate = (updatedComplaint) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === updatedComplaint.id ? updatedComplaint : complaint
    ));
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className=" mx-auto bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl  font-bold text-gray-800">Create Complaint</h1>
            <button 
              onClick={() => setIsModalOpen(true)}
              className=" bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-300"
            >
              Create Complaint
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b    bg-indigo-50 rounded-lg overflow-hidden">
                  <th className="text-left px-8 py- text-md  font-bold text-black-500 first:rounded-l-lg last:rounded-r-lg">Complainter Name</th>
                  <th className="text-left px-9 py-3 text-md font-bold text-black-500">Complaint Name</th>
                  <th className="text-left px-24 py-3 text-md font-bold text-black-500">Description</th>
                  {/* <th className="text-left px-4 py-3 text-md font-medium text-black-500">Complaint Date</th> */}
                  <th className="text-left px-4 py-3 text-md font-bold text-black-500">Unit Number</th>
                  <th className="text-left px-7  py-3 text-md font-bold text-black-500">Priority</th>
                  <th className="text-left px-8    py-3 text-md font-bold text-black-500">Status</th>
                  <th className="text-left px-14 py-3 text-md font-bold text-black-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={complaint.avatar} alt="" className="w-8 h-8 rounded-full" />
                        <span className="text-md font-semibold  text-[#4F4F4F]" >{complaint.requesterName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-md font-semibold text-[#4F4F4F]">{complaint.requestName}</td>
                    <td className="px-6 py-4 text-md font-semibold text-[#4F4F4F]">{complaint.description}</td>
                    {/* <td className="px-6 py-4 text-md font-semibold text-[#4F4F4F]">{complaint.requestDate}</td> */}
                    <td className="px-6 py-4  text-[#4F4F4F]">
                      <UnitNumberBadge unitNumber={complaint.unitNumber} />
                    </td>
                    <td className="px-6 py-4  text-[#4F4F4F]">
                      <PriorityBadge priority={complaint.priority} />
                    </td>
                    <td className="px-6 py-4  text-[#4F4F4F]">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setIsViewModalOpen(true);
                          }}
                          className="p-2 rounded-md bg-blue-50 text-[#5678E9] hover:bg-blue-100"
                        >
                          <FaEye size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setIsEditModalOpen(true);
                          }}
                          className="p-2 rounded-md bg-blue-50 text-[#39973D] hover:bg-green-100"
                        >
                          <FaPen size={16} />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-2 rounded-md bg-blue-50 text-[#E74C3C] hover:bg-red-100"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Create Modal */}
          <CreateComplaintModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
          />

          {/* View Modal */}
          {selectedComplaint && (
            <ViewComplaintModal 
              isOpen={isViewModalOpen}
              onClose={() => {
                setIsViewModalOpen(false);
                setSelectedComplaint(null);
              }}
              complaint={selectedComplaint}
            />
          )}

          {/* Edit Modal */}
          {selectedComplaint && (
            <EditComplaintModal 
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedComplaint(null);
              }}
              complaint={selectedComplaint}
              onSubmit={handleUpdate}
            />
          )}

          {/* Delete Modal */}
          {selectedComplaint && (
            <DeleteConfirmModal 
              isOpen={isDeleteModalOpen}
              onClose={() => {
                setIsDeleteModalOpen(false);
                setSelectedComplaint(null);
              }}
              onDelete={handleDelete}
              complaint={selectedComplaint}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const UnitNumberBadge = ({ unitNumber }) => {
  const [letter, number] = unitNumber.split(' ');
  const colors = {
    A: 'bg-blue-50   text-blue-600',
    B: 'bg-blue-100 text-blue-600',
    C: 'bg-green-100 text-green-600',
    D: 'bg-yellow-100 text-yellow-600',
    E: 'bg-red-100 text-red-600',
    F: 'bg-pink-100 text-pink-600',
    G: 'bg-indigo-100 text-indigo-600',
    H: 'bg-gray-100 text-gray-600',
    I: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${colors[letter]}`}>
        {letter}
      </span>
      <span className="text-sm font-semibold text-gray-600">{number}</span>
    </div>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: 'bg-[#E74C3C] text-white font-semibold  text-xs ',
    Medium: 'bg-[#5678E9] text-white font-semibold text-xs',
    Low: 'bg-[#39973D] text-white font-semibold text-xs',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs ${styles[priority]}`}>
      {priority}
    </span>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: 'bg-[#FFC3131A] text-[#FFC313] font-semibold text-xs',
    Solve: 'bg-[#39973D1A] text-[#39973D] font-semibold text-xs',
    Open: 'bg-[#5678E91A] text-[#5678E9] font-semibold text-xs'
  };

  const lowercaseStatus = status.toLowerCase();
  const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <span className={`px-3 py-1 rounded-full ${styles[capitalizedStatus]}`}>
      {capitalizedStatus}
    </span>
  );
};

export default ComplaintPage;