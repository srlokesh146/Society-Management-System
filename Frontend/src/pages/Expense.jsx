import React, { useState } from 'react';
import { FaCheck, FaEye, FaTrash, FaPen, FaPlus, FaUpload } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';

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
    description: "Back the fluctuations in your spending over we time...",
    date: "11/02/2024",
    amount: "₹ 1000",
    billFormat: "PDF"
  },
  {
    id: 3,
    title: "Housing Costs",
    description: "Back the fluctuations in your spending over we time...",
    date: "11/02/2024",
    amount: "₹ 1000",
    billFormat: "PDF"
  },
  {
    id: 4,
    title: "Housing Costs",
    description: "Back the fluctuations in your spending over we time...",
    date: "11/02/2024",
    amount: "₹ 1000",
    billFormat: "PDF"
  },
  // ... add more initial data
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
  const [isDragging, setIsDragging] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setNewExpense({ ...newExpense, bill: file });
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewExpense({ ...newExpense, bill: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newExpense.title);
    formData.append('description', newExpense.description);
    formData.append('date', newExpense.date);
    formData.append('amount', newExpense.amount);
    formData.append('bill', newExpense.bill);

    const newId = expenses.length + 1;
    const billFormat = newExpense.bill?.name.split('.').pop().toUpperCase();
    
    setExpenses([...expenses, {
      id: newId,
      ...newExpense,
      billFormat,
      amount: `₹ ${newExpense.amount}`
    }]);
    
    setIsModalOpen(false);
    setNewExpense({
      title: '',
      description: '',
      date: '',
      amount: '',
      bill: null
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedExpenses = expenses.map(exp => {
      if (exp.id === selectedExpense.id) {
        return {
          ...selectedExpense,
          amount: selectedExpense.amount.includes('₹') ? 
            selectedExpense.amount : 
            `₹ ${selectedExpense.amount}`
        };
      }
      return exp;
    });
    
    setExpenses(updatedExpenses);
    setIsEditModalOpen(false);
    setSelectedExpense(null);
  };

  const isFormValid = (expense) => {
    return expense.title && 
           expense.description && 
           expense.date && 
           expense.amount && 
           expense.bill;
  };

  const ExpenseModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Add Expenses Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-black-600 mb-1">Title*</label>
              <input
                name="title"
                type="text"
                placeholder="Enter Title"
                className="w-full p-2 border border-gray-200 rounded-lg"
                value={newExpense.title}
                onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm text-black-600 mb-1">Description*</label>
              <textarea
                name="description"
                placeholder="Enter Description"
                className="w-full p-2 border border-gray-200 rounded-lg"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
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
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm text-black-600 mb-1">Amount*</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">₹</span>
                  <input
                    name="amount"   
                    type="number"
                    placeholder="0000"
                    className="w-full p-2 pl-7 border border-gray-200 rounded-lg"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-black-600 mb-1">Upload Bill*</label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                name="bill"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput').click()}

              >
                {newExpense.bill ? (
                  <div className="text-sm text-gray-600">
                    File selected: {newExpense.bill.name}
                  </div>
                ) : (
                  <>
                    <FaUpload className="mx-auto text-gray-400 mb-2" size={24} />
                    <p className="text-blue-600 text-sm mb-1">Upload a file or drag and drop</p>
                    <p className="text-gray-400 text-xs">PNG, JPG, PDF up to 10MB</p>
                  </>
                )}
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={handleFileInput}
                  accept=".png,.jpg,.jpeg,.pdf"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid(newExpense)}
                className={`w-full py-2 text-black rounded-lg ${
                  isFormValid(newExpense)
                    ? 'bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] hover:opacity-90'
                    : 'bg-[#F6F8FB]  font-semibold cursor-not-allowed'
                }`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const ViewExpenseModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">View Expense Details</h2>
            <button 
              onClick={() => {
                setIsViewModalOpen(false);
                setSelectedExpense(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-medium text-gray-900">{selectedExpense?.title}</h3>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Description</p>
              <p className="text-sm text-gray-900 mt-0.5">{selectedExpense?.description}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="text-sm text-gray-900 mt-0.5">{selectedExpense?.date}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Amount</p>
              <p className="text-sm text-gray-900 mt-0.5">₹ {selectedExpense?.amount?.replace('₹ ', '')}</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-500">Bill</p>
              <div className="flex items-center gap-3 mt-1.5 bg-gray-50 p-2 rounded-md">
                <img 
                  src={selectedExpense?.billFormat === 'PDF' ? '/pdf-icon.svg' : '/jpg-icon.svg'} 
                  className="w-5 h-5" 
                  alt={selectedExpense?.billFormat} 
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Attached Front Side.{selectedExpense?.billFormat}</p>
                  <p className="text-xs text-gray-500">27 KB</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <FiDownload size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DeleteExpenseModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Delete Expense ?</h2>
          <p className="text-gray-600 mb-6">Are you sure you want to delete this expense? </p>
          
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedExpense(null);
              }}
              className="w-full py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setExpenses(expenses.filter(exp => exp.id !== selectedExpense.id));
                setIsDeleteModalOpen(false);
                setSelectedExpense(null);
              }}
              className="w-full py-2 text-white bg-[#E74C3C] rounded-lg hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const EditExpenseModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Edit Expense Details</h2>
            <button 
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedExpense(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-black-600 mb-1">Title*</label>
              <input
                type="text"
                placeholder="Enter Title"
                className="w-full p-2 border border-gray-200 rounded-lg"
                value={selectedExpense?.title || ''}
                onChange={(e) => setSelectedExpense({...selectedExpense, title: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm text-black-600 mb-1">Description*</label>
              <textarea
                placeholder="Enter Description"
                className="w-full p-2 border border-gray-200 rounded-lg"
                value={selectedExpense?.description || ''}
                onChange={(e) => setSelectedExpense({...selectedExpense, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-black-600 mb-1">Date*</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  value={selectedExpense?.date || ''}
                  onChange={(e) => setSelectedExpense({...selectedExpense, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm text-black-600 mb-1">Amount*</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">₹</span>
                  <input
                    type="number"
                    placeholder="0000"
                    className="w-full p-2 pl-7 border border-gray-200 rounded-lg"
                    value={selectedExpense?.amount?.replace('₹ ', '') || ''}
                    onChange={(e) => setSelectedExpense({...selectedExpense, amount: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-black-600 mb-1">Upload Bill*</label>
              <div
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    setSelectedExpense({
                      ...selectedExpense,
                      bill: file,
                      billFormat: file.name.split('.').pop().toUpperCase()
                    });
                  }
                }}
                onClick={() => document.getElementById('editFileInput').click()}
              >
                {selectedExpense?.bill ? (
                  <div className="text-sm text-gray-600">
                    File selected: {selectedExpense.bill.name || `Current.${selectedExpense.billFormat}`}
                  </div>
                ) : (
                  <>
                    <FaUpload className="mx-auto text-gray-400 mb-2" size={24} />
                    <p className="text-blue-600 text-sm mb-1">Upload a file or drag and drop</p>
                    <p className="text-gray-400 text-xs">PNG, JPG, PDF up to 10MB</p>
                  </>
                )}
                <input
                  id="editFileInput"
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSelectedExpense({
                        ...selectedExpense,
                        bill: file,
                        billFormat: file.name.split('.').pop().toUpperCase()
                      });
                    }
                  }}
                  accept=".png,.jpg,.jpeg,.pdf"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedExpense(null);
                }}
                className="w-full py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!isFormValid(selectedExpense || {})}
                className={`w-full py-2 text-black rounded-lg ${
                  isFormValid(selectedExpense || {})
                    ? 'bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] hover:opacity-90'
                    : 'bg-[#F6F8FB] font-semibold cursor-not-allowed'
                }`}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const renderActionButtons = (expense) => (
    <div className="flex gap-2">
      <button 
        onClick={() => {
          setSelectedExpense(expense);
          setIsEditModalOpen(true);
        }}
        className="p-1.5 rounded-md bg-green-50 text-green-600 hover:bg-green-100"
      >
        <FaCheck size={14} />
      </button>
      <button 
        onClick={() => {
          setSelectedExpense(expense);
          setIsViewModalOpen(true);
        }}
        className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
      >
        <FaEye size={14} />
      </button>
      <button 
        onClick={() => {
          setSelectedExpense(expense);
          setIsDeleteModalOpen(true);
        }}
        className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
      >
        <FaTrash size={14} />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white rounded-lg">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Add Expenses Details</h1>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-4 py-2 rounded-md hover:opacity-90 flex items-center gap-2"
            >
              <FaPlus size={16} />  Add New Expenses details
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-50 ">
                  <th className="text-left px-6 py-3 text-md font-semibold text-black-800">Title</th>
                  <th className="text-left px-6 py-3 text-md font-semibold text-black-800">Description</th>
                  <th className="text-left px-6 py-3 text-md font-semibold text-black-800">Date</th>
                  <th className="text-left px-6 py-3 text-md font-semibold text-black-800">Amount</th>
                  <th className="text-left px-6 py-3 text-md font-semibold text-black-800">Bill Format</th>
                  <th className="text-left px-6 py-3 text-md font-semibold text-black-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-bold text-gray-600">{expense.title}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-600">{expense.description}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-600">{expense.date}</td>
                    <td className="px-6 py-4 text-sm  font-bold text-green-600">{expense.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs
                        ${expense.billFormat === 'PDF' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                        {expense.billFormat === 'PDF' ? 
                          <img src="/pdf-icon.svg" className="w-4 h-4" alt="PDF" /> : 
                          <img src="/jpg-icon.svg" className="w-4 h-4" alt="JPG" />
                        }
                        {expense.billFormat}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {renderActionButtons(expense)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && <ExpenseModal />}
      {isViewModalOpen && selectedExpense && <ViewExpenseModal />}
      {isDeleteModalOpen && selectedExpense && <DeleteExpenseModal />}
      {isEditModalOpen && selectedExpense && <EditExpenseModal />}
    </div>
  );
}

export default Expense;