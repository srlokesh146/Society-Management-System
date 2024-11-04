import React from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { complaintsData } from "../constantdata";
import avatar from '../assets/images/avatar.png';

const getPriorityBackgroundColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-600';
    case 'Medium':
      return 'bg-blue-600';
    case 'Low':
      return 'bg-green-600';
    default:
      return '';
  }
};

const DashboardTable = () => {
  return (
    <div className="bg-white p-[20px] rounded-[15px] col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[20px] font-semibold mb-[27px] leading-4">Complaint List</h2>
        </div>
        <div className="mb-[27px]">
          <select
            id="month-select"
            className="border border-gray-300 rounded-lg px-2 py-1 text-gray-700 flex items-center outline-none"
          >
            <option value="" disabled defaultValue>Month</option>
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-year">Last Year</option>
          </select>
        </div>
      </div>
      <div className="max-h-64 overflow-y-auto pr-[8px] custom-scrollbar">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-black bg-opacity-custom rounded-tl-[15px] rounded-tr-[15px] bg-gray-100">
              <th className="px-4 py-[20px] text-[14px] font-semibold rounded-tl-[15px]">Complainer Name</th>
              <th className="px-4 py-[20px] text-[14px] font-semibold">Complaint Name</th>
              <th className="px-4 py-[20px] text-[14px] font-semibold">Date</th>
              <th className="px-4 py-[20px] text-[14px] font-semibold">Priority</th>
              <th className="px-4 py-[20px] text-[14px] font-semibold">Complain Status</th>
              <th className="px-4 py-[20px] text-[14px] font-semibold rounded-tr-[15px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {complaintsData.map((complaint) => (
              <tr key={complaint.id} className="border-b border-[#F4F4F4]">
                <td className="px-[20px] py-[16px] flex items-center">
                  <img
                    src={avatar}
                    alt="Profile"
                    className="rounded-full mr-2 w-[40px] h-[40px] flex items-center"
                  />
                  <span className="truncate">{complaint.complainerName}</span>
                </td>
                <td className="px-[20px] py-[14px]">{complaint.complaintName}</td>
                <td className="px-[20px] py-[16px]">{complaint.date}</td>
                <td className={`rounded-full text-center text-white h-[30px] w-[80px] flex justify-around items-center text-[14px] my-[30px] ${getPriorityBackgroundColor(complaint.priority)}`}>
                  {complaint.priority}
                </td>
                <td className="px-[20px] py-[16px]">{complaint.status}</td>
                <td className="flex space-x-6 px-[20px] py-[16px]">
                  <FaEdit
                    className="cursor-pointer text-blue-500"
                    onClick={() => onEdit(complaint)}
                    title="Edit"
                  />
                  <FaEye
                    className="cursor-pointer text-green-500 bg-gray-50 "
                    onClick={() => onView(complaint)}
                    title="View"
                  />
                  <FaTrashAlt
                    className="cursor-pointer text-red-500"
                    onClick={() => onDelete(complaint.id)}
                    title="Delete"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;
