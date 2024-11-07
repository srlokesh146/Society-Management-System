import React, { useState } from 'react';
import { FaEdit, FaEllipsisV } from 'react-icons/fa';

const initialFacilities = [
  {
    id: 1,
    title: "Parking Facilities",
    date: "01/07/2024",
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

 
];

function FacilityManagement() {
  const [facilities, setFacilities] = useState(initialFacilities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [currentFacility, setCurrentFacility] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const checkFormFilled = (facility) => {
    return facility?.title?.trim() !== '' && 
           facility?.description?.trim() !== '' && 
           facility?.date?.trim() !== '' && 
           facility?.remindDays?.toString()?.trim() !== '';
  };

  const handleFacilityChange = (field, value) => {
    const updatedFacility = {
      ...currentFacility,
      [field]: value
    };
    setCurrentFacility(updatedFacility);
    setIsFormFilled(checkFormFilled(updatedFacility));
  };

  const handleCreateFacility = () => {
    setModalType('create');
    setCurrentFacility({ 
      name: '', 
      description: '', 
      date: '', 
      remind: '' 
    });
    setIsModalOpen(true);
    setIsFormFilled(false);
  };

  const handleEditFacility = (facility) => {
    setModalType('edit');
    setCurrentFacility({ ...facility });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentFacility(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (modalType === 'create') {
      setFacilities([...facilities, { ...currentFacility, id: Date.now() }]);
    } else if (modalType === 'edit') {
      setFacilities(facilities.map(f => f.id === currentFacility.id ? currentFacility : f));
    }
    handleCloseModal();
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const renderDropdownMenu = (facility) => (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
      <button 
        onClick={() => handleEditFacility(facility)} 
        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
      >
        <FaEdit size={14} /> Edit
      </button>
    </div>
  );

  const renderModalForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Facility Name
        </label>
        <input
          name="name"
          type="text"
          value={currentFacility?.title || ''}
          onChange={(e) => handleFacilityChange('title', e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg"
          placeholder="Enter facility title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={currentFacility?.description || ''}
          onChange={(e) => handleFacilityChange('description', e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg h-24"
          placeholder="Enter description"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
           Sechudule Service Date
          </label>
          <input
            name="date"
            type="date"
            value={currentFacility?.date || ''}
            onChange={(e) => handleFacilityChange('date', e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg"
          />
        </div>
        <div> 
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Remind before
          </label>
          <input
            name="remind"
            type="number"
            value={currentFacility?.remindDays || ''}
            onChange={(e) => handleFacilityChange('remindDays', e.target.value)}
            className="w-full p-3 border border-gray-200 rounded-lg"
            placeholder="Enter days"
            min="1"
          />
        </div>
      </div>

      {/* Buttons */}
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
          {modalType === 'save' ? 'save' : 'Save'}
        </button>
      </div>
    </form>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Facility Management</h1>
        <button 
          onClick={handleCreateFacility}
          className="px-4 py-2 bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white rounded-md hover:opacity-90 flex items-center gap-2"
        >
          Create Facility
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {facilities.map((facility) => (
          <div key={facility.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-[#5678E9] text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-medium">{facility.title}</h3>
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown(facility.id)}
                  className="hover:opacity-80"
                >
                  <FaEllipsisV />
                </button>
                {dropdownOpen === facility.id && renderDropdownMenu(facility)}
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <span className="text-gray-500 w-[180px]">Upcoming Schedule Service Date</span>
                  <span className="text-black">{facility.date}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-500 text-sm">Description</p>
                  <p className="text-sm text-black line-clamp-2">{facility.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                {modalType === 'create' ? 'Create Facility' : 'Edit Facility'}
              </h2>
              {renderModalForm()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FacilityManagement;
