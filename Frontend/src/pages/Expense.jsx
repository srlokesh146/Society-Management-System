import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaEye,
  FaFileUpload,
  FaImage,
  FaPencilAlt,
  FaPlus,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import {
  CreateExpense,
  DeleteExpense,
  GetExpenses,
  UpdateExpense,
} from "../services/expenseService";

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [newExpense, setNewExpense] = useState({
    title: "",
    description: "",
    date: "",
    amount: "",
    bill: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CreateExpense(newExpense);
      fetchExpenses();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsModalOpen(false);
      setNewExpense({
        title: "",
        description: "",
        date: "",
        amount: "",
        bill: null,
      });
    }
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
    document.getElementById("fileInput").click(); // Trigger the file input click
  };

  const isFormValid =
    newExpense.title &&
    newExpense.description &&
    newExpense.date &&
    newExpense.amount &&
    newExpense.bill;

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

  const handleDelete = async (id) => {
    try {
      setExpenses(expenses.filter((expense) => expense._id !== id));
      const response = await DeleteExpense(id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const handleViewFile = (file) => {
    window.open(file);
  };

  const handleExpenseUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await UpdateExpense(
        selectedExpense._id,
        selectedExpense
      );
      fetchExpenses();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setEditModalOpen(false);
      setSelectedExpense(null);
    }
  };

  // fetch expense data
  const fetchExpenses = async () => {
    try {
      const response = await GetExpenses();
      setExpenses(response.data.Expense);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="flex bg-white rounded-md flex-col p-8 max-sm:container max-sm:mx-auto max-md:container max-md:mx-auto max-lg:container max-lg:mx-auto    
    security-table max-md:flex-1 max-2xl:container overflow-y-auto custom-scrollbar">
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">
                Add Expense Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title Field */}
                <div>
                  <label className="block text-sm text-black-600 mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    name="title" // Add name attribute
                    placeholder="Enter Title"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newExpense.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className="block text-sm text-black-600 mb-1">
                    Description*
                  </label>
                  <textarea
                    name="description" // Add name attribute
                    placeholder="Enter Description"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={newExpense.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* Date and Amount Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-black-600 mb-1">
                      Date*
                    </label>
                    <input
                      type="date"
                      name="date" // Add name attribute
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      value={newExpense.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-black-600 mb-1">
                      Amount*
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">₹</span>
                      <input
                        type="text"
                        name="amount" // Add name attribute
                        placeholder="0000"
                        className="w-full p-2 pl-7 border border-gray-300 rounded-lg"
                        value={newExpense.amount}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-black-600 mb-1">
                    Upload Bill*
                  </label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
                    onClick={() => document.getElementById("fileInput").click()} // Trigger file input on click
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
                      <p className="text-gray-400">
                        Upload a file or drag and drop
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    id="fileInput" // Hidden file input
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif" // Acceptable file types
                    onChange={handleFileChange}
                    className="hidden" // Hide the default file input
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-5 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 text-black w-[190px] px-4 py-2 border rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`w-[190px] px-4 py-2 border rounded-md ${
                      isFormValid
                        ? "bg-gradient-to-r from-[#FE512E] to-[#F09619] font-semibold text-white"
                        : "bg-[#F6F8FB] text-gray-400 cursor-not-allowed"
                    }`}
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
              <th className="text-left px-6 py-3 text-md font-semibold text-black-800">
                Title
              </th>
              <th className="text-left px-6 py-3 text-md font-semibold text-black-800">
                Description
              </th>
              <th className="text-left px-6 py-3 text-md font-semibold text-black-800">
                Date
              </th>
              <th className="text-left px-6 py-3 text-md font-semibold text-black-800">
                Amount
              </th>
              <th className="text-left px-6 py-3 text-md font-semibold text-black-800">
                Bill Format
              </th>
              <th className="text-left px-6 py-3 text-md font-semibold text-black-800">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, i) => (
              <tr key={i} className="border-b border-grey-300">
                <td className="px-6 py-4">{expense.title}</td>
                <td className="px-6 py-4">{expense.description}</td>
                <td className="px-6 py-4">
                  {new Date(expense.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 text-green-600">₹ {expense.amount}</td>
                <td className="px-6 py-4 flex items-center">
                  <FaImage size={14} className="text-blue-500 bg-indigo-50" />{" "}
                  <span className="ml-2">{expense.bill?.split(".").pop()}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditClick(expense)} // Open edit modal
                      className="p-1.5 rounded-md bg-green-50 text-green-600 hover:bg-green-100"
                    >
                      <FaPencilAlt size={14} />
                    </button>
                    <button
                      onClick={() => handleViewClick(expense)} // Open view modal
                      className="p-1.5 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
                    >
                      <FaEye size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(expense)} // Open delete modal
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
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Expenses</h2>
            <form onSubmit={handleExpenseUpdate} className="space-y-4">
              <div>
                <label className="block text-sm text-black-600 mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={selectedExpense?.title}
                  onChange={(e) =>
                    setSelectedExpense({
                      ...selectedExpense,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm text-black-600 mb-1">
                  Description*
                </label>
                <textarea
                  placeholder="Enter Description"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={selectedExpense?.description}
                  onChange={(e) =>
                    setSelectedExpense({
                      ...selectedExpense,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-black-600 mb-1">
                    Date*
                  </label>
                  <input
                    type="date"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    defaultValue={
                      new Date(selectedExpense.date).toISOString().split("T")[0]
                    }
                    onChange={(e) =>
                      setSelectedExpense({
                        ...selectedExpense,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm text-black-600 mb-1">
                    Amount*
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5">₹</span>
                    <input
                      type="text"
                      placeholder="0000"
                      className="w-full p-2 pl-7 border border-gray-300 rounded-lg"
                      value={selectedExpense?.amount}
                      onChange={(e) =>
                        setSelectedExpense({
                          ...selectedExpense,
                          amount: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-black-600 mb-1">
                  Upload Bill*
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
                  onClick={() => document.getElementById("fileInput").click()} // Trigger file input on click
                  onDragOver={(e) => e.preventDefault()} // Prevent default behavior for drag over
                  onDrop={(e) => {
                    e.preventDefault();
                    const files = e.dataTransfer.files;
                    if (files.length > 0) {
                      setSelectedExpense({
                        ...selectedExpense,
                        bill: files[0],
                      }); // Set the first file
                    }
                  }}
                >
                  {selectedExpense.bill ? ( // Change selectedExpense to newExpense
                    <p className="text-gray-600">{selectedExpense.bill.name}</p> // Change selectedExpense to newExpense
                  ) : (
                    <p className="text-gray-400">
                      Upload a file or drag and drop
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    PNG, JPG, or up to 10MB
                  </p>
                </div>
                <input
                  id="fileInput" // Hidden file input
                  type="file"
                  accept=".png, .jpg, .jpeg, .gif" // Acceptable file types
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setSelectedExpense({
                        ...selectedExpense,
                        bill: e.target.files[0],
                      }); // Set the selected file
                    }
                  }}
                  className="hidden" // Hide the default file input
                />
              </div>

              <div className="flex gap-5 mt-4">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="bg-gray-300 text-black w-[190px] px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-[190px] bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setViewModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={20} /> {/* Cancel icon */}
            </button>
            <h2 className="text-xl font-semibold mb-4">View Expense Details</h2>
            <div className="mb-4">
              <label className="block text-sm text-grey-800 mb-1">Title:</label>
              <p className="text-black font-medium">{selectedExpense?.title}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-grey-800 mb-1">
                Description:
              </label>
              <p className="text-black">{selectedExpense?.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-grey-800 mb-1">
                  Date:
                </label>
                <p className="text-black">
                  {new Date(selectedExpense.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <label className="block text-sm text-grey-800 mb-1">
                  Amount:
                </label>
                <p className="text-black font-medium">
                  ₹ {selectedExpense?.amount}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-black-600 mb-1">Bill:</label>
              {selectedExpense?.bill ? (
                <div className="flex items-center">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleViewFile(selectedExpense.bill)}
                  >
                    view
                  </button>
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
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Delete Expense?</h2>
            <p className="text-gray-600">
              Are you sure you want to delete {selectedExpense?.title}?
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-white border w-[170px] text-black px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedExpense._id)}
                className="bg-red-500 w-[170px] text-white px-4 py-2 rounded-md hover:bg-red-600"
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

export default Expense;
