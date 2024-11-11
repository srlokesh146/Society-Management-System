import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import CreateIncomeModal from '../components/modal/CreateIncomeModal';

const OtherIncome = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    dueDate: '',
    description: '',
    amount: ''
  });
  
  const [incomeEntries, setIncomeEntries] = useState([
    {
      id: 1,
      title: "Ganesh Chaturthi",
      amount: "₹1,500",
      totalMembers: 12,
      date: "01/07/2024",
      dueDate: "10/07/2024",
      description: "The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesa in..."
    },
    {
      id: 2,
      title: "Navratri",
      amount: "₹1,800",
      totalMembers: 12,
      date: "01/07/2024",
      dueDate: "10/07/2024",
      description: "The celebration of Navratri involves the installation of clay idols of Durga in Resident..."
    },
    {
      id: 3,
      title: "Diwali",
      amount: "₹1,500",
      totalMembers: 12,
      date: "01/07/2024",
      dueDate: "10/07/2024",
      description: "The celebration of Diwali involves lighting diyas and fireworks to celebrate the triumph..."
    },
    {
      id: 4,

      title: "Holi",
      amount: "₹1,200",
      totalMembers: 12,
      date: "01/03/2024",
      dueDate: "08/03/2024",
      description: "Holi is celebrated with colors and sweets, marking the arrival of spring and good harvest..."

      title: "Ganesh Chaturthi",
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

     
   

  ]);

    // ... add more participants
  ];

  // Add Participant List Modal Component
  const ParticipantListModal = ({ item }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg w-[90%] max-w-6xl h-[80vh] flex flex-col">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{item.title} Participator Member List</h2>
            <button 
              onClick={() => setIsParticipantModalOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-[30px]"
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


  const [activeTab, setActiveTab] = useState('otherIncome'); // State for active tab

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: incomeEntries.length + 1,
      ...formData
    };
    setIncomeEntries([...incomeEntries, newEntry]);
    setIsModalOpen(false);

    setFormData({
      title: '',
      date: '',
      dueDate: '',
      description: '',
      amount: ''
    });
  };

  const handleIncomeClick = () => {
    setActiveTab('income'); // Set active tab to income
    navigate("/income"); // Navigate to the Income page

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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-lg w-[400px] flex flex-col">
          {/* Modal Content */}
          <div className="p-6">
            <h2 className="text-xl  font-semibold mb-4">Create Other Income</h2>
            <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-black-600 mb-1">Title*</label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2 outline-none"
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
                    className="w-full border rounded-lg px-3 py-2 outline-none"
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
                    className="w-full border rounded-lg px-3 py-2 outline-none"
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
                  className="w-full border rounded-lg px-3 py-2 outline-none"
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
                    className="w-full border rounded-lg pl-7 pr-3 py-2 outline-none"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Buttons Section - Full Width at Bottom */}
          <div className="w-full mt-auto">
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
                className={`flex-1 px-4 py-3 rounded-lg h-[51px] ${
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <div className="text-start">
          <h3 className="text-[20px] font-semibold mb-2">Delete {item.title}</h3>
          <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
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
              className="px-14 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 h-[51px]"
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

  const handleOtherIncomeClick = () => {
    setActiveTab('otherIncome'); // Set active tab to other income
  };

  return (
    <div className='flex flex-col p-8' >
       <div className="flex gap-4 mb-4">
        <button 
           className={`px-4 py-2 rounded-lg shadow-md transition duration-200 ${activeTab === 'income' ? 'bg-orange-500 text-white' : 'bg-white-200 text-black'}`}
          onClick={handleIncomeClick}
        >
          Maintenance
        </button>
        <button 
          className={`px-4 py-2 rounded-lg shadow-md transition duration-200 ${activeTab === 'otherIncome' ? 'bg-orange-500 text-white' : 'bg-gray-200 text-black hover:bg-gray-300'}`}
          onClick={handleOtherIncomeClick}
        >
          Other Income
        </button>
      </div>
     <div className="flex flex-col  rounded-lg p-8 bg-white min-h-screen">
    
      <div className=" ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Other Income</h2>
          <button
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            onClick={() => setIsModalOpen(true)}
          >
            Create Other Income
          </button>
        </div>

        <CreateIncomeModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleSubmit={handleSubmit} 
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {incomeEntries.map((entry) => (
            <div key={entry.id} className="bg-white shadow-lg rounded-lg  border border-blue-300">
              <div className="flex flex-col  mb-2">
                <div className="bg-[#5678E9] text-white w-full p-2 rounded-t-lg">
                  <h3 className="text-lg h-11 p-2 font-semibold">{entry.title}</h3>
                </div>
                <div className="flex justify-between items-center">
                  <button className="text-gray-500 hover:text-gray-700">
                    <i className="fas fa-ellipsis-v"></i>
                  </button> 

              {/* Card Content */}
              <div className="p-4 space-y-2.5">
                <div className='flex justify-between items-center'>
                  <p className="text-[14px] font-semibold text-gray-400">Amount Per Member</p>
                  <p className="text-blue-500 bg-blue-100  px-3 py-1 rounded-xl font-semibold text-sm">₹ 1,500</p>
                </div>
                <div className='flex justify-between items-center' >
                  <p className="text-[14px] font-semibold text-gray-400">Total Member</p>
                  <p className="text-grey-500 text-sm">12</p>
                </div>
                <div className='flex justify-between items-center'>
                  <p className="text-[14px] font-semibold text-gray-400">Date</p>
                  <p className="text-grey-500 text-sm">01/07/2024</p>
                </div>
                <div className='flex justify-between items-center'> 
                  <p className="text-[14px] font-semibold text-gray-400">Due Date</p>
                  <p className="text-grey-500 text-sm">10/07/2024</p>
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-gray-400 mb-[10px]">Description</p>
                  <p className="text-[14px] font-semibold text-gray-600 line-clamp-2">
                    The celebration of Ganesh Chaturthi involves the installation of clay idols of Ganesh in...
                  </p>

                </div>
              </div>
              <p className="text-gray-600 p-2">Amount Per Member: <strong>{entry.amount}</strong></p>
              <p className="text-gray-600 p-2">Total Members: <strong>{entry.totalMembers}</strong></p>
              <p className="text-gray-600 p-2">Date: <strong>{entry.date}</strong></p>
              <p className="text-gray-600 p-2">Due Date: <strong>{entry.dueDate}</strong></p>
              <p className="text-gray-600 p-2 mt-2 text-sm">
                Description: <br />
                {entry.description.length > 100 ? entry.description.slice(0, 100) + '...' : entry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
     </div>
    </div>
  );
};

export default OtherIncome;