import React, { useState } from 'react';
import { FaCheck, FaEye, FaTrash, FaPlus, FaSun, FaMoon, FaMale, FaFemale, FaPencilAlt, FaTimes, FaCamera, FaFile, FaExclamationTriangle, FaCalendarAlt, FaClock, FaCloudUploadAlt, FaUser } from 'react-icons/fa';

const initialGuards = [
  { id: 1, name: "Brooklyn Simmons", phone: "94564 98321", shift: "day", date: "10/02/2024", time: "2:45 PM", gender: "male", photo: null, aadharCard: null },
  { id: 2, name: "Brooklyn Simmons", phone: "94564 98321", shift: "day", date: "10/02/2024", time: "2:45 PM", gender: "female", photo: null, aadharCard: null },
  { id: 3, name: "Brooklyn Simmons", phone: "94564 98321", shift: "night", date: "10/02/2024", time: "2:45 PM", gender: "male", photo: null, aadharCard: null },
  // Add more guards as needed
];

function SecurityGuardDetails() {
  const [guards, setGuards] = useState(initialGuards);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [currentGuard, setCurrentGuard] = useState(null);
  const [newGuard, setNewGuard] = useState({
    name: '', phone: '', shift: '', date: '', time: '', gender: '', photo: null, aadharCard: null
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [guardToDelete, setGuardToDelete] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [aadharPreview, setAadharPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);

  const checkFormFilled = (guard) => {
    return guard.name.trim() !== '' && 
           guard.phone.trim() !== '' && 
           guard.gender !== '' && 
           guard.shift !== '' && 
           guard.date !== '' && 
           guard.time !== '' && 
           guard.aadharCard !== null;
  };

  const handleAddSecurity = () => {
    setModalMode('add');
    setNewGuard({ name: '', phone: '', shift: '', date: '', time: '', gender: '', photo: null, aadharCard: null });
    setIsModalOpen(true);
  };

  const handleEdit = (guard) => {
    setModalMode('edit');
    setCurrentGuard(guard);
    setNewGuard({ ...guard });
    setIsModalOpen(true);
  };

  const handleView = (guard) => {
    setModalMode('view');
    setCurrentGuard(guard);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (guard) => {
    setGuardToDelete(guard);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setGuards(guards.filter(guard => guard.id !== guardToDelete.id));
    setIsDeleteModalOpen(false);
  };

  const handleSave = () => {
    if (modalMode === 'add') {
      setGuards([...guards, { ...newGuard, id: Date.now() }]);
    } else if (modalMode === 'edit') {
      setGuards(guards.map(guard => guard.id === currentGuard.id ? newGuard : guard));
    }
    setIsModalOpen(false);
  };

  const handleFileUpload = (event, type) => {
    event.preventDefault();
    const file = event.target.files[0];
    handleFile(file, type);
    
    const updatedGuard = {
      ...newGuard,
      [type]: file
    };
    setIsFormFilled(checkFormFilled(updatedGuard));
  };

  const handleDrop = (event, type) => {
    event.preventDefault();
    setIsDragging(false);
    
    const file = event.dataTransfer.files[0];
    handleFile(file, type);
  };

  const handleFile = (file, type) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'photo') {
          setPhotoPreview(reader.result);
          setNewGuard({ ...newGuard, photo: reader.result });
        } else if (type === 'aadharCard') {
          setAadharPreview(reader.result);
          setNewGuard({ ...newGuard, aadharCard: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleGuardChange = (field, value) => {
    const updatedGuard = {
      ...newGuard,
      [field]: value
    };
    setNewGuard(updatedGuard);
    setIsFormFilled(checkFormFilled(updatedGuard));
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Security Guard Details</h1>
        <button 
          onClick={handleAddSecurity}
          className="px-4 py-2 bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white rounded-md hover:opacity-90 flex items-center gap-2"
        >
          <FaPlus size={16} /> Add Security
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                {["Security Guard Name", "Phone Number & E-Mail*", "Select Shift", "Shift Date", "Shift Time", "Gender", "Action"].map((header) => (
                  <th key={header} className="px-4   py-4 text-left text-md font-bold text-black-500">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {guards.map((guard) => (
                <tr key={guard.id} className="hover:bg-gray-50">
                  <td className="px-1 py-4">
                    <div className="flex items-center">
                      <img 
                        className="h-10 w-10 rounded-full object-cover" 
                        src={`https://i.pravatar.cc/150?u=${guard.id}`} 
                        alt="" 
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{guard.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-500">{guard.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      guard.shift === 'day' 
                        ? 'bg-orange-50 text-orange-500' 
                        : 'bg-gray-600 text-white'
                    }`}>
                      {guard.shift === 'day' ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
                      {guard.shift === 'day' ? 'Day' : 'Night'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-500">{guard.date}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="inline-flex px-3 py-1 font-bold text-sm text-gray-500 bg-[#F6F8FB] rounded-md">
                      {guard.time}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      guard.gender === 'male'
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-pink-50 text-pink-600'
                    }`}>
                      {guard.gender === 'male' ? <FaMale className="mr-2" /> : <FaFemale className="mr-2" />}
                      {guard.gender === 'male' ? 'Male' : 'Female'}
                    </span>
                  </td>
                  <td className="px-1 py-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleEdit(guard)}
                        className="p-1.5 rounded-full bg-green-50 text-green-600 hover:bg-green-100"
                      >
                        <FaPencilAlt size={14} />
                      </button>
                      <button 
                        onClick={() => handleView(guard)}
                        className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        <FaEye size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(guard)}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-start mb-6">Add Security</h2>
              
              {modalMode !== 'view' && (
                <form className="space-y-4">
                  {/* Photo Upload */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        {photoPreview ? (
                          <div className="relative">
                            <img 
                              src={photoPreview} 
                              alt="Guard" 
                              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" 
                            />
                            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 border-2 border-white">
                              <FaCamera className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col  items-center">
                            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                <FaCamera className="w-4 h-4  text-gray-400" />
                              </div>
                            </div>
                            <span className="text-blue-500 text-xs mt-2">Add Photo</span>
                          </div>
                        )}
                      </label>
                      <input 
                        id="photo-upload" 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => handleFileUpload(e, 'photo')} 
                        accept="image/*"
                      />
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={newGuard.name}
                      onChange={(e) => handleGuardChange('name', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number & E-Mail*
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter Number & E-Mail"
                      value={newGuard.phone}
                      onChange={(e) => handleGuardChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender*
                      </label>
                      <select
                        value={newGuard.gender}
                        onChange={(e) => handleGuardChange('gender', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shift*
                      </label>
                      <select
                        value={newGuard.shift}
                        onChange={(e) => handleGuardChange('shift', e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                      >
                        <option value="">Select Shift</option>
                        <option value="day">Day</option>
                        <option value="night">Night</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shift Date*
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={newGuard.date}
                          onChange={(e) => handleGuardChange('date', e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 pr-10"
                        />
                      
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Shift Time*
                      </label>
                      <div className="relative">
                        <input
                          type="time"
                          value={newGuard.time}
                          onChange={(e) => handleGuardChange('time', e.target.value)}
                          className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 pr-10"
                        />
                       
                      </div>
                    </div>
                  </div>

                  {/* Aadhar Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Aadhar Card*
                    </label>
                    <div 
                      className={`border-2 border-dashed ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} rounded-lg p-4`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, 'aadharCard')}
                    >
                      <label htmlFor="aadhar-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center justify-center text-center">
                          {aadharPreview ? (
                            <div className="flex items-center space-x-2 text-green-500">
                              <FaCheck className="w-5 h-5" />
                              <span className="text-sm font-medium">File uploaded successfully</span>
                            </div>
                          ) : (
                            <>
                              <FaCloudUploadAlt className="w-8 h-8 text-gray-400 mb-2" />
                              <span className="text-blue-500 text-sm">Upload a file or drag and drop</span>
                              <span className="text-gray-400 text-xs mt-1">PDF, JPG, GIF up to 10MB</span>
                            </>
                          )}
                        </div>
                      </label>
                      <input 
                        id="aadhar-upload" 
                        type="file" 
                        className="hidden" 
                        onChange={(e) => handleFileUpload(e, 'aadharCard')} 
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)} 
                      className="w-full p-3 text-gray-700 bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      onClick={handleSave}
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
              )}
            </div>
          </div>
        </div>
      )}

      {isModalOpen && modalMode === 'view' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">View Security Guard Details</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Profile Image & Name */}
                <div className="flex items-center space-x-3 mb-6">
                  {currentGuard.photo ? (
                    <img src={currentGuard.photo} alt="Guard" className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <FaUser className="text-gray-400 text-xl" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{currentGuard.name}</h3>
                    <p className="text-gray-500 text-sm">{new Date(currentGuard.date).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Select Shift</p>
                    <div className={`mt-1 px-3 py-1 rounded-full text-xs inline-flex items-center gap-1
                      ${currentGuard.shift === 'day' 
                        ? 'bg-yellow-50 text-yellow-600' 
                        : 'bg-blue-50 text-blue-600'}`}
                    >
                      {currentGuard.shift === 'day' ? <FaSun size={12} /> : <FaMoon size={12} />}
                      {currentGuard.shift}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Shift Time</p>
                    <p className="mt-1 text-sm font-medium">{currentGuard.time}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <div className={`mt-1 px-3 py-1 rounded-full text-xs inline-flex items-center gap-1
                      ${currentGuard.gender === 'male' 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'bg-pink-50 text-pink-600'}`}
                    >
                      {currentGuard.gender === 'male' ? <FaMale size={12} /> : <FaFemale size={12} />}
                      {currentGuard.gender}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Delete Security Guard ?</h2>
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="text-center py-4">
                
                
                <p className="text-gray-500 text-sm mb-6">
                  Do you really want to delete this security guard? 
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600"
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

export default SecurityGuardDetails;
