import React, { useState } from 'react';
import { FaEye, FaFileUpload, FaPencilAlt, FaPlus, FaTrash } from 'react-icons/fa';


const initialExpenses = [
  {
    id: 1,
    title: "Rent or Mortgage",
    description: "A visual representation of your spending categories...",
    date: "10/02/2024",
    amount: "₹ 1000",
    billFormat: "JPG"
  },
  {
    id: 2,
    title: "Housing Costs",
    description: "Rack the fluctuations in your spending over time...",
    date: "11/02/2024",
    amount: "₹ 1000",
    billFormat: "PDF"
  },
  // ... other initial expenses
];

function Expense() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    description: '',
    date: '',
    amount: '',
    bill: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the input fields
    if (!newExpense.title || !newExpense.description || !newExpense.date || !newExpense.amount || !newExpense.bill) {
      alert("Please fill in all fields.");
      return;
    }

    // Create a new expense object
    const newId = expenses.length + 1; // Generate a new ID
    const billFormat = newExpense.bill.name.split('.').pop().toUpperCase(); // Get the file format

    const newExpenseData = {
      id: newId,
      title: newExpense.title,
      description: newExpense.description,
      date: newExpense.date,
      amount: `₹ ${newExpense.amount}`, // Format the amount
      billFormat: billFormat // Add the bill format
    };

    // Update the expenses state
    setExpenses([...expenses, newExpenseData]);

    // Reset the form
    setIsModalOpen(false);
    setNewExpense({
      title: '',
      description: '',
      date: '',
      amount: '',
      bill: null
    });
  };

  const handleFileChange = (e) => {
    setNewExpense({ ...newExpense, bill: e.target.files[0] });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setNewExpense({ ...newExpense, bill: files[0] });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleIconClick = () => {
    document.getElementById('fileInput').click(); // Trigger the file input click
  };
  const isFormValid = newExpense.title && newExpense.description && newExpense.date && newExpense.amount && newExpense.bill;

  return (
    <div className='flex flex-col p-8'>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Expenses Details</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-4 py-2 rounded-md hover:opacity-90 flex items-center gap-2"
        >
          <FaPlus size={16} /> Add New Expenses details
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Add Expense Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-black-600 mb-1">Title*</label>
                  <input
                    name="title"
                    type="text"
                    placeholder="Enter Title"
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    value={newExpense.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm text-black-600 mb-1">Description*</label>
                  <textarea
                    name="description"
                    placeholder="Enter Description"
                    className="w-full p-2 border border-gray-200 rounded-lg"
                    value={newExpense.description}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-black-600 mb-1">Date*</label>
                    <input
                      name="date"
                      type="date"
                      className="w-full p-2 border border-gray-200 rounded-lg"
                      value={newExpense.date}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-black-600 mb-1">Amount*</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">₹</span>
                      <input
                        name="amount"
                        type="text" // Change to text
                        placeholder="0000"
                        className="w-full p-2 pl-7 border border-gray-200 rounded-lg"
                        value={newExpense.amount}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, ''); // Allow only numbers
                          setNewExpense({ ...newExpense, amount: value });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-black-600 mb-1">Upload Bill*</label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={handleIconClick} // Open file dialog on click
                  >
                    {newExpense.bill ? (
                      <p className="text-gray-600">{newExpense.bill.name}</p>
                    ) : (
                      <div>
                        <FaFileUpload className="mx-auto text-gray-400 mb-2" size={24} /> {/* Icon */}
                        <p className="text-gray-400">Upload a file or drag and drop</p>
                      </div>
                    )}
                    <p className="text-xs text-gray-500">PNG, JPG, or up to 10MB</p>
                  </div>
                  <input
                    id="fileInput" // Add an ID to the input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden" // Hide the default file input
                    accept=".png, .jpg, .jpeg"
                  />
                </div>

                <div className='flex gap-5'>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white text-black w-[190px] px-4 py-2 border rounded-md">Cancel</button>
                  <button 
                    type="submit" 
                    className={`w-[190px] px-4 py-2 border rounded-md ${isFormValid ? 'bg-[#F6F8FB] font-semibold text-black' : 'bg-white text-gray-400 cursor-not-allowed'}`} 
                    disabled={!isFormValid} // Disable button if form is not valid
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-50">
              <th className="text-left px-6 py-3 text-md font-semibold text-black-800">Title</th>
              <th className="text-left px-6 py-3 text-md font-semibold text-black-800">Description</th>
              <th className="text-left px-6 py-3 text-md font-semibold text-black-800">Date</th>
              <th className="text-left px-6 py-3 text-md font-semibold text-black-800">Amount</th>
              <th className="text-left px-6 py-3 text-md font-semibold text-black-800">Bill Format</th>
              <th className="text-left px-6 py-3 text-md font-semibold text-black-800">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td className="px-6 py-4">{expense.title}</td>
                <td className="px-6 py-4">{expense.description}</td>
                <td className="px-6 py-4">{expense.date}</td>
                <td className="px-6 py-4">{expense.amount}</td>
                <td className="px-6 py-4">{expense.billFormat}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => alert(Editing `${expense.title}`)} // Replace with actual edit logic
                      className="p-1.5 rounded-md bg-green-50 text-green-600 hover:bg-green-100"
                    >
                      <FaPencilAlt size={14} />
                    </button>
                    <button
                      onClick={() => alert(Viewing `${expense.title}`)} // Replace with actual view logic
                      className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      <FaEye size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)} // Delete logic
                      className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
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
  );
}

export default Expense;