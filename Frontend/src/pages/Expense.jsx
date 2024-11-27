import React, { useEffect, useState } from 'react'
import { FaFilePdf, FaImage, FaPlus, FaTimes } from 'react-icons/fa'
import eye from '../assets/images/eye.svg'
import edit from '../assets/images/edit.svg'
import plus from '../assets/images/plus.svg'
import Addimage from '../assets/images/Addimage.svg'
import trash from '../assets/images/trash.svg'
import {
  CreateExpense,
  DeleteExpense,
  GetExpenses,
  UpdateExpense
} from '../services/expenseService'
import toast from 'react-hot-toast'

function Expense () {
  const [expenses, setExpenses] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [isViewModalOpen, setViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedExpense, setSelectedExpense] = useState(null)
  const [newExpense, setNewExpense] = useState({
    title: '',
    description: '',
    date: '',
    amount: '',
    bill: null
  })

  const isFormValid =
    newExpense.title &&
    newExpense.description &&
    newExpense.date &&
    newExpense.amount &&
    newExpense.bill

  const handleEditClick = expense => {
    setSelectedExpense(expense)
    setEditModalOpen(true)
  }

  const handleViewClick = expense => {
    setSelectedExpense(expense)
    setViewModalOpen(true)
  }

  const handleDeleteClick = expense => {
    setSelectedExpense(expense)
    setDeleteModalOpen(true)
  }

  const handleViewFile = file => {
    window.open(file)
  }

  const FileTypeIcon = extension => {
    switch (extension.fileName) {
      case 'JPG':
      case 'JPEG':
      case 'PNG':
      case 'GIF':
      case 'BMP':
      case 'SVG':
        return <FaImage size={14} className='text-blue-500 bg-indigo-50' />
      case 'PDF':
        return <FaFilePdf size={14} className='text-red-500 bg-indigo-50' />
      default:
        return <FaImage size={14} className='text-gray-500 bg-indigo-50' />
    }
  }

  const getFileExtension = fileName => {
    const match = fileName.match(/\.(\w+)$/)
    return match ? match[1].toLowerCase() : ''
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setNewExpense({
      title: '',
      description: '',
      date: '',
      amount: '',
      bill: null
    })
  }

  // fetch expenses
  const fetchExpenses = async () => {
    try {
      const response = await GetExpenses()
      setExpenses(response.data.Expense)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  // add new expense
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await CreateExpense(newExpense)
      toast.success(response.data.message)
      fetchExpenses()
    } catch (error) {
      toast.error(response.data.message)
    } finally {
      // Reset the form
      setIsModalOpen(false)
      setNewExpense({
        title: '',
        description: '',
        date: '',
        amount: '',
        bill: null
      })
    }
  }

  const handleUpdate = async e => {
    e.preventDefault()
    try {
      const data = {
        title: selectedExpense.title,
        description: selectedExpense.description,
        date: selectedExpense.date,
        amount: selectedExpense.amount,
        bill: selectedExpense.bill
      }
      const response = await UpdateExpense(selectedExpense._id, data)
      toast.success(response.data.message)
      fetchExpenses()
    } catch (error) {
      toast.error(response.data.message)
    } finally {
      setEditModalOpen(false)
      setSelectedExpense(null)
    }
  }

  const handleDelete = async id => {
    try {
      setExpenses(expenses.filter(expense => expense._id !== id))
      const response = await DeleteExpense(id)
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setDeleteModalOpen(false)
    }
  }

  return (
    <div className='flex bg-white rounded-md flex-col p-8 overflow-y-auto custom-scrollbar'>
      <div className='flex justify-between items-center mb-6 max-sm:flex-col'>
        <h1 className='text-[20px] font-semibold text-gray-800 max-sm:mb-3'>
          Add Expenses Details
        </h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className='bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white h-[51px] px-4 rounded-[10px] hover:opacity-90 flex items-center gap-2'
        >
          <img src={plus} alt="" /> Add New Expenses details
        </button>
      </div>

      <div className='overflow-x-auto visiter-table custom-scrollbar max-sm:overflow-7-auto'>
        <table className='w-full rounded-lg'>
          <thead>
            <tr className='bg-indigo-50 h-[61px] rounded-lg '>
              <th className='text-left px-6 py-3 text-md font-semibold text-[#202224] rounded-tl-[15px]'>
                Title
              </th>
                <th className='text-left px-6 py-3 text-md font-semibold text-[#202224]'>
                Description
              </th>
              <th className='text-center px-6 py-3 text-md font-semibold text-[#202224]'>
                Date
              </th>
              <th className='text-center px-6 py-3 text-md font-semibold text-[#202224]'>
                Amount
              </th>
              <th className='text-center px-6 py-3 text-md font-semibold text-[#202224]'>
                Bill Format
              </th>
              <th className='text-center px-12 py-4 text-md font-semibold text-[#202224] rounded-tr-[15px]'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map(expense => (
                <tr
                  key={expense._id}
                  className='border-b border-grey-300 text-[#4F4F4F]'
                >
                  <td className='px-6 py-4'>{expense.title}</td>
                  <td className='px-6 py-6 line-clamp-1 max-w-[400px] max-h-[50px]'>
                    {expense.description}
                  </td>
                  <td className='px-6 py-4 text-center'>
                    {new Date(expense.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </td>
                  <td className='px-6 py-6 text-green-600 text-center'>
                    ₹ {expense.amount}
                  </td>
                  <td className='px-6 py-6 flex items-center justify-center'>
                    <FileTypeIcon
                      fileName={getFileExtension(expense.bill)?.toUpperCase()}
                    />
                    <span className='ml-2'>
                      {getFileExtension(expense.bill)?.toUpperCase()}
                    </span>
                  </td>
                  <td className='py-4'>
                    <div className='flex gap-2 justify-center'>
                      <button
                        onClick={() => handleEditClick(expense)} // Open edit modal
                        className='cursor-pointer text-blue-500 hover:text-blue-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]'
                      >
                        <img src={edit} />
                      </button>
                      <button
                        onClick={() => handleViewClick(expense)} // Open view modal
                        className='cursor-pointer text-green-500 hover:text-green-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]'
                      >
                        <img src={eye} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(expense)} // Open delete modal
                        className='cursor-pointer text-red-500 hover:text-red-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]'
                      >
                        <img src={trash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='text-center py-4 text-gray-500'>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]'>
          <div className='bg-white rounded-lg w-[400px]  max-w-md mx-4'>
            <div className='p-6'>
              <h2 className='text-xl font-semibold mb-2'>
                Add Expense Details
              </h2>
              <div className='border-b border-[#F4F4F4] mb-[10px]'></div>
              <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Title Field */}
                <div>
                  <label className='block text-sm text-black-600 mb-1'>
                    Title*
                  </label>
                  <input
                    type='text'
                    placeholder='Enter Title'
                    className='w-full p-2 border border-gray-300 rounded-lg'
                    value={newExpense.title}
                    onChange={e =>
                      setNewExpense({ ...newExpense, title: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Description Field */}
                <div>
                  <label className='block text-sm text-black-600 mb-1'>
                    Description*
                  </label>
                  <textarea
                    placeholder='Enter Description'
                    className='w-full p-2 border border-gray-300 rounded-lg'
                    value={newExpense.description}
                    onChange={e =>
                      setNewExpense({
                        ...newExpense,
                        description: e.target.value
                      })
                    }
                    required
                  />
                </div>

                {/* Date and Amount Fields */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm text-black-600 mb-1'>
                      Date*
                    </label>
                    <input
                      type='date'
                      className='w-full p-2 border border-gray-300 rounded-lg'
                      value={newExpense.date}
                      onChange={e =>
                        setNewExpense({ ...newExpense, date: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm text-black-600 mb-1'>
                      Amount*
                    </label>
                    <div className='relative'>
                      <span className='absolute left-3 top-2.5'>₹</span>
                      <input
                        type='text'
                        placeholder='0000'
                        className='w-full p-2 pl-7 border border-gray-300 rounded-lg'
                        value={newExpense.amount}
                        onChange={e =>
                          setNewExpense({
                            ...newExpense,
                            amount: e.target.value
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className='block text-sm text-wrap text-black-600 mb-1'>
                   
                    Upload Bill*
                  </label>
                  <div
                    className='border-2 text-wrap border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer'
                    onClick={() => document.getElementById('fileInput').click()} // Trigger file input on click
                    onDragOver={e => e.preventDefault()} // Prevent default behavior for drag over
                    onDrop={e => {
                      e.preventDefault()
                      const files = e.dataTransfer.files
                      if (files.length > 0) {
                        setNewExpense({ ...newExpense, bill: files[0] }) // Set the first file
                      }
                    }}
                  >
                    {newExpense.bill ? (
                      <p className='text-gray-600'>{newExpense.bill.name}</p>
                    ) : (
                      <p className='text-black items-center justify-center flex flex-col'>
                        <img src={Addimage} alt="" />
                        Upload a file or drag and drop
                      </p>
                    )}
                    <p className='text-xs text-gray-500'>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input
                    id='fileInput' // Hidden file input
                    type='file'
                    accept='.png, .jpg, .jpeg, .gif, .pdf' // Acceptable file types
                    onChange={e => {
                      if (e.target.files.length > 0) {
                        setNewExpense({
                          ...newExpense,
                          bill: e.target.files[0]
                        }) // Set the selected file
                      }
                    }}
                    className='hidden' // Hide the default file input
                  />
                </div>

                {/* Action Buttons */}
                <div className='flex gap-5 mt-4'>
                  <button
                    type='button'
                    onClick={handleCancel}
                    className='bg-white text-black w-[170px] px-4 py-3 border rounded-[10px]'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    className={`w-[170px] px-4 py-3 bg-grey-200  rounded-[10px] ${
                      isFormValid
                        ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] font-semibold text-white'
                        : 'bg-[#F6F8FB] font-bold text-black-400 cursor-not-allowed'
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

      {isEditModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999]'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-[400px]'>
            <h2 className='text-xl font-semibold mb-4'>Edit Expenses</h2>
            <div className='border-b border-[#F4F4F4] mb-[20px]'></div>
            <form onSubmit={handleUpdate} className='space-y-4'>
              <div>
                <label className='block text-sm text-black-600 mb-1'>
                  Title*
                </label>
                <input
                  type='text'
                  placeholder='Enter Title'
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  value={selectedExpense?.title}
                  onChange={e =>
                    setSelectedExpense({
                      ...selectedExpense,
                      title: e.target.value
                    })
                  }
                />
              </div>

              <div>
                <label className='block text-sm text-black-600 mb-1'>
                  Description*
                </label>
                <textarea
                  placeholder='Enter Description'
                  className='w-full p-2 border border-gray-300 rounded-lg'
                  value={selectedExpense?.description}
                  onChange={e =>
                    setSelectedExpense({
                      ...selectedExpense,
                      description: e.target.value
                    })
                  }
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm text-black-600 mb-1'>
                    Date*
                  </label>
                  <input
                    type='date'
                    className='w-full p-2 border border-gray-300 rounded-lg'
                    defaultValue={
                      selectedExpense?.date
                        ? new Date(selectedExpense.date)
                            .toISOString()
                            .split('T')[0]
                        : ''
                    }
                    onChange={e =>
                      setSelectedExpense({
                        ...selectedExpense,
                        date: e.target.value
                      })
                    }
                  />
                </div>
                <div>
                  <label className='block text-sm text-black-600 mb-1'>
                    Amount*
                  </label>
                  <div className='relative'>
                    <span className='absolute left-3 top-2.5'>₹</span>
                    <input
                      type='text'
                      placeholder='0000'
                      className='w-full p-2 pl-7 border border-gray-300 rounded-lg'
                      value={selectedExpense?.amount.replace('₹ ', '')}
                      onChange={e =>
                        setSelectedExpense({
                          ...selectedExpense,
                          amount: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className='block text-sm text-black-600 mb-1'>
                  Upload Bill*
                </label>
                <div
                  className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer'
                  onClick={() => document.getElementById('fileInput').click()} // Trigger file input on click
                  onDragOver={e => e.preventDefault()} // Prevent default behavior for drag over
                  onDrop={e => {
                    e.preventDefault()
                    const files = e.dataTransfer.files
                    if (files.length > 0) {
                      setSelectedExpense({
                        ...selectedExpense,
                        bill: files[0]
                      }) // Set the first file
                    }
                  }}
                >
                  {selectedExpense.bill.name ? (
                    <p className='text-gray-600'>{selectedExpense.bill.name}</p>
                  ) : (
                    <p className='text-gray-400'>
                      Upload a file or drag and drop
                    </p>
                  )}
                  <p className='text-xs text-gray-500'>
                    PNG, JPG, or up to 10MB
                  </p>
                </div>
                <input
                  id='fileInput' // Hidden file input
                  type='file'
                  accept='.png, .jpg, .jpeg, .gif' // Acceptable file types
                  onChange={e => {
                    if (e.target.files.length > 0) {
                      setSelectedExpense({
                        ...selectedExpense,
                        bill: e.target.files[0]
                      }) // Set the selected file
                    }
                  }}
                  className='hidden' // Hide the default file input
                />
              </div>

              <div className='flex gap-4  ml-2'>
                <button
                  type='button'
                  onClick={() => setEditModalOpen(false)}
                  className='bg-white text-black w-[160px] px-4 py-3 border rounded-md'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='w-[160px] bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white px-4 py-3 rounded-md'
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isViewModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999]'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative'>
            <button
              onClick={() => setViewModalOpen(false)}
              className='absolute top-4 right-4 text-gray-600 hover:text-gray-800'
            >
              <FaTimes size={20} /> {/* Cancel icon */}
            </button>
            <h2 className='text-xl font-semibold mb-4'>View Expense Details</h2>
            <div className='border-b border-[#F4F4F4] mb-[20px]'></div>
            <div className='mb-4'>
              <label className='block text-sm text-grey-800 mb-1'>Title:</label>
              <p className='text-black font-medium'>{selectedExpense?.title}</p>
            </div>
            <div className='mb-4'>
              <label className='block text-sm text-grey-800 mb-1'>
                Description:
              </label>
              <p className='text-black'>{selectedExpense?.description}</p>
            </div>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-sm text-grey-800 mb-1'>
                  Date:
                </label>
                <p className='text-black'>
                  {new Date(selectedExpense.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <label className='block text-sm text-grey-800 mb-1'>
                  Amount:
                </label>
                <p className='text-black font-medium'>
                  ₹ {selectedExpense?.amount}
                </p>
              </div>
            </div>
            <div className='mb-4'>
              <label className='block text-sm text-black-600 mb-1'>Bill:</label>
              {selectedExpense?.bill ? (
                <div className='flex items-center'>
                  <button
                    className='text-blue-500 hover:underline'
                    onClick={() => handleViewFile(selectedExpense.bill)}
                  >
                    View
                  </button>
                </div>
              ) : (
                <p className='text-gray-400'>No bill uploaded</p>
              )}
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999]'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
            <h2 className='text-xl font-semibold mb-4'>Delete Expense?</h2>
            <div className='border-b border-[#F4F4F4] mb-[20px]'></div>
            <p className='text-gray-600'>
              Are you sure you want to delete {selectedExpense?.title}?
            </p>
            <div className='flex justify-center space-x-4 mt-6'>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className='bg-white border w-[170px] text-black px-4 py-2 rounded-md hover:bg-gray-100'
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(selectedExpense._id)}
                className='bg-red-500 w-[170px] text-white px-4 py-2 rounded-md hover:bg-red-600'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Expense
