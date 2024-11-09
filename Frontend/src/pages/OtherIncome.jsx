import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OtherIncome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Other Income');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const [otherIncomeData] = useState([
    {
      id: 1,
      title: "Ganesh chaturthi",
      amountPerMember: "₹ 1,500",
      totalMember: "12",
      date: "01/07/2024",
      dueDate: "10/07/2024",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in..."
    },
    {
      id: 2,
      title: "Navratri",
      amountPerMember: "₹ 1,500",
      totalMember: "12",
      date: "01/07/2024",
      dueDate: "10/07/2024",
      description: "The celebration of Navratri involves the installation of clay idols of Durga in Resident..."
    },
    {
      id: 3,
      title: "Diwali",
      amountPerMember: "₹ 1,500",
      totalMember: "12",
      date: "01/07/2024",
      dueDate: "10/07/2024",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in..."
    },
    {
      id: 4,
      title: "Ganesh chaturthi",
      amountPerMember: "₹ 1,500",
      totalMember: "12",
      date: "01/07/2024",
      dueDate: "10/07/2024",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in..."
    }
  ]);

  // Add new state for participant modal
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Add participant data
  const participantData = [
    {
      unitNumber: '1001',
      paymentDate: '10/07/2024',
      status: 'Owner',
      phoneNumber: '92524 12365',
      amount: '1000',
      paymentType: 'Cash'
    },
    {
      unitNumber: '1002',
      paymentDate: '11/07/2024',
      status: 'Tenant',
      phoneNumber: '92458 12865',
      amount: '1000',
      paymentType: 'Online'
    },
    // ... add more participants
  ];

  // Add Participant List Modal Component
  const ParticipantListModal = ({ item }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-6xl h-[80vh] flex flex-col">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{item.title} Participator Member List</h2>
            <button 
              onClick={() => setIsParticipantModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tenant/Owner Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {participantData.map((participant, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{participant.unitNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.paymentDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      participant.status === 'Owner' 
                        ? 'bg-purple-100 text-purple-600' 
                        : 'bg-pink-100 text-pink-600'
                    }`}>
                      {participant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{participant.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">₹ {participant.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      participant.paymentType === 'Cash' 
                        ? 'bg-gray-100 text-gray-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {participant.paymentType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Handler for Maintenance tab click
  const handleMaintenanceClick = () => {
    navigate('/income'); // Income पेज पर नेविगेट (रूट पेज)
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'date') setDate(value);
    if (name === 'dueDate') setDueDate(value);
    if (name === 'description') setDescription(value);
    if (name === 'amount') setAmount(value);
  };

  // Add a new state to track the item being edited
  const [itemToEdit, setItemToEdit] = useState(null);

  // Update the handleViewClick function to set the item to edit
  const handleEditClick = (item) => {
    setItemToEdit(item); // Set the item to edit
    setTitle(item.title); // Pre-fill the title
    setDate(item.date); // Pre-fill the date
    setDueDate(item.dueDate); // Pre-fill the due date
    setDescription(item.description); // Pre-fill the description
    setAmount(item.amount); // Pre-fill the amount
    setIsModalOpen(true); // Open the modal
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemToEdit) {
      // Logic to update the existing item
      console.log('Updating item:', { title, date, dueDate, description, amount });
    } else {
      // Logic to create a new item
      console.log('Creating new item:', { title, date, dueDate, description, amount });
    }
    setIsModalOpen(false);
    // Reset the itemToEdit state after submission
    setItemToEdit(null);
  };

  // Add this modal component
  const CreateIncomeModal = () => {
    // Check if all required fields are filled
    const isFormValid = 
      title.trim() !== '' && 
      date !== '' && 
      dueDate !== '' && 
      description.trim() !== '' && 
      amount !== '';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-[400px] flex flex-col">
          {/* Modal Content */}
          <div className="p-6">
            <h2 className="text-xl  font-semibold mb-4">Create Other Income</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-black-600 mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter Title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-black-600 mb-1">Date*</label>
                  <input
                    type="date"
                    name="date"
                    value={date}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-black-600 mb-1">Due Date*</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={dueDate}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg px-3 py-2"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-black-600 mb-1">Description*</label>
                <textarea
                  name="description"
                  value={description}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter Description"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-black-600 mb-1">Amount*</label>
                <div className="relative">
                  <span className="absolute left-3 top-2">₹</span>
                  <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={handleInputChange}
                    className="w-full border rounded-lg pl-7 pr-3 py-2"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Buttons Section - Full Width at Bottom */}
          <div className="border-t w-full mt-auto">
            <div className="flex gap-4 p-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-3 text-gray-600 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 px-4 py-3 rounded-lg ${
                  isFormValid 
                    ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90'
                    : 'bg-[#F6F8FB] text-black-400 cursor-not-allowed'
                }`}
                disabled={!isFormValid}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Update dropdown menu click handler
  const handleViewClick = (item) => {
    setSelectedItem(item);
    setIsParticipantModalOpen(true);
    setDropdownOpen(null);
  };

  // Add new state for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Add Delete Confirmation Modal Component
  const DeleteConfirmationModal = ({ item }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Delete {item.title}</h3>
          <p className="text-gray-500 text-sm mb-6">
            Are you sure you want to delete this other income? 
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-14 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleDelete(item)}
              className="px-14 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Add delete handler
  const handleDelete = (item) => {
    // Add your delete logic here
    console.log('Deleting item:', item);
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  // Update delete button click handler
  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
    setDropdownOpen(null);
  };

  return (
    <div className='flex flex-col'>
      <div className="rounded-xl">
        <div className="flex gap-2 shadow-sm bg-[#F8F9FC] p-1 rounded-xl w-fit">
          <button
            onClick={handleMaintenanceClick}
            className={`px-6 py-2 rounded-lg transition-all ${
              activeTab === 'Maintenance'
                ? 'bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] font-bold text-white'
                : 'text-black-600'
            }`}
          >
            Maintenance
          </button>
          <button
            onClick={() => setActiveTab('Other Income')}
            className={`px-6 py-2 rounded-lg transition-all ${
              activeTab === 'Other Income'
                ? 'bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] font-bold text-white'
                : 'text-black-600'
            }`}
          >
            Other Income
          </button>
        </div>
      </div>
      
      <div className="bg-[#F8F9FC] min-h-screen px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Other Income</h2> 
          <button 
            className="px-4 py-2 bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] mt-5 text-white rounded-lg hover:opacity-90 flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            Create Other Income
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {otherIncomeData.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden w-[370px] shadow-sm">
              {/* Card Header */}
              <div className="bg-[#5B7BF0] p-3 flex justify-between items-center">
                <h3 className="text-white font-medium text-sm">{item.title}</h3>
                <div className="relative">
                  <button 
                    onClick={() => toggleDropdown(item.id)}
                    className="text-white hover:opacity-80"
                  >
                    <FaEllipsisV size={14} />
                  </button>
                  
                  {dropdownOpen === item.id && (
                    <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg z-10">
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => handleEditClick(item)} // Call handleEditClick on Edit button click
                      >
                        Edit
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => handleViewClick(item)}
                      >
                        View
                      </button>
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => handleDeleteClick(item)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-2.5">
                <div className='flex justify-between items-center'>
                  <p className="text-[14px] font-bold text-gray-400">Amount Per Member</p>
                  <p className="text-blue-500 bg-blue-100  px-3 py-1 rounded-xl font-bold text-sm">₹ 1,500</p>
                </div>
                <div className='flex justify-between items-center' >
                  <p className="text-[14px] font-bold text-gray-400">Total Member</p>
                  <p className="text-grey-500 text-sm">12</p>
                </div>
                <div className='flex justify-between items-center'>
                  <p className="text-[14px] font-bold text-gray-400">Date</p>
                  <p className="text-grey-500 text-sm">01/07/2024</p>
                </div>
                <div className='flex justify-between items-center'> 
                  <p className="text-[14px] font-bold text-gray-400">Due Date</p>
                  <p className="text-grey-500 text-sm">10/07/2024</p>
                </div>
                <div >
                  <p className="text-[14px] font-bold text-gray-400">Description</p>
                  <p className="text-[14px] font-semibold text-gray-600 line-clamp-2">
                    The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Render Modal */}
        {isModalOpen && <CreateIncomeModal />}
        {isParticipantModalOpen && <ParticipantListModal item={selectedItem} />}
        {isDeleteModalOpen && <DeleteConfirmationModal item={itemToDelete} />}
      </div>
    </div>
  );
};

export default OtherIncome;
