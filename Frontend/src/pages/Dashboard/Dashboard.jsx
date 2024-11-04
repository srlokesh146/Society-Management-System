import React, { useState } from "react";
import { importantNumbers, pendingMaintenances, totalBalanceData, complaintsData, activities } from "../../constantdata";
// import BalanceChart from "../../components/BalanceChart";
import Navbar from "../../components/Navbar";
import Modal from "../../components/modal/Modal";
import DashboardTable from "../../components/DashboardTable";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import rogerimage from "../../assets/images/rogerimage.png"
import icon1 from "../../assets/images/icon-1.png"
import moneyrecive from "../../assets/images/money-recive.png"
import moneysend from "../../assets/images/money-send.png"
import building4 from "../../assets/images/building-4.png"

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  // const [importantNumber, setImportantNumbers] = useState()

  const handleOpenModal = () => {
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (complaint) => {
    setSelectedContact(complaint);
    setIsModalOpen(true);
  };

  // const handleDeleteContact = (contact) => {
  //   const updatedContacts = contact.filter((_, i) => i !== index);
  //   setImportantNumbers(updatedContacts);
  // };

  const getStyle = (label) => {
    switch (label) {
      case "Total Balance":
        return {
          borderColor: "#FF6A00",
          borderImageSource: "linear-gradient(255.6deg, #FF6A00 7.71%, rgba(255, 255, 255, 0) 18.54%)",
          borderImageSlice: 1,
          borderRadius: "15px",
        };
      case "Total Income":
        return {
          borderColor: "#2A6B28",
          borderImageSource: "linear-gradient(255.6deg, #39973D 7.71%, rgba(255, 255, 255, 0) 18.54%)",
          borderImageSlice: 1,
          borderRadius: "15px",
        };
      case "Total Expense":
        return {
          borderColor: "#869FF3",
          borderImageSource: "linear-gradient(255.6deg, #869FF3 7.71%, rgba(255, 255, 255, 0) 18.54%)",
          borderImageSlice: 1,
          borderRadius: "15px",
        };
      case "Total Units":
        return {
          borderColor: "#EB37C3",
          borderImageSource: "linear-gradient(255.6deg, #EB37C3 7.71%, rgba(255, 255, 255, 0) 18.54%)",
          borderImageSlice: 1,
          borderRadius: "15px",
        };
      default:
        return {
          borderColor: "#D3D3D3",
          borderImageSource: "linear-gradient(255.6deg, #FF6A00 7.71%, rgba(255, 255, 255, 0) 18.54%)",
          borderImageSlice: 1,
          borderRadius: "15px",
        };
    }
  };





  // const getStyleActivities = (index) => {
  //   switch (index) {
  //     case 0:
  //       return "text-red-500 bg-[#EC9542] font-semibold w-[40px] h-[40px]";
  //     case 1:
  //       return "text-green-500 bg-[#000] w-[40px] h-[40px]";
  //     case 2:
  //       return "text-blue-500 bg-[#EC9542] w-[40px] h-[40px]";
  //     case 3:
  //       return "text-blue-500 bg-[#EC9542] w-[40px] h-[40px]";
  //     case 4:
  //       return "text-blue-500 bg-[#EC9542] w-[40px] h-[40px]";
  //     default:
  //       return "text-black bg-gray-200 w-[40px] h-[40px]";
  //   }
  // };

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 overflow-y-auto">
        {/* <Navbar /> */}
        <div className="p-[30px]">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex items-center justify-center relative w-full rounded-[15px]">
              <div
                style={{
                  borderRight: "1px solid transparent",
                  borderTop: "2px solid transparent",
                  borderRadius: "8px",
                }}
                className="relative flex flex-col justify-start items-start w-full"
              >
                <div
                  className="w-[7px] h-[52px] mr-[10px] absolute z-[99] top-[50%] rounded-tr-[10px] rounded-br-[10px]"
                  style={{
                    backgroundColor: 'rgba(255, 106, 0, 0.5)',
                    transform: 'translateY(-50%)',
                  }}
                />
                <div className="relative flex flex-col justify-between items-start py-[19px] px-[30px] rounded-[15px] flex-grow bg-white w-full rounded-br-[10px]"
                  style={{
                    border: '2px solid transparent',
                    borderImageSource: 'linear-gradient(255.6deg, #FF6A00 7.71%, rgba(255, 255, 255, 0) 18.54%)',
                    borderImageSlice: 1,
                  }}>
                  <div className="flex justify-between items-center w-full mb-2">
                    <div className="flex flex-col items-start">
                      <h6 className="text-gray-700 font-semibold text-[16px] leading-2">Total Balance</h6>
                      <h3 className="text-gray-900 font-bold text-[26px]">2,22,520</h3>
                    </div>
                    <div className="flex">
                      <div className="bg-[#FF6A00] rounded-[10px] p-2 opacity-[10%] w-[50px] h-[50px] absolute top-50 right-50 translate-x-[-19%] translate-y-[-18%]"></div>
                      <div className="relative">
                        <img src={icon1} alt="Total Balance icon" className="w-[32px] h-[32px]" />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="flex items-center justify-center relative w-full rounded-[15px]">
              <div
                style={{
                  borderRight: "1px solid transparent",
                  borderTop: "2px solid transparent",
                  borderRadius: "8px",
                }}
                className="relative flex flex-col justify-start items-start w-full"
              >
                <div
                  className="w-[7px] h-[52px] mr-[10px] absolute z-[99] top-[50%] rounded-tr-[10px] rounded-br-[10px]"
                  style={{
                    backgroundColor: 'rgba(57, 151, 61, 0.5)',
                    transform: 'translateY(-50%)',
                  }}
                />
                <div className="relative flex flex-col justify-between items-start py-[19px] px-[30px] rounded-[15px] flex-grow bg-white w-full"
                  style={{
                    border: '2px solid transparent',
                    borderImageSource: ' linear-gradient(255.6deg, #39973D 7.71%, rgba(255, 255, 255, 0) 18.54%)',
                    borderImageSlice: 1,

                  }}
                >
                  <div className="flex justify-between items-center w-full mb-2">
                    <div className="flex flex-col items-start">
                      <h6 className="text-gray-700 font-semibold text-[16px] leading-2">Total Income</h6>
                      <h3 className="text-gray-900 font-bold text-[26px]">55,000</h3>
                    </div>
                    <div>
                      <div className="bg-[#39973D] rounded-[10px] p-2 opacity-[10%] w-[50px] h-[50px] absolute top-50 right-50 translate-x-[-19%] translate-y-[-18%]"></div>
                      <div className="relative"><img src={moneyrecive} alt="Total Balance icon" className="w-[32px] h-[32px]" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center relative w-full rounded-[15px]">
              <div
                style={{
                  borderRight: "1px solid transparent",
                  borderTop: "2px solid transparent",
                  borderRadius: "8px",
                }}
                className="relative flex flex-col justify-start items-start w-full"
              >
                <div
                  className="w-[7px] h-[52px] mr-[10px] absolute z-[99] top-[50%] rounded-tr-[10px] rounded-br-[10px]"
                  style={{
                    backgroundColor: 'rgba(134, 159, 243, 0.5)',
                    transform: 'translateY(-50%)',
                  }}
                />
                <div className="relative flex flex-col justify-between items-start py-[19px] px-[30px] rounded-[15px] border-2 flex-grow bg-white w-full"
                  style={{
                    border: '2px solid transparent',
                    borderImageSource: ' linear-gradient(255.6deg, #869FF3 7.71%, rgba(255, 255, 255, 0) 18.54%)',
                    borderImageSlice: 1,
                  }}>
                  <div className="flex justify-between items-center w-full mb-2">
                    <div className="flex flex-col items-start">
                      <h6 className="text-gray-700 font-semibold text-[16px] leading-2">Total Expense</h6>
                      <h3 className="text-gray-900 font-bold text-[26px]">20,550</h3>
                    </div>
                    <div>
                      <div className="bg-[#869FF3] rounded-[10px] p-2 opacity-[10%] w-[50px] h-[50px] absolute top-50 right-50 translate-x-[-19%] translate-y-[-18%]"></div>
                      <div className="relative"><img src={moneysend} alt="Total Balance icon" className="w-[32px] h-[32px]" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center relative w-full rounded-[15px]">
              <div
                style={{
                  borderRight: "1px solid transparent",
                  borderTop: "2px solid transparent",
                  borderRadius: "8px",
                }}
                className="relative flex flex-col justify-start items-start w-full"
              >
                <div
                  className="w-[7px] h-[52px] mr-[10px] absolute z-[99] top-[50%] rounded-tr-[10px] rounded-br-[10px]"
                  style={{
                    backgroundColor: 'rgba(235, 55, 195, 0.5)',
                    transform: 'translateY(-50%)',
                  }}
                />
                <div className="relative flex flex-col justify-between items-start py-[19px] px-[30px] rounded-[15px] border-2 flex-grow bg-white w-full"
                  style={{
                    border: '2px solid transparent',
                    borderImageSource: 'linear-gradient(255.6deg, #EB37C3 7.71%, rgba(255, 255, 255, 0) 18.54%)',
                    borderImageSlice: 1, 
                  }}
                >
                  <span className="absolute inset-x-0 top-0 h-[5px] rounded-t-lg" />
                  <span className="absolute inset-x-0 bottom-0 h-[5px] rounded-b-lg" />
                  <div className="flex justify-between items-center w-full mb-2">
                    <div className="flex flex-col items-start">
                      <h6 className="text-gray-700 font-semibold text-[16px] leading-2">Total Unit</h6>
                      <h3 className="text-gray-900 font-bold text-[26px]">20,550</h3>
                    </div>
                    <div>
                      <div className="bg-[#EB37C3] rounded-[10px] p-2 opacity-[10%] w-[50px] h-[50px] absolute top-50 right-50 translate-x-[-19%] translate-y-[-18%]"></div>
                      <div className="relative"><img src={building4} alt="Total Balance icon" className="w-[32px] h-[32px]" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div className="grid grid-cols-12 w-full gap-3 h-full">
            <div className="col-span-12 md:col-span-8 lg:col-span-6 rounded-lg shadow-[0px_0px_25px_0px_rgba(0,0,0,0.08)]">
              {/* <BalanceChart /> */}
            </div>

            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <div className="bg-white p-[20px] rounded-[15px] shadow-lg w-full">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-semibold">Important Numbers</h3>
                  <button className="modal bg-custom-gradient py-[8px] px-[10px] rounded-[10px] text-white font-semibold" onClick={handleOpenModal}>+ Add</button>
                </div>
                <ul className="max-h-64 overflow-y-auto">
                  {importantNumbers.map((contact, index) => (
                    <li key={index} className="mb-2 mr-[10px] flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="border border-[#F6F8FB] p-2 rounded-lg">
                          <p className="font-normal text-[#A7A7A7] text-[13px]">
                            <span className="font-normal text-black">Name:</span>{" "}
                            {contact.name}
                          </p>
                          <p className="font-normal text-[#A7A7A7] text-[13px]">
                            <span className="font-normal text-black">Ph Number:</span>{" "}
                            {contact.phone}
                          </p>
                          <p className="font-normal text-[#A7A7A7] text-[13px]">
                            <span className="font-normal text-black">Work:</span>{" "}
                            {contact.job}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <FaTrashAlt
                          className="cursor-pointer text-red-500 mr-[3px]"
                          title="Delete"
                          onClick={() => handleDeleteContact(contact)}
                        />
                        <FaEdit
                          className="cursor-pointer text-blue-500"
                          onClick={() => handleView(contact)}
                          title="View"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {isModalOpen && (
                <Modal contact={selectedContact} onClose={handleCloseModal} />
              )}
            </div>

            <div className="col-span-12 md:col-span-4 lg:col-span-3">
              <div className="bg-white p-[20px] rounded-[15px] shadow-lg h-full">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-semibold">Pending Maintenances</h3>
                  <button className="py-[8px] px-[10px] rounded-[10px] text-[#5678E9] font-semibold text-[14px] leading-[14px]">View all</button>
                </div>
                <ul className="max-h-64 overflow-y-auto pr-[8px]">
                  {pendingMaintenances.map((maintenance, index) => (
                    <li key={index} className="border-b border-gray-200 py-2 flex items-center">
                      <img
                        src={rogerimage}
                        alt="Profile"
                        className="rounded-full w-10 h-10 mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div className="font-normal">
                            <p className="font-normal text-[14px]">{maintenance.name}</p>
                            <p className="text-[#A7A7A7] text-[12px]">{maintenance.duration}</p>
                          </div>
                          <div>
                            <p className="text-[#E74C3C] font-bold">₹ {maintenance.amount}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mt-6">
            <DashboardTable />
            <div className="bg-[#fff] rounded-lg shadow-md w-full p-[20px] overflow-y-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-[20px] font-semibold mb-4">Upcoming Activity</h2>
                </div>
                <div className="mb-4">
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

              <ul className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar"> {/* Custom scrollbar class added */}
                {activities.map((activity, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-white py-[12px] px-[15px] rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                        {activity.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.name}</p>
                        <p className="text-[14px] text-[#A7A7A7]  leading-[19.5px]">{activity.time}</p>
                      </div>
                    </div>
                    <p className="text-[14px] text-[#4F4F4F] leading-4">{activity.date}</p>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
