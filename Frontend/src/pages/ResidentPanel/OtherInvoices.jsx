import React, { useEffect, useState } from "react";
import { FaArrowAltCircleDown, FaArrowLeft, FaEye } from "react-icons/fa";
import { GetPaidMaintenances } from "../../services/maintenanceService";
import toast from "react-hot-toast";

const invoices = [
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
    invoiceId: "152563",
    ownerName: "Terry Rhiel Madsen",
    billDate: "10/02/2024",
    paymentDate: "10/02/2024",
    phoneNumber: "9764816457",
    email: "FrancesLHarris@rhyta.com",
    maintenanceAmount: 1500,
    pendingAmount: 2500,
    penalty: 350, // Added penalty for modal
    total: 4000, // Added total for modal
    note: "Please ensure payment is completed before the due date.", // Added note for modal
    address: "123 Main Street, New York, NY", // Added address for modal
  },
  {
    invoiceId: "152563",
    ownerName: "Terry Rhiel Madsen",
    billDate: "10/02/2024",
    paymentDate: "10/02/2024",
    phoneNumber: "9764816457",
    email: "FrancesLHarris@rhyta.com",
    maintenanceAmount: 1500,
    pendingAmount: 2500,
    penalty: 350, // Added penalty for modal
    total: 4000, // Added total for modal
    note: "Please ensure payment is completed before the due date.", // Added note for modal
    address: "123 Main Street, New York, NY", // Added address for modal
  },
  {
    invoiceId: "152563",
    ownerName: "Terry Rhiel Madsen",
    billDate: "10/02/2024",
    paymentDate: "10/02/2024",
    phoneNumber: "9764816457",
    email: "FrancesLHarris@rhyta.com",
    maintenanceAmount: 1500,
    pendingAmount: 2500,
    penalty: 350, // Added penalty for modal
    total: 4000, // Added total for modal
    note: "Please ensure payment is completed before the due date.", // Added note for modal
    address: "123 Main Street, New York, NY", // Added address for modal
  },
  {
    invoiceId: "152563",
    ownerName: "Terry Rhiel Madsen",
    billDate: "10/02/2024",
    paymentDate: "10/02/2024",
    phoneNumber: "9764816457",
    email: "FrancesLHarris@rhyta.com",
    maintenanceAmount: 1500,
    pendingAmount: 2500,
    penalty: 350, // Added penalty for modal
    total: 4000, // Added total for modal
    note: "Please ensure payment is completed before the due date.", // Added note for modal
    address: "123 Main Street, New York, NY", // Added address for modal
  },
  // Add more invoices here
];

