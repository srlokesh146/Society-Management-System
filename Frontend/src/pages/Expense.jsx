import React, { useState } from 'react';
import { FaImage, FaPlus, FaTimes } from 'react-icons/fa';
import eye from "../assets/images/eye.svg";
import edit from "../assets/images/edit.svg";
import trash from "../assets/images/trash.svg";

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
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
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

  const handleEditClick = (expense) => {
    setSelectedExpense(expense);
    setEditModalOpen(true);
  };

  const handleViewClick = (expense) => {
    setSelectedExpense(expense);
    setViewModalOpen(true);
  };

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setDeleteModalOpen(true);
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id)); // Remove the expense
    setDeleteModalOpen(false);
  };
  const handleViewFile = (file) => {
    const fileURL = URL.createObjectURL(file); // Create a URL for the file
    window.open(fileURL); // Open the file in a new tab
  };
  return (

    <div className="flex bg-white rounded-md flex-col p-8 overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-6 max-sm:flex-col">
        <h1 className="text-[20px] font-semibold text-gray-800 max-sm:mb-3">
          Add Expenses Details
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-4 py-2 rounded-md hover:opacity-90 flex items-center gap-2"
        >
          <FaPlus size={16} /> Add New Expenses details
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg w-[400px]  max-w-md mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Add Expense Details</h2>
              <div className="border-b border-[#F4F4F4] mb-[10px]"></div>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Field */}
                <div>
                  <label className="block text-sm text-black-600 mb-1">Title*</label>
                  <input
                    type="text"
                    placeholder="Enter Title"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newExpense.title}
                    onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                    required
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm text-black-600 mb-1">Description*</label>
                  <textarea
                    placeholder="Enter Description"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    required
                  />
                </div>

                {/* Date and Amount Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-black-600 mb-1">Date*</label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={newExpense.date}
                      onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-black-600 mb-1">Amount*</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">₹</span>
                      <input
                        type="text"
                        placeholder="0000"
                        className="w-full p-2 pl-7 border border-gray-300 rounded-lg"
                        value={newExpense.amount.replace('₹ ', '')}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: `₹ ${e.target.value}` })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-black-600 mb-1">Upload Bill*</label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
                    onClick={() => document.getElementById('fileInput').click()} // Trigger file input on click
                    onDragOver={(e) => e.preventDefault()} // Prevent default behavior for drag over
                    onDrop={(e) => {
                      e.preventDefault();
                      const files = e.dataTransfer.files;
                      if (files.length > 0) {
                        setNewExpense({ ...newExpense, bill: files[0] }); // Set the first file
                      }
                    }}
                  >
                    {newExpense.bill ? (
                      <p className="text-gray-600">{newExpense.bill.name}</p>
                    ) : (
                      <p className="text-gray-400">Upload a file or drag and drop</p>
                    )}
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    id="fileInput" // Hidden file input
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif" // Acceptable file types
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setNewExpense({ ...newExpense, bill: e.target.files[0] }); // Set the selected file
                      }
                    }}
                    className="hidden" // Hide the default file input
                  />
                </div>

                {/* Action Buttons */}
                <div className='flex gap-5 mt-4'>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="bg-white text-black w-[170px] px-4 py-3 border rounded-lg">Cancel</button>
                  <button
                    type="submit"
                    className={`w-[170px] px-4 py-3 bg-grey-200 border rounded-lg ${isFormValid ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] font-semibold text-white' : 'bg-[#F6F8FB] font-bold text-black-400 cursor-not-allowed'}`}
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
      <div className="overflow-x-auto visiter-table custom-scrollbar max-sm:overflow-7-auto">
        <table className="w-full rounded-lg">
          <thead>
            <tr className="bg-indigo-50 rounded-lg ">
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
              <tr key={expense.id} className='border-b border-grey-300'>
                <td className="px-6 py-4">{expense.title}</td>
                <td className="px-6 py-4">{expense.description}</td>
                <td className="px-6 py-4">{expense.date}</td>
                <td className="px-6 py-4 text-green-600">{expense.amount}</td>
                <td className="px-6 py-4 flex items-center">
                  <FaImage size={14} className='text-blue-500 bg-indigo-50' /> <span className="ml-2">{expense.billFormat}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(expense)} // Open edit modal
                      className="cursor-pointer text-blue-500 hover:text-blue-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                    >
                      <img src={edit} />
                    </button>
                    <button
                      onClick={() => handleViewClick(expense)} // Open view modal
                      className="cursor-pointer text-green-500 hover:text-green-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                    >
                      <img src={eye} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(expense)} // Open delete modal
                      className="cursor-pointer text-red-500 hover:text-red-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                    >
                      <img src={trash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Edit Expenses</h2>
            <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Update the expenses state with the edited expense
                setExpenses(expenses.map(expense =>
                  expense.id === selectedExpense.id ? selectedExpense : expense
                ));
                setEditModalOpen(false); // Close the modal after saving
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm text-black-600 mb-1">Title*</label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={selectedExpense?.title}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm text-black-600 mb-1">Description*</label>
                <textarea
                  placeholder="Enter Description"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={selectedExpense?.description}
                  onChange={(e) => setSelectedExpense({ ...selectedExpense, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-black-600 mb-1">Date*</label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={selectedExpense?.date}
                    onChange={(e) => setSelectedExpense({ ...selectedExpense, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm text-black-600 mb-1">Amount*</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">₹</span>
                    <input
                      type="text"
                      placeholder="0000"
                      className="w-full p-2 pl-7 border border-gray-300 rounded-lg"
                      value={selectedExpense?.amount.replace('₹ ', '')}
                      onChange={(e) => setSelectedExpense({ ...selectedExpense, amount: `₹ ${e.target.value}` })}
                    />
                  </div>
                </div>
              </div>
              <div>
                  <label className="block text-sm text-black-600 mb-1">Upload Bill*</label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
                    onClick={() => document.getElementById('fileInput').click()} // Trigger file input on click
                    onDragOver={(e) => e.preventDefault()} // Prevent default behavior for drag over
                    onDrop={(e) => {
                      e.preventDefault();
                      const files = e.dataTransfer.files;
                      if (files.length > 0) {
                        setNewExpense({ ...newExpense, bill: files[0] }); // Set the first file
                      }
                    }}
                  >
                    {newExpense.bill ? ( // Change selectedExpense to newExpense
                      <p className="text-gray-600">{newExpense.bill.name}</p> // Change selectedExpense to newExpense
                    ) : (
                      <p className="text-gray-400">Upload a file or drag and drop</p>
                    )}
                    <p className="text-xs text-gray-500">PNG, JPG, or up to 10MB</p>
                  </div>
                  <input
                    id="fileInput" // Hidden file input
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif" // Acceptable file types
                    onChange={(e) => {
                      if (e.target.files.length > 0) {
                        setNewExpense({ ...newExpense, bill: e.target.files[0] }); // Set the selected file
                      }
                    }}
                    className="hidden" // Hide the default file input
                  />
                </div>

              <div className='flex gap-4  ml-2'>
                <button type="button" onClick={() => setEditModalOpen(false)} className="bg-white text-black w-[160px] px-4 py-3 border rounded-md">Cancel</button>
                <button
                  type="submit"
                  className="w-[160px] bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-3 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button onClick={() => setViewModalOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <FaTimes size={20} /> {/* Cancel icon */}
            </button>
            <h2 className="text-xl font-semibold mb-4">View Expense Details</h2>
            <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
            <div className="mb-4">
              <label className="block text-sm text-grey-800 mb-1">Title:</label>
              <p className="text-black font-medium">{selectedExpense?.title}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-grey-800 mb-1">Description:</label>
              <p className="text-black">{selectedExpense?.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-grey-800 mb-1">Date:</label>
                <p className="text-black">{selectedExpense?.date}</p>
              </div>
              <div>
                <label className="block text-sm text-grey-800 mb-1">Amount:</label>
                <p className="text-black font-medium">{selectedExpense?.amount}</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-black-600 mb-1">Bill:</label>
              {selectedExpense?.bill ? (
                <div className="flex items-center">
                  <p className="text-gray-800">{selectedExpense.bill.name} ({(selectedExpense.bill.size / 1024).toFixed(2)} MB)</p>
                  <button className="ml-2 text-blue-500 hover:underline" onClick={() => handleViewFile(selectedExpense.bill)}>View</button>
                </div>
              ) : (
                <p className="text-gray-400">No bill uploaded</p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Delete Expense?</h2>
            <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
            <p className="text-gray-600">Are you sure you want to delete {selectedExpense?.title}?</p>
            <div className="flex justify-center space-x-4 mt-6">
              <button onClick={() => setDeleteModalOpen(false)} className="bg-white border w-[170px] text-black px-4 py-2 rounded-md hover:bg-gray-100">Cancel</button>
              <button onClick={() => handleDelete(selectedExpense.id)} className="bg-red-500 w-[170px] text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Expense;