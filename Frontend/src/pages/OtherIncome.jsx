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
    },
    {
      id: 5,
      title: "Christmas",
      amount: "₹2,000",
      totalMembers: 12,
      date: "15/12/2024",
      dueDate: "25/12/2024",
      description: "Christmas is celebrated with decorations, gifts, and a Christmas tree to mark the festive season..."
    },
  ]);

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