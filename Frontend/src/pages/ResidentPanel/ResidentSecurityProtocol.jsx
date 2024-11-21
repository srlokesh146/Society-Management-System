import React, { useEffect, useState } from "react";
import { GetProtocols } from "../../services/securityProtocol";
import toast from "react-hot-toast";

function ResidentSecurityProtocol() {
  const [protocols, setProtocols] = useState([]);

  const data = [
    {
      title: "Cameron Williamson",
      description: "A visual representation your spending categories.",
      date: "11/02/2024",
      time: "2:45 PM",
    },
    {
      title: "Darrell Steward",
      description: "Securing critical government systems.",
      date: "12/02/2024",
      time: "3:00 PM",
    },
    {
      title: "Courtney Henry",
      description: "Implementing surveillance in public spaces.",
      date: "13/02/2024",
      time: "4:30 AM",
    },
    {
      title: "Kathryn Murphy",
      description: "Tailor the dashboard to your unique financial.",
      date: "14/02/2024",
      time: "6:45 AM",
    },
    {
      title: "Kathryn Murphy",
      description: "Expenses will become way that makes sense.",
      date: "15/02/2024",
      time: "2:45 PM",
    },
    {
      title: "Arlene McCoy",
      description: "Helping you identify where your money is going.",
      date: "16/02/2024",
      time: "5:45 PM",
    },
    {
      title: "Eleanor Pena",
      description: "Simply navigate through the different sections.",
      date: "17/02/2024",
      time: "4:45 AM",
    },
    {
      title: "Brooklyn Simmons",
      description: "Expenses will become way that makes sense.",
      date: "18/02/2024",
      time: "3:45 PM",
    },
    {
      title: "Wade Warren",
      description: "Implementing surveillance in public spaces.",
      date: "19/02/2024",
      time: "9:45 AM",
    },
    {
      title: "Jane Cooper",
      description: "Expenses will become way that makes sense.",
      date: "20/02/2024",
      time: "3:45 PM",
    },
    {
      title: "Esther Howard",
      description: "A visual representation your spending categories.",
      date: "21/02/2024",
      time: "9:45 PM",
    },
  ];

  // get all security protocols
  const fetchProtocols = async () => {
    try {
      const response = await GetProtocols();
      setProtocols(response.data.Protocol);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchProtocols();
  }, []);

  return (
    <div>
      <div className="bg-white rounded-xl p-6">
        <h1 className="text-2xl font-semibold mb-4">Security Protocols</h1>
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full rounded-lg shadow-sm">
            <thead>
              <tr className="bg-indigo-50 text-left">
                <th className="font-semibold px-4 py-2">Title</th>
                <th className="font-semibold px-4 py-2">Description</th>
                <th className="font-semibold px-4 py-2">Date</th>
                <th className="font-semibold px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {protocols.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white font-normal border-b border-gray-100 px-4 py-4 text-[15px]"
                >
                  <td className="px-4 py-4">{item.title}</td>
                  <td className="px-4 py-4">{item.description}</td>
                  <td className="px-4 py-4">
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px- py-4">
                    <p className="bg-gray-50 p-2 text-center w-20 rounded-full">
                      {item.time}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResidentSecurityProtocol;
