import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { GetVisitors } from "../services/securityGuardService";

const visitors = [
  {
    name: "Evelyn Harper",
    phone: "97852 12368",
    date: "10/01/2024",
    unit: "A 1001",
    time: "3:45 PM",
  },
  {
    name: "Wade Warren",
    phone: "97852 25893",
    date: "11/01/2024",
    unit: "B 1002",
    time: "2:45 AM",
  },
  {
    name: "Guy Hawkins",
    phone: "97589 55563",
    date: "12/01/2024",
    unit: "C 1003",
    time: "3:00 PM",
  },
  {
    name: "Robert Fox",
    phone: "97444 56323",
    date: "13/01/2024",
    unit: "D 1004",
    time: "5:30AM",
  },
  {
    name: "Jacob Jones",
    phone: "97121 12583",
    date: "14/01/2024",
    unit: "E 2001",
    time: "12:45 PM",
  },
  {
    name: "Ronald Richards",
    phone: "97259 12363",
    date: "15/01/2024",
    unit: "F 2002",
    time: "3:45 PM",
  },
  {
    name: "Annette Black",
    phone: "97569 77783",
    date: "16/01/2024",
    unit: "G 2003",
    time: "6:00 AM",
  },
  {
    name: "Jerome Bell",
    phone: "97123 25863",
    date: "17/01/2024",
    unit: "H 2004",
    time: "3:45 PM",
  },
  {
    name: "Theresa Webb",
    phone: "97258 36973",
    date: "18/01/2024",
    unit: "I 3001",
    time: "7:00 PM",
  },
  {
    name: "Kathryn Murphy",
    phone: "97577 66663",
    date: "19/01/2024",
    unit: "A 3002",
    time: "6:00 AM",
  },
  {
    name: "Eleanor Pena",
    phone: "97259 69963",
    date: "20/01/2024",
    unit: "B 3003",
    time: "7:00 PM",
  },
];

const VisitorLogs = () => {
  const [visitorLog, setVisitorLog] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await GetVisitors();
      console.log(response.data.data);
      setVisitorLog(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div
      className="p-4 sm:p-6 bg-white rounded-lg overflow-auto max-w-full  
    3xl:max-w-[2240px] visiter-table"
    >
      <h1 className="text-[20px] font-semibold mb-6 text-gray-800 max-xl:mb-0 max-sm:mb-[15px]">
        Visitor Logs
      </h1>
      <div className="bg-white rounded-lg shadow-sm overflow-x-auto custom-scrollbar">
        <div className="max-h-[50rem] ps-0 pr-[8px]">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-md font-bold text-black-500 tracking-wider">
                  Visitor Name
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-md font-bold text-black-500 tracking-wider">
                  Phone Number
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-md font-bold text-black-500 tracking-wider">
                  Date
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-md font-bold text-black-500 tracking-wider">
                  Unit Number
                </th>
                <th className="px-4 sm:px-10 py-4 text-left text-md font-bold text-black-500 tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {visitorLog.map((visitor, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={`https://i.pravatar.cc/150?img=${index}`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {visitor.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-500">
                      {visitor.number}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-500">
                      {new Date(visitor.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="h-5 w-5 flex items-center justify-center rounded-full bg-[#5678E91A] text-[#5678E9] text-xs font-medium mr-2">
                        {visitor.wing}
                      </span>
                      <span className="text-sm font-bold text-gray-500">
                        {visitor.unit}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="inline-flex px-3 py-1 font-bold text-sm text-gray-500 bg-[#F6F8FB] rounded-md">
                      {visitor.time}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VisitorLogs;
