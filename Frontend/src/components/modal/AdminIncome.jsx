import React from 'react';
import ownerImage from "../../assets/images/owner.png";
import {FaUser } from "react-icons/fa";
import moneys from "../../assets/images/moneys.svg";
import wallet from "../../assets/images/wallet.png";
const participants = [
  {wing:"A", unit: '1001', date: '10/07/2024', status: 'Owner', phone: '92524 12365', amount: '₹1000', payment: 'Cash' },
  {wing:"B", unit: '1002', date: '11/07/2024', status: 'Tenant', phone: '92458 12865', amount: '₹1000', payment: 'Online' },
  {wing:"A", unit: '1003', date: '12/07/2024', status: 'Owner', phone: '92434 2365', amount: '₹1000', payment: 'Cash' },
  {wing:"A", unit: '1004', date: '13/07/2024', status: 'Tenant', phone: '92536 12448', amount: '₹1000', payment: 'Online' },
  {wing:"A", unit: '2001', date: '14/07/2024', status: 'Owner', phone: '92328 23065', amount: '₹1000', payment: 'Cash' },
  {wing:"D", unit: '2002', date: '15/07/2024', status: 'Tenant', phone: '92524 12365', amount: '₹1000', payment: 'Online' },
  {wing:"A", unit: '2003', date: '16/07/2024', status: 'Owner', phone: '92484 12025', amount: '₹1000', payment: 'Cash' },
  {wing:"E", unit: '2004', date: '17/07/2024', status: 'Tenant', phone: '92101 12425', amount: '₹1000', payment: 'Online' },
  {wing:"A", unit: '3001', date: '18/07/2024', status: 'Owner', phone: '92728 14235', amount: '₹1000', payment: 'Online' },
  {wing:"A", unit: '3002', date: '19/07/2024', status: 'Tenant', phone: '92830 12329', amount: '₹1000', payment: 'Cash' },
  {wing:"U", unit: '3003', date: '20/07/2024', status: 'Owner', phone: '92208 12389', amount: '₹1000', payment: 'Online' },
];

const AdminIncome = () => {
  return (
    <div className="p-6 bg-white rounded-xl">
      <h1 className="text-2xl font-normal mb-4">Ganesh Chaturthi Participator Member List</h1>
      <table className="min-w-full table-auto  bg-white shadow-sm rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-50  text-black ">
            <th className="px-6 py-3 font-medium text-left">Unit Number</th>
            <th className="px-6 py-3 font-medium text-left">Payment Date</th>
            <th className="px-6 py-3 font-medium text-left">Tenant/Owner Status</th>
            <th className="px-6 py-3 font-medium text-left">Phone Number</th>
            <th className="px-4 py-3 font-medium text-left">Amount</th>
            <th className="px-4 py-3 font-medium text-right">Payment</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr
              key={index}
              className={"text-gray-600 border-b " }
            >
             <div className="px-4 py-2  flex  items-center text-[#4F4F4F]">
                      <span className="mr-2 w-[28px] h-[28px] bg-gray-200 rounded-full flex items-center justify-center text-[#5678E9] text-[14px] font-semibold">
                        {participant.wing}
                      </span>
                      {participant.unit}
                    </div>
              <td className="px-6 py-4">{participant.date}</td>
              <td className="px-6 py-4">
              <span
                      className={`px-3 py-1 rounded-full inline-flex items-center gap-1.5 w-[113px] h-[31px] justify-center text-[14px] ${
                        participant.status === "Tenant"
                          ? "bg-pink-50 text-pink-500"
                          : "bg-purple-50 text-purple-500"
                      }`}
                    >
                      {participant.status === "Tenant" ? (
                        <FaUser size={12} />
                      ) : (
                        <img
                          src={ownerImage}
                          className="mr-[4px]"
                          alt="Owner Icon"
                        />
                      )}
                      {participant.status}
                    </span>
              </td>
              <td className="px-6 py-4">{participant.phone}</td>
              <td className="px-6 py-4 text-green-600">{participant.amount}</td>
              <td className=" py-4 text-right">
              <span
                        className={`inline-flex items-center justify-center  w-[113px] h-[31px] text-[14px] ${
                            participant.payment === "Online"
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-600 bg-gray-50"
                        } px-2 py-1 rounded-full`}
                      >
                        {participant.payment === "Online" ? (
                          <img src={wallet} className="pr-[2.5px]" />
                        ) : (
                          <img src={moneys} className="pr-[2.5px]" />
                        )}
                        {participant.payment}
                      </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminIncome;
