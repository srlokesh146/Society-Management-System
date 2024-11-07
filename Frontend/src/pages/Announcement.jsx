import React, { useState } from 'react';
import { FaEdit, FaPlus, FaTrash, FaEye, FaEllipsisV, FaTimes } from 'react-icons/fa';

const initialAnnouncements = [
  {
    id: 1,
    title: "Community Initiatives",
    date: "01/02/2024",
    time: "10:30 AM",
    description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in..."
  },
  {
    id: 2,
    title: "Community Initiatives",
    date: "01/02/2024",
    time: "10:30 AM",
    description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in..."
  },
  {
    id: 3,
    title: "Community Initiatives",
    date: "01/02/2024",
    time: "10:30 AM",
    description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in..."
  },
  {
    id: 4,
    title: "Community Initiatives",
    date: "01/02/2024",
    time: "10:30 AM",
    description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in..."
  },
  {
    id: 5,
    title: "Community Initiatives",
    date: "01/02/2024",
    time: "10:30 AM",
    description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in..."
  },
  {
    id: 6,
    title: "Community Initiatives",
    date: "01/02/2024",
    time: "10:30 AM",
    description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesha in..."
  },
 
];

function Announcement() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null); // Track which dropdown is open
  const [isFormFilled, setIsFormFilled] = useState(false);

  const checkFormFilled = (announcement) => {
    return announcement?.title?.trim() !== '' && 
           announcement?.description?.trim() !== '' && 
           announcement?.date?.trim() !== '' && 
           announcement?.time?.trim() !== '';
  };

  const handleAnnouncementChange = (field, value) => {
    const updatedAnnouncement = {
      ...currentAnnouncement,
      [field]: value
    };
    setCurrentAnnouncement(updatedAnnouncement);
    setIsFormFilled(checkFormFilled(updatedAnnouncement));
  };

  const handleCreateAnnouncement = () => {
    setModalType('create');
    setCurrentAnnouncement({ title: '', date: '', time: '', description: '' });
    setIsModalOpen(true);
    setIsFormFilled(false);
  };

  const handleEditAnnouncement = (announcement) => {
    setModalType('edit');
    setCurrentAnnouncement({ ...announcement });
    setIsModalOpen(true);
  };

  const handleDeleteAnnouncement = (announcement) => {
    setModalType('delete');
    setCurrentAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleViewAnnouncement = (announcement) => {
    setModalType('view');
    setCurrentAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentAnnouncement(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (modalType === 'create') {
      setAnnouncements([...announcements, { ...currentAnnouncement, id: Date.now() }]);
    } else if (modalType === 'edit') {
      setAnnouncements(announcements.map(a => a.id === currentAnnouncement.id ? currentAnnouncement : a));
    }
    handleCloseModal();
  };

  const handleDelete = () => {
    setAnnouncements(announcements.filter(a => a.id !== currentAnnouncement.id));
    handleCloseModal();
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black-800">Announcement</h1>
        <button 
          onClick={handleCreateAnnouncement}
          className="px- py-3 bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white rounded-md hover:opacity-90 flex items-center justify-center gap-2 w-[200px]"
        >
          <FaPlus size={16} />
          Create Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-lg shadow-sm">
            <div className="bg-[#5678E9] text-white p-4 flex justify-between items-center rounded-t-lg">
              <h2 className="text-sm font-medium">{announcement.title}</h2>
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown(announcement.id)}
                  className="hover:opacity-80"
                >
                  <FaEllipsisV size={16} />
                </button>
                
                {dropdownOpen === announcement.id && (
                  <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10 py-1">
                    <button 
                      onClick={() => handleViewAnnouncement(announcement)} 
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FaEye size={14} /> View
                    </button>
                    <button 
                      onClick={() => handleEditAnnouncement(announcement)} 
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FaEdit size={14} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteAnnouncement(announcement)} 
                      className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FaTrash size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium  w-24">Date:</span>
                 <p className='text-black'> <span>{announcement.date}</span></p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-medium w-24">Time:</span>
                  <p className='text-black'><span>{announcement.time}</span></p>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Description:</p>
                  <p className="line-clamp-3 text-black">{announcement.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && modalType !== 'view' && modalType !== 'delete' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {modalType === 'create' ? 'Add Announcement' : 'Edit Announcement'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Announcement Title</label>
                  <input
                    type="text"
                    value={currentAnnouncement?.title || ''}
                    onChange={(e) => handleAnnouncementChange('title', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={currentAnnouncement?.description || ''}
                    onChange={(e) => handleAnnouncementChange('description', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 h-20"
                    placeholder="Enter description"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Announcement Date</label>
                    <input
                      type="date"
                      value={currentAnnouncement?.date || ''}
                      onChange={(e) => handleAnnouncementChange('date', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Announcement Time</label>
                    <input
                      type="time"
                      value={currentAnnouncement?.time || ''}
                      onChange={(e) => handleAnnouncementChange('time', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button 
                    type="button"
                    onClick={handleCloseModal}
                    className="w-full py-3 text-gray-700 bg-white border border-gray-200 rounded-lg text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!isFormFilled}
                    className={`w-full py-3 text-sm font-medium rounded-lg transition-all duration-300
                      ${isFormFilled 
                        ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90' 
                        : 'bg-[#F6F8FB] text-black-400 cursor-not-allowed'}`}
                  >
                    {modalType === 'create' ? 'Create' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {isModalOpen && modalType === 'view' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="p-5">
              {/* Header with Close Button */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">View Security Protocol</h2>
                <button 
                  onClick={handleCloseModal} 
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Title</label>
                  <p className="text-sm">{currentAnnouncement.title}</p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Description</label>
                  <p className="text-sm text-gray-600">{currentAnnouncement.description}</p>
                </div>

                {/* Date and Time in Grid */}
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Date</label>
                    <p className="text-sm">{currentAnnouncement.date}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Time</label>
                    <p className="text-sm">{currentAnnouncement.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isModalOpen && modalType === 'delete' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm">
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-4">Delete Announcement </h2>
              <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this announcement?</p>
              
              {/* Full Width Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={handleCloseModal}
                  className="w-full py-3 text-gray-700 bg-white border border-gray-200 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDelete}
                  className="w-full py-3 text-white bg-red-500 rounded-lg text-sm font-medium hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Announcement;
