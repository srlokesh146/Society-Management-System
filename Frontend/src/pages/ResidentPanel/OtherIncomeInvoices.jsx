import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleDown } from 'react-icons/fa'
import PayMentMathodModal from '../../components/modal/PayMentMathodModal'
import PayMenCard from '../../components/modal/PayMenCard'
import { GetEventsForUser, paymemtEvent } from '../../services/incomeService'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const data = [
  {
    id: 1,
    title: 'Due Event Payment',
    eventname: 'Navratri',
    eventduedate: '11/01/2024',
    amount: '1000.00',
    invoiceId: '152563',
    ownerName: 'Terry Rhiel Madsen',
    billDate: '10/02/2024',
    paymentDate: '10/02/2024',
    phoneNumber: '9764816457',
    email: 'FrancesLHarris@rhyta.com',
    maintenanceAmount: 1500,
    pendingAmount: 2500,
    penalty: 350, // Added penalty for modal
    total: 4000, // Added total for modal
    note: 'Please ensure payment is completed before the due date.', // Added note for modal
    address: '123 Main Street, New York, NY',
    description:
      'Navratri is a major Hindu festival celebrated for nine nights, honoring Goddess Durga.'
  },
  {
    id: 2,
    title: 'Due Event Payment',
    eventname: 'Navratri',
    eventduedate: '11/01/2024',
    amount: '1000.00'
  },
  {
    id: 3,
    title: 'Due Event Payment',
    eventname: 'Navratri',
    eventduedate: '11/01/2024',
    amount: '1000.00'
  },
  {
    id: 4,
    title: 'Due Event Payment',
    eventname: 'Navratri',
    eventduedate: '11/01/2024',
    amount: '1000.00'
  }
]

function OtherIncomeInvoices () {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null)
  const [isPaymentNowOpen, setIsPaymantNowOpen] = useState(false)
  const [isPaymenCardOpen, setisPaymenCardOpen] = useState(false)
  const [payEvent, setPayEvent] = useState(null)
  const [events, setEvents] = useState([])

  const openModal = invoice => {
    setSelectedInvoice(invoice)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedInvoice(null)
  }
  const handlePedingEvents = event => {
    setPayEvent(event)
    setIsPaymantNowOpen(true)
  }

  const handlePayment = async paymentMode => {
    try {
      const response = await paymemtEvent(payEvent._id, {
        paymentMode: paymentMode
      })
      toast.success(response.data.message)
      setEvents(prev => prev.filter(entry => entry._id !== payEvent._id))
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setPayEvent(null)
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await GetEventsForUser()
      setEvents(response.data.Income)
    } catch (error) {
      //   toast.error(error.response.data.message);
    }
  }
  const navigate = useNavigate()
  const handleViewInvoice = () => {
    navigate('/otherinvoices')
  }
  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div>
      <div className='bg-white p-6 mt-6 rounded-lg shadow-sm'>
        <div className='flex flex-col  sm:flex-row items-center justify-between'>
          <h1 className='font-semibold text-[20px]'>Due Event Payment</h1>
          <button
            className='border p-3 mt-4 sm:mt-0 bg-custom-gradient rounded-lg text-white font-medium'
            onClick={handleViewInvoice}
          >
            View Invoice
          </button>
        </div>
        <div className='grid grid-cols-1 mt-4 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {events.length > 0 ? (
            events.map(event => (
              <div
                key={event._id}
                className='border border-grey-800 rounded-lg '
              >
                <div className='bg-[#5678E9] text-white p-4 flex justify-between items-center rounded-t-lg'>
                  <h2 className='text-sm sm:text-base font-semibold'>
                    Due Event Payment
                  </h2>
                  <h2 className='text-sm bg-[#FFFFFF1A] w-28 text-center rounded-2xl p-1 font-semibold'>
                    {event.members[0].paymentStatus}
                  </h2>
                </div>
                <div className='p-4'>
                  <div className='space-y-2'>
                    <div className='flex justify-between items-center text-sm sm:text-base text-gray-600'>
                      <span className='font-sm'>Event Name</span>
                      <p className='text-gray-400'>{event.title}</p>
                    </div>
                    <div className='flex justify-between items-center text-sm sm:text-base text-gray-600'>
                      <span className='font-sm'>Event Due Date</span>
                      <p className='text-gray-400 text-[15px]'>
                        {new Date(event.dueDate).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className='flex justify-between items-center text-sm sm:text-base text-gray-600'>
                      <span className='font-sm'>Amount</span>
                      <p className='text-red-500'>{event.amount}.00</p>
                    </div>
                    <button
                      onClick={() => handlePedingEvents(event)}
                      className='h-14 bg-custom-gradient text-white font-bold rounded-xl w-full border'
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <tr>
              <td className='text-center py-4 text-gray-500'>
                No data found
              </td>
            </tr>
          )}
        </div>
      </div>

    
      <PayMentMathodModal
        isOpen={isPaymentNowOpen}
        onClose={() => {
          setIsPaymantNowOpen(false)
        }}
        setisPaymenCardOpen={() => setisPaymenCardOpen(true)}
        handlePayment={handlePayment}
      />
      <PayMenCard
        isOpen={isPaymenCardOpen}
        onClose={() => {
          setisPaymenCardOpen(false)
        }}
        handlePayment={handlePayment}
      />
    </div>
  )
}

export default OtherIncomeInvoices
