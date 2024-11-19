import React, { useEffect, useState } from "react";
import { visitors } from "../../constantdata";
import VisitorTrackingModal from "../../components/modal/VisitorTrackingModal";
import {
  createVisitor,
  GetVisitors,
} from "../../services/securityGuardService";
import toast from "react-hot-toast";

export default function VisitorTracking() {
  const [visitorList, setVisitorList] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const convertToAmPm = (timeStr) => {
    const [hours, minutes] = timeStr.split(":");
    let hour = parseInt(hours, 10);
    const minute = minutes || "00";

    if (isNaN(hour) || isNaN(minute)) {
      return "Invalid time format";
    }

    const suffix = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert hour to 12-hour format
    return `${hour}:${minute} ${suffix}`;
  };

  const addVisitor = async (data) => {
    try {
      const response = await createVisitor(data);
      fetchVisitors();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchVisitors = async () => {
    try {
      const response = await GetVisitors();
      setVisitorList(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <>
      <div className="p-4 bg-white rounded-lg overflow-auto max-w-full">
        <div className="flex  justify-between">
          <h1 className="text-lg font-semibold pb-[31px] pt-[15px] text-gray-800">
            Visitor Tracking
          </h1>
          <div className="flex items-center mb-[20px]">
            <div className="mr-[20px]">
              <select
                id="month-select"
                className="text-[15px] border border-gray-300 px-3 py-1 text-gray-700 flex items-center outline-none w-[116px] h-[50px] rounded-[10px]"
              >
                <option value="" disabled defaultValue>
                  Month
                </option>
                <option
                  value="last-week"
                  className="text-[15px] max-sm:text-[15px] bg-custom-gradient"
                >
                  Week
                </option>
                <option
                  value="last-month"
                  className="text-[15px] max-sm:text-[15px]"
                >
                  Last Month
                </option>
                <option
                  value="last-year"
                  className="text-[15px] max-sm:text-[15px]"
                >
                  Last Year
                </option>
              </select>
            </div>
            <button
              onClick={openModal}
              className="modal bg-custom-gradient py-[12px] px-[10px] rounded-[10px] text-white font-semibold w-[229px] text-[18px]"
            >
              <span className="mr-[1.5px]"> + </span> Add Visiter details
            </button>
          </div>
        </div>

        <div className="overflow-x-auto pr-[8px] ps-[20px] custom-scrollbar max-h-[44rem]">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-indigo-50">
              <tr className="rounded-tl-[15px] rounded-tr-[15px] h-[61px]">
                <th className="px-4 sm:px-6 py-4 text-left text-md font-semibold text-black-500 tracking-wider rounded-tl-[15px]">
                  Visitor Name
                </th>
                <th className="px-4 sm:px-6 py-4 text-start text-md font-semibold text-black-500 tracking-wider">
                  Phone Number
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-md font-semibold text-black-500 tracking-wider">
                  Date
                </th>
                <th className="px-4 sm:px-6 py-4 text-center text-md font-semibold text-black-500 tracking-wider">
                  Unit Number
                </th>
                <th className="px-4 sm:px-10 py-4 text-right text-md font-semibold text-black-500 tracking-wider rounded-tr-[15px]">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {visitorList.map((visitor, index) => {
                console.log();
                
                return (
                  <tr key={index} className="h-[68px]">
                    <div className="px-4 sm:px-6 py-4 flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={`https://i.pravatar.cc/150?img=${index}`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-[16px] font-medium text-[#4F4F4F]">
                          {visitor.name}
                        </div>
                      </div>
                    </div>
                    <td className="px-4 py-2 text-[#4F4F4F]">{visitor.number}</td>
                    <td className="px-4 py-2 text-[#4F4F4F]">
                      {new Date(visitor.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <span className="h-[28px] w-[28px] flex items-center justify-center rounded-full bg-[#5678E91A] text-[#5678E9] text-xs font-medium mr-2">
                          {visitor.wing}
                        </span>
                        <span className="text-[16px] font-medium text-[#4F4F4F]">
                          {visitor.unit}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex align-top justify-end max-sm:min-w-[180px] max-md:min-w-[180px]">
                        <span className="text-[#4F4F4F] bg-[#F6F8FB] w-[92px] h-[34px] inline-flex items-center justify-center rounded-[70px]">
                          {convertToAmPm(visitor.time)}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <VisitorTrackingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={addVisitor}
      />
    </>
  );
}