function OtherInvoices() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const closeModal = () => {
    setSelectedInvoice(null);
  };

  const fetchNotes = async () => {
    try {
      const response = await GetPaidMaintenances();
      setInvoices(response.data.Maintenance);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg min-h-screen">
      <h1 className="text-xl font-semibold mb-4 p-2">Event Invoices</h1>
      <div className="bg-white shadow-md rounded overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-indigo-50 text-center">
              <th className="px-4 py-3 font-medium text-left">Invoice ID</th>
              <th className="px-4 py-2 font-medium text-left">Owner Name</th>
              <th className="px-4 py-2 font-medium text-left">Bill Date</th>
              <th className="px-4 py-2 font-medium text-left">
                Payment Date
              </th>
              <th className="px-4 py-2 font-medium text-left">
                Phone Number
              </th>
              <th className="px-4 py-2 font-medium">Email</th>
              <th className="px-4 py-2 font-medium text-right">
                Maintenance Amount
              </th>
              <th className="px-4 py-2 font-medium text-right">
                Pending Amount
              </th>
              <th className="px-4 py-2 font-medium text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((v, index) =>
              v.residentList.map((r) => (
                <tr key={index} className="border-b bg-white">
                  <td className="px-6 py-6 text-center">{1232}</td>
                  <td className="px-4 py-2 text-center">
                    {r.resident.Full_name}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {new Date(v.dueDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-2 text-center">11/11/2024</td>
                  <td className="px-4 py-2 text-center">
                    {r.resident.Phone_number}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {r.resident.Email_address}
                  </td>
                  <td className="px-4 py-2 text-green-600 text-center">
                    ₹ {v.maintenanceAmount}
                  </td>
                  <td className="px-4 py-2 text-red-500 text-center">
                    ₹ {v.penaltyAmount}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => openModal({ ...v, ...r })}
                      className="text-[#5678E9] bg-gray-200 p-2 rounded-lg hover:underline"
                    >
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedInvoice && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]'>
          <div className='bg-white w-10/12 sm:w-[28rem] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg'>
            <div className='flex justify-between items-center border-b pb-2 mb-4'>
              <h2 className='font-semibold text-lg'>Event Invoices List</h2>
              <button
                onClick={closeModal}
                className='text-black hover:text-gray-900 font-normal text-[30px]'
              >
                &times;
              </button>
            </div>

            {/* Details Section */}
            <div className='space-y-4'>
              {/* Invoice and Owner Name Section */}
              <div className='p-4 bg-gray-100 rounded-lg'>
                <div className='flex gap-20 p-2 '>
                  <p>
                    <strong className='text-gray-400 font-normal'>
                      Invoice Id:
                    </strong>
                    <p> {selectedInvoice.invoiceId}</p>
                  </p>
                  <p>
                    <strong className='text-gray-400 font-normal'>
                      Owner Name:
                    </strong>
                    <p>{selectedInvoice.ownerName}</p>
                  </p>
                </div>
                <div className='flex gap-20 p-2'>
                  <p>
                    <strong className='text-gray-400 font-normal'>
                      Bill Date:
                    </strong>
                    <p> {selectedInvoice.billDate}</p>
                  </p>
                  <p>
                    <strong className='text-gray-400 font-normal'>
                      Payment Date:
                    </strong>
                    <p>{selectedInvoice.paymentDate}</p>
                  </p>
                </div>
                <div className='flex gap-20 p-1'>
                  <p>
                    <strong className='text-gray-400 font-normal'>
                      Event Date:
                    </strong>
                    <p> {selectedInvoice.eventduedate}</p>
                  </p>
                  <p>
                    <strong className='text-gray-400 font-normal'>
                      Phone Number:
                    </strong>
                    <p> {selectedInvoice.phoneNumber}</p>
                  </p>
                </div>

                <div className='p-2'>
                  <p className='mt-2'>
                    <strong className='text-gray-400 font-normal'>
                      Email:
                    </strong>
                    <p> {selectedInvoice.email}</p>
                  </p>
                  <p className='mt-2'>
                    <strong className='text-gray-400 font-normal'>
                      Event Name
                    </strong>
                    <p>{selectedInvoice.eventname}</p>
                  </p>
                  <p className='mt-2'>
                    <strong className='text-gray-400 font-normal'>
                      Description
                    </strong>
                    <p>{selectedInvoice.description}</p>
                  </p>
                </div>
              </div>

              {/* Financial Details Section */}
              <div className='p-4 bg-gray-100 rounded-lg'>
                <div className='flex justify-between'>
                  <p>
                    <strong className='text-black font-normal'>
                      Maintenance Amount:
                    </strong>
                  </p>
                  <p className='text-green-600'>
                    ₹ {selectedInvoice.maintenanceAmount}
                  </p>
                </div>

                <div className='flex justify-between font-bold mt-2'>
                  <p className='text-black font-normal'>Grand Total:</p>
                  <p className='text-black'>₹ {selectedInvoice.total}</p>
                </div>
              </div>

              {/* Note Section */}
              <div className='p-4 bg-gray-100 rounded-lg'>
                <p>
                  <strong className='text-gray-400 font-normal'>Note</strong>
                  <p>{selectedInvoice.note}</p>
                </p>
              </div>
            </div>

            {/* Download Button */}
            <button className='mt-6 bg-custom-gradient w-full py-3 text-white font-semibold rounded-md flex items-center justify-center gap-2'>
              <FaArrowAltCircleDown size={18} />
              <span>Download Invoice</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OtherInvoices;
