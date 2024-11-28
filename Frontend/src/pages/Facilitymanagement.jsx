import React, { useEffect, useState } from 'react'
import { FaEdit, FaEllipsisV, FaTimes } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import {
  CreateFacility,
  GetFacilities,
  UpdateFacility
} from '../services/facilityService'

function FacilityManagement () {
  const [facilities, setFacilities] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [currentFacility, setCurrentFacility] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const [isFormFilled, setIsFormFilled] = useState(false)

  const checkFormFilled = facility => {
    return (
      facility?.name?.trim() !== '' &&
      facility?.description?.trim() !== '' &&
      facility?.date?.trim() !== '' &&
      facility?.remindDays?.toString()?.trim() !== ''
    )
  }

  const handleFacilityChange = (field, value) => {
    const updatedFacility = {
      ...currentFacility,
      [field]: value
    }
    setCurrentFacility(updatedFacility)
    setIsFormFilled(checkFormFilled(updatedFacility))
  }

  const handleCreateFacility = () => {
    setModalType('create')
    setCurrentFacility({
      name: '',
      description: '',
      date: '',
      remind: ''
    })
    setIsModalOpen(true)
    setIsFormFilled(false)
  }

  const handleEditFacility = facility => {
    setModalType('edit')
    setCurrentFacility({ ...facility })
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setCurrentFacility(null)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (modalType === 'create') {
      try {
        const response = await CreateFacility(currentFacility)
        fetchFacilities()
        toast.success(response.data.message)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    } else if (modalType === 'edit') {
      const updateData = {
        name: currentFacility.name,
        description: currentFacility.description,
        date: currentFacility.date,
        remind: currentFacility.remind
      }
      try {
        const response = await UpdateFacility(currentFacility._id, updateData)
        fetchFacilities()
        toast.success(response.data.message)
      } catch (error) {
        toast.error(error.response.data.message)
      } finally {
        setDropdownOpen(false)
      }
    }
    handleCloseModal()
  }

  const toggleDropdown = id => {
    setDropdownOpen(dropdownOpen === id ? null : id)
  }

  const renderDropdownMenu = facility => (
    <div className='absolute right-0 mt-2 w-20 bg-white rounded-md shadow-lg z-10 hover:bg-gray-50'>
      <button
        onClick={() => handleEditFacility(facility)}
        className='font-semibold h-[41px] w-[100px] ps-[10px] text-left text-sm text-black  flex items-center gap-2'
      >
        Edit
      </button>
    </div>
  )

  const renderModalForm = () => (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Facility Name
        </label>
        <input
          name='name'
          type='text'
          value={currentFacility?.name || ''}
          onChange={e => handleFacilityChange('name', e.target.value)}
          className='w-full p-3 border border-gray-200 rounded-lg'
          placeholder='Enter facility title'
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700 mb-1'>
          Description
        </label>
        <textarea
          name='description'
          value={currentFacility?.description || ''}
          onChange={e => handleFacilityChange('description', e.target.value)}
          className='w-full p-3 border border-gray-200 rounded-lg h-24'
          placeholder='Enter description'
        />
      </div>

      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Sechudule Service Date
          </label>
          <input
            name='date'
            type='date'
            defaultValue={
              currentFacility?.date
                ? new Date(currentFacility.date).toISOString().split('T')[0]
                : ''
            }
            onChange={e => handleFacilityChange('date', e.target.value)}
            className='w-full p-3 border border-gray-200 rounded-lg'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Remind before
          </label>
          <input
            name='remind'
            type='number'
            value={currentFacility?.remind || ''}
            onChange={e => handleFacilityChange('remind', e.target.value)}
            className='w-full p-3 border border-gray-200 rounded-lg'
            placeholder='Enter days'
            min='1'
          />
        </div>
      </div>

      {/* Buttons */}
      <div className='grid grid-cols-2 gap-4 mt-6'>
        <button
          type='button'
          onClick={handleCloseModal}
          className='w-full h-[51px]  text-gray-700 bg-white border border-gray-200 rounded-lg text-sm font-medium'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={!isFormFilled}
          className={`w-full h-[51px] text-sm font-medium rounded-lg transition-all duration-300
            ${
              isFormFilled
                ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90'
                : 'bg-[#F6F8FB] text-black-400 cursor-not-allowed'
            }`}
        >
          {modalType === 'save' ? 'save' : 'Save'}
        </button>
      </div>
    </form>
  )

  const fetchFacilities = async () => {
    try {
      const response = await GetFacilities()
      setFacilities(response.data.data)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchFacilities()
  }, [])

  return (
    <div className='container mx-auto p-4 sm:p-6 bg-white rounded-lg '>
      <div className='flex justify-between  items-center mb-6 max-sm:flex-col'>
        <h1 className='text-[20px] font-semibold text-gray-800 max-xl:mb-0 max-sm:mb-[15px]'>
          Facility Management
        </h1>
        <button
          onClick={handleCreateFacility}
          className='px-4 py-3 bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white rounded-lg hover:opacity-90 flex items-center gap-2'
        >
          Create Facility
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-4'>
        {facilities.length > 0 ? (
          facilities.map(facility => (
            <div
              key={facility._id}
              className='bg-white rounded-lg shadow-sm   border border-grey-800 hover:shadow-sm transition-shadow'
            >
              <div className='bg-[#5678E9] text-white p-4 rounded-t-lg flex justify-between items-center'>
                <h3 className='font-medium'>{facility.name}</h3>
                <div className='relative'>
                  <button
                    onClick={() => toggleDropdown(facility._id)}
                    className='hover:opacity-80  text-blue-500 rounded-md p-1 bg-white h-5 w-5'
                  >
                    <FaEllipsisV size={12} />
                  </button>
                  {dropdownOpen === facility._id &&
                    renderDropdownMenu(facility)}
                </div>
              </div>

              <div className='p-4'>
                <div className='space-y-3'>
                  <div className='flex items-center text-sm justify-between'>
                    <span className='text-gray-500 '>
                      Upcoming Schedule Service Date
                    </span>
                    <span className='text-black font-semibold'>
                      {new Date(facility.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className='space-y-2'>
                    <p className='text-gray-500 text-sm'>Description</p>
                    <p className='text-sm text-black line-clamp-2'>
                      {facility.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <tr>
            <td colSpan='6' className='text-center py-4'>
              No data found.
            </td>
          </tr>
        )}
      </div>

      {/* Create/Edit Modal - Updated for better responsiveness */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-2 sm:p-4'>
          <div className='bg-white rounded-xl w-[95%] sm:w-[85%] md:w-[65%] lg:w-[50%] max-w-md max-h-[90vh] sm:max-h-[85vh] overflow-y-auto my-2 sm:my-8 mx-auto relative'>
            <div className='p-3 sm:p-6 '>
              {/* Header */}
              <div className='flex justify-between items-center mb-3 sm:mb-4 sticky top-0 bg-white pt-1'>
                <h2 className='text-base sm:text-xl font-semibold text-gray-800'>
                  {modalType === 'create' ? 'Create Facility' : 'Edit Facility'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className='text-gray-400 hover:text-gray-600 p-1'
                >
                  <FaTimes size={18} />
                </button>
              </div>

              {/* Form with updated spacing */}
              <form onSubmit={handleSubmit} className='space-y-3 sm:space-y-4'>
                <div className='border-b border-[#F4F4F4] mb-[10px]'></div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Facility Name
                  </label>
                  <input
                    name='name'
                    type='text'
                    value={currentFacility?.name || ''}
                    onChange={e => handleFacilityChange('name', e.target.value)}
                    className='w-full p-2 sm:p-3 border border-gray-200 rounded-lg text-sm'
                    placeholder='Enter facility title'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Description
                  </label>
                  <textarea
                    name='description'
                    value={currentFacility?.description || ''}
                    onChange={e =>
                      handleFacilityChange('description', e.target.value)
                    }
                    className='w-full p-2 sm:p-3 border border-gray-200 rounded-lg h-16 sm:h-24 text-sm'
                    placeholder='Enter description'
                  />
                </div>

                <div className='space-y-3 sm:space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Schedule Service Date
                    </label>
                    <input
                      name='date'
                      type='date'
                      defaultValue={
                        currentFacility?.date
                          ? new Date(currentFacility.date)
                              .toISOString()
                              .split('T')[0]
                          : ''
                      }
                      onChange={e =>
                        handleFacilityChange('date', e.target.value)
                      }
                      className='w-full p-2 sm:p-3 border border-gray-200 rounded-lg text-sm'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Remind before
                    </label>
                    <input
                      name='remind'
                      type='number'
                      value={currentFacility?.remind || ''}
                      onChange={e =>
                        handleFacilityChange('remind', e.target.value)
                      }
                      className='w-full p-2 sm:p-3 border border-gray-200 rounded-lg text-sm'
                      placeholder='Enter days'
                      min='1'
                    />
                  </div>
                </div>

                {/* Buttons with better mobile spacing */}
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6'>
                  <button
                    type='button'
                    onClick={handleCloseModal}
                    className='w-full py-2 sm:py-3 text-gray-700 bg-white border border-gray-200 rounded-[10px] text-sm font-medium'
                  >
                    Cancel
                  </button>
                  <button
                    type='submit'
                    disabled={!isFormFilled}
                    className={`w-full py-2 sm:py-3 text-sm font-medium rounded-[10px] transition-all duration-300
                      ${
                        isFormFilled
                          ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90'
                          : 'bg-[#F6F8FB] text-black-400 cursor-not-allowed'
                      }`}
                  >
                    {modalType === 'save' ? 'Save' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FacilityManagement
