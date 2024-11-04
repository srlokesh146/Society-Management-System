import React from 'react';

const visitors = [
  { name: "Evelyn Harper", phone: "97852 12368", date: "10/01/2024", unit: "A 1001", time: "3:45 PM" },
  { name: "Wade Warren", phone: "97852 25893", date: "11/01/2024", unit: "B 1002", time: "2:45 AM" },
  { name: "Guy Hawkins", phone: "97589 55563", date: "12/01/2024", unit: "C 1003", time: "3:00 PM" },
  { name: "Robert Fox", phone: "97444 56323", date: "13/01/2024", unit: "D 1004", time: "5:30AM" },
  { name: "Jacob Jones", phone: "97121 12583", date: "14/01/2024", unit: "E 2001", time: "12:45 PM" },
  { name: "Ronald Richards", phone: "97259 12363", date: "15/01/2024", unit: "F 2002", time: "3:45 PM" },
  { name: "Annette Black", phone: "97569 77783", date: "16/01/2024", unit: "G 2003", time: "6:00 AM" },
  { name: "Jerome Bell", phone: "97123 25863", date: "17/01/2024", unit: "H 2004", time: "3:45 PM" },
  { name: "Theresa Webb", phone: "97258 36973", date: "18/01/2024", unit: "I 3001", time: "7:00 PM" },
  { name: "Kathryn Murphy", phone: "97577 66663", date: "19/01/2024", unit: "A 3002", time: "6:00 AM" },
  { name: "Eleanor Pena", phone: "97259 69963", date: "20/01/2024", unit: "B 3003", time: "7:00 PM" },
];

const VisitorLogs = () => {
  return (
    <div className="container mx-auto p-4 sm:p-6 bg-gray-100">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-grey-800">Visitor Logs</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-grey-200">
            <thead className="bg-black-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-md font-medium text-black-500  tracking-wider">Visitor Name</th>
                <th className="px-4 sm:px-6 py-3 text-left text-md font-medium text-black-500  tracking-wider hidden sm:table-cell">Phone Number</th>
                <th className="px-4 sm:px-6 py-3 text-left text-md font-medium text-black-500  tracking-wider hidden md:table-cell">Date</th>
                <th className="px-4 sm:px-6 py-3 text-left text-md font-medium text-black-500  tracking-wider">Unit Number</th>
                <th className="px-4 sm:px-6 py-3 text-left text-md font-medium text-black-500    tracking-wider hidden lg:table-cell">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visitors.map((visitor, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                        <img className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" src={`https://i.pravatar.cc/40?img=${index}`} alt="" />
                      </div>
                      <div className="ml-3 sm:ml-4">
                        <div className="text-sm font-medium text-black-900">{visitor.name}</div>
                        <div className="text-xs text-black-500 sm:hidden">{visitor.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-black-500 hidden sm:table-cell">{visitor.phone}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-black-500 hidden md:table-cell">{visitor.date}</td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {visitor.unit}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-black-500 hidden lg:table-cell">{visitor.time}</td>
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
