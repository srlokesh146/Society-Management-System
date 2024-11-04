import React, { useState } from 'react';
import { FaCheck, FaEye, FaTrash, FaPlus, FaSun, FaMoon, FaMale, FaFemale, FaPencilAlt, FaTimes, FaCamera, FaFile, FaExclamationTriangle } from 'react-icons/fa';

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
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewGuard({ ...newGuard, [type]: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mx-auto bg-gray-100 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Security Guard Details</h1>
        <button 
          onClick={handleAddSecurity}
          className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 flex items-center justify-center"
        >
          <FaPlus className="mr-2" /> Add Security
        </button>
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black-200">
            <thead className="bg-indigo-50">
              <tr>
                {["Security Guard Name", "Phone Number", "Select Shift", "Shift Date", "Shift Time", "Gender", "Action"].map((header) => (
                  <th key={header} className="px-3 sm:px-6 py-3 text-left text-md font-medium text-black-700  tracking-wider">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {guards.map((guard) => (
                <tr key={guard.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img className="h-8 w-8 sm:h-10 sm:w-10 rounded-full mr-2 sm:mr-3" src={`https://i.pravatar.cc/40?u=${guard.id}`} alt="" />
                      <div className="text-xs sm:text-sm font-medium text-black-900">{guard.name}</div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-black-500">{guard.phone}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${guard.shift === 'day' ? 'bg-indigo-50 text-orange-500' : 'bg-gray-600 text-white'}`}>
                      {guard.shift === 'day' ? <FaSun className="mr-1" /> : <FaMoon className="mr-1" />}
                      {guard.shift === 'day' ? 'Day' : 'Night'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-black-500">{guard.date}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-black-500">{guard.time}</td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${guard.gender === 'male' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                      {guard.gender === 'male' ? <FaMale className="mr-1" /> : <FaFemale className="mr-1" />}
                      {guard.gender === 'male' ? 'Male' : 'Female'}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                    <div className="flex space-x-2">
                      <button onClick={() => handleView(guard)} className="text-green-600  hover:text-green-900">
                        <FaEye />
                      </button>
                      <button onClick={() => handleEdit(guard)} className="text-blue-600 hover:text-blue-900">
                        <FaPencilAlt />
                      </button>
                      <button onClick={() => handleDeleteClick(guard)} className="text-red-600 hover:text-red-900">
                        <FaTrash />
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
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{modalMode === 'add' ? 'Add New Security Guard' : modalMode === 'edit' ? 'Edit Security Guard' : 'View Security Guard'}</h2>
              {modalMode === 'view' ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-lg font-semibold text-gray-900">{currentGuard.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-lg font-semibold text-gray-900">{currentGuard.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Gender</p>
                      <p className="text-lg font-semibold text-gray-900 flex items-center">
                        {currentGuard.gender === 'male' ? <FaMale className="mr-2 text-blue-500" /> : <FaFemale className="mr-2 text-pink-500" />}
                        {currentGuard.gender}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Shift</p>
                      <p className="text-lg font-semibold text-gray-900 flex items-center">
                        {currentGuard.shift === 'day' ? <FaSun className="mr-2 text-yellow-500" /> : <FaMoon className="mr-2 text-indigo-500" />}
                        {currentGuard.shift}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="text-lg font-semibold text-gray-900">{currentGuard.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Time</p>
                      <p className="text-lg font-semibold text-gray-900">{currentGuard.time}</p>
                    </div>
                  </div>
                  {currentGuard.aadharCard && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-500">Aadhar Card</p>
                      <p className="text-lg font-semibold text-green-500 flex items-center">
                        <FaCheck className="mr-2" /> Uploaded
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <form className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      {newGuard.photo ? (
                        <img src={newGuard.photo} alt="Guard" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500" />
                      ) : (
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-500">
                          <FaCamera className="text-gray-400 text-3xl sm:text-4xl" />
                        </div>
                      )}
                      <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition duration-300">
                        <FaCamera className="text-white text-lg sm:text-xl" />
                      </label>
                      <input id="photo-upload" type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'photo')} accept="image/*" />
                    </div>
                  </div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newGuard.name}
                    onChange={(e) => setNewGuard({ ...newGuard, name: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={newGuard.phone}
                    onChange={(e) => setNewGuard({ ...newGuard, phone: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <select
                    value={newGuard.gender}
                    onChange={(e) => setNewGuard({ ...newGuard, gender: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <select
                    value={newGuard.shift}
                    onChange={(e) => setNewGuard({ ...newGuard, shift: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Shift</option>
                    <option value="day">Day</option>
                    <option value="night">Night</option>
                  </select>
                  <input
                    type="date"
                    value={newGuard.date}
                    onChange={(e) => setNewGuard({ ...newGuard, date: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="time"
                    value={newGuard.time}
                    onChange={(e) => setNewGuard({ ...newGuard, time: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-4 sm:p-6 rounded-lg hover:border-blue-500 transition duration-300">
                    <label htmlFor="aadhar-upload" className="cursor-pointer flex flex-col items-center">
                      <FaFile className="text-gray-400 text-3xl sm:text-4xl mb-2" />
                      <span className="text-blue-500 font-semibold text-sm sm:text-base">Upload Aadhar Card</span>
                      <span className="text-xs sm:text-sm text-gray-500 mt-1">PDF, JPG, JPEG or PNG</span>
                    </label>
                    <input id="aadhar-upload" type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'aadharCard')} accept=".pdf,.jpg,.jpeg,.png" />
                  </div>
                  {newGuard.aadharCard && <p className="text-green-500 text-center font-semibold">✓ Aadhar Card uploaded</p>}
                </form>
              )}

              {modalMode === 'view' ? (
                <div className="mt-6 flex justify-end">
                  <button onClick={() => setIsModalOpen(false)} className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">Close</button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-end mt-6 space-y-2 sm:space-y-0 sm:space-x-3">
                  <button onClick={() => setIsModalOpen(false)} className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300">Cancel</button>
                  <button onClick={handleSave} className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                    {modalMode === 'add' ? 'Create' : 'Save'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-sm">
            <div className="text-center">
              <FaExclamationTriangle className="mx-auto text-yellow-400 text-4xl sm:text-5xl mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Confirm Deletion</h3>
              <p className="text-gray-500 mb-6">Are you sure you want to delete this security guard? This action cannot be undone.</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
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

export default SecurityGuardDetails;
