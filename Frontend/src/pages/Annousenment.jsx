import React, { useState } from 'react';
import { FaEdit, FaPlus, FaTrash, FaEye } from 'react-icons/fa';

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
  // Add more announcements as needed
];

function Announcement() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

  const handleCreateAnnouncement = () => {
    setModalType('create');
    setCurrentAnnouncement({ title: '', date: '', time: '', description: '' });
    setIsModalOpen(true);
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

  return (
    <div className="container mx-auto bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Announcement</h1>
        <button 
          onClick={handleCreateAnnouncement}
          className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center justify-center"
        >
          <FaPlus className="mr-2" /> Create Announcement
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-blue-500 text-white p-3 sm:p-4 flex justify-between items-center">
              <h2 className="text-base sm:text-lg font-semibold truncate">{announcement.title}</h2>
              <div className="flex space-x-2">
                <button onClick={() => handleViewAnnouncement(announcement)} className="text-white hover:text-gray-200 transition duration-300">
                  <FaEye />
                </button>
                <button onClick={() => handleEditAnnouncement(announcement)} className="text-white hover:text-gray-200 transition duration-300">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteAnnouncement(announcement)} className="text-white hover:text-gray-200 transition duration-300">
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                <strong>Date:</strong> {announcement.date}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                <strong>Time:</strong> {announcement.time}
              </p>
              <p className="text-xs sm:text-sm text-gray-700 mt-1 sm:mt-2">
                <strong>Description:</strong>
              </p>
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{announcement.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg w-full max-w-md shadow-xl">
            {modalType === 'delete' ? (
              <>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-black-600">Delete Announcement</h2>
                <p className="mb-6">Are you sure you want to delete this announcement?</p>
                <div className="flex justify-end">
                  <button onClick={handleCloseModal} className="mr-4 px-4 sm:px-6 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-300">Cancel</button>
                  <button onClick={handleDelete} className="px-4 sm:px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300">Delete</button>
                </div>
              </>
            ) : modalType === 'view' ? (
              <>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-black-600">{currentAnnouncement.title}</h2>
                <p className="mb-2"><strong>Date:</strong> {currentAnnouncement.date}</p>
                <p className="mb-2"><strong>Time:</strong> {currentAnnouncement.time}</p>
                <p className="mb-4"><strong>Description:</strong> {currentAnnouncement.description}</p>
                <button onClick={handleCloseModal} className="w-full px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">Close</button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-black-600">{modalType === 'create' ? 'Create Announcement' : 'Edit Announcement'}</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentAnnouncement?.title || ''}
                    onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentAnnouncement?.date || ''}
                    onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, date: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={currentAnnouncement?.time || ''}
                    onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, time: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    placeholder="Enter description"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                    value={currentAnnouncement?.description || ''}
                    onChange={(e) => setCurrentAnnouncement({...currentAnnouncement, description: e.target.value})}
                    required
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                  <button type="button" onClick={handleCloseModal} className="px-4 sm:px-6 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition duration-300">Cancel</button>
                  <button type="submit" className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300">Submit</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Announcement;
