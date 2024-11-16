import React, { useEffect, useState } from "react";
import {
  pendingMaintenances,
  cardData,
} from "../../constantdata";
import Modal from "../../components/modal/Modal";
import DashboardTable from "../../components/DashboardTable";
import edit from "../../assets/images/edit.svg";
import trash from "../../assets/images/trash.svg";
import rogerimage from "../../assets/images/rogerimage.png";
import { FaSquarePlus } from "react-icons/fa6";
import {
  DeleteImpNumber,
  GetImpNumbers,
} from "../../services/impNumberService";
import toast from "react-hot-toast";
import { GetAnnouncements } from "../../services/announcementService";
import BalanceChart from "../../components/BalanceChart";
import DeleteConfirmationModal from "../../components/modal/DeleteConfirmationModal";

const Dashboard = () => {
  const [importantNumbers, setImportantNumbers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [activities, setActivities] = useState([]);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const openConfirmationModel = (contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteContact = async () => {
    const updatedContacts = importantNumbers.filter(
      (v) => v._id !== selectedContact._id
    );
    setImportantNumbers(updatedContacts);
    try {
      const response = await DeleteImpNumber(selectedContact._id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      selectedContact(null);
    }
  };

  const fetchImportantNumbers = async () => {
    try {
      const response = await GetImpNumbers();
      setImportantNumbers(response.data.ImportantNumber);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchAnnouncement = async () => {
    try {
      const response = await GetAnnouncements();
      setActivities(response.data.Announcement);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchImportantNumbers();
    fetchAnnouncement();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1">
        <div>
          <div className="grid grid-cols-4 col-span-2 gap-4 mb-6 max-xl:grid-cols-2 max-sm:grid-cols-2 max-2xl:grid-cols-2 relative z-[9]">
            {cardData.map((card, index) => (
              <div
                key={index}
                className="flex items-center justify-center relative w-full rounded-[15px]"
              >
                <div
                  style={{
                    borderRight: "1px solid transparent",
                    borderTop: "2px solid transparent",
                    borderRadius: "8px",
                  }}
                  className="relative flex flex-col justify-start items-start w-full max-md:flex-col max-md:justify-start max-md:flex max-md:items-start max-sm:flex-col max-sm:justify-start max-sm:flex max-sm:items-start"
                >
                  <div
                    className="w-[7px] h-[52px] mr-[10px] absolute z-[99] top-[50%] rounded-tr-[10px] rounded-br-[10px]"
                    style={{
                      backgroundColor: card.bgColor,
                      transform: "translateY(-50%)",
                    }}
                  />
                  <div
                    className="relative flex flex-col justify-between items-start py-[19px] px-[30px] rounded-[15px] flex-grow bg-white w-full max-sm:pt-[12px] max-sm:pb-[12px] max-md:pt-[12px] max-md:pb-[12px] sm:max-w-full max-sm:max-w-full max-md:col-span-2"
                    style={{
                      border: "2px solid transparent",
                      borderImageSource: card.gradient,
                      borderImageSlice: 1,
                    }}
                  >
                    <div className="flex justify-between items-center w-full max-sm:flex-col-reverse max-sm:items-start">
                      <div className="flex flex-col items-start max-sm:mt-[15px]">
                        <h6 className="text-gray-700 font-semibold text-[16px] leading-2 max-sm:text-[14px] max-md:text-[18px] max-sm:text-nowrap">
                          {card.title}
                        </h6>
                        <h3 className="text-gray-900 font-bold text-[26px] max-sm:text-[20px] max-sm:font-medium max-md:text-[20px] max-lg:text-[20px] max-xl:text-[20px] max-2xl:text-[20px]">
                          {card.amount}
                        </h3>
                      </div>
                      <div className="relative">
                        <div
                          className="rounded-[10px] p-2 opacity-[10%] w-[50px] h-[50px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-sm:w-[40px] max-sm:h-[42px] max-sm:bg-iconColor maxmd:w-[40px] max-md:h-[42px] bg-iconColor"
                          style={{
                            backgroundColor: card.iconBg,
                          }}
                        ></div>
                        <div className="relative max-sm:bg-iconColor">
                          <img
                            src={card.icon}
                            alt={`${card.title} icon`}
                            className="w-[32px] h-[32px] max-sm:w-[27px] max-sm:h-[27px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* chart section */}

          <div className="grid grid-cols-12 w-full gap-3 h-full max-xl:grid-cols-6 max-2xl:grid-cols-6">
            <div className="col-span-12 max-md:col-span-12 max-lg:col-span-6 md:col-span-6 rounded-lg shadow-[0px_0px_25px_0px_rgba(0,0,0,0.08)]">
              <BalanceChart />
            </div>

            <div className="col-span-12 max-md:col-span-12 lg:col-span-3 max-xl:col-span-3 max-md">
              <div className="bg-white p-[20px] rounded-[15px] shadow-lg w-full">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-semibold max-sm:text-[16px] max-mb:text-[18px]">
                    Important Numbers
                  </h3>
                  <button
                    className="modal bg-custom-gradient py-[8px] px-[10px] rounded-[10px] text-white font-semibold"
                    onClick={handleOpenModal}
                  >
                    <div className="flex justify-center items-center">
                      <div>
                        <FaSquarePlus className="rounded-[6px] mr-1" />
                      </div>
                      <div>
                        Add
                      </div>
                    </div>
                  </button>
                </div>
                <form
                  onSubmit={handleFormSubmit}
                  className="max-h-64 overflow-y-auto custom-scrollbar"
                >
                  <ul>
                    {importantNumbers.map((contact, index) => (
                      <li key={index} className="mb-2 mr-[10px]">
                        <div className="border border-[#F6F8FB] p-2 rounded-lg flex justify-between items-center">
                          <div>
                            <p className="font-normal text-[#A7A7A7] text-[13px]">
                              <span className="font-normal text-black">
                                Name:
                              </span>{" "}
                              {contact.Full_name}
                            </p>
                            <p className="font-normal text-[#A7A7A7] text-[13px]">
                              <span className="font-normal text-black">
                                Ph Number:
                              </span>{" "}
                              {contact.Phone_Number}
                            </p>
                            <p className="font-normal text-[#A7A7A7] text-[13px]">
                              <span className="font-normal text-black">
                                Work:
                              </span>{" "}
                              {contact.Work}
                            </p>
                          </div>

                          <div className="flex space-x-2">
                            <img src={trash}
                              className="cursor-pointer text-red-500 mr-[3px] bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                              title="Delete"
                              onClick={() => openConfirmationModel(contact)}
                            />
                            <img src={edit}
                              className="cursor-pointer text-blue-500 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                              onClick={() => handleView(contact)}
                              title="View"
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button type="submit" className="hidden">
                    Submit
                  </button>
                </form>
              </div>
              {isModalOpen && (
                <Modal
                  contact={selectedContact}
                  onClose={handleCloseModal}
                  fetchImportantNumbers={fetchImportantNumbers}
                />
              )}
              {isDeleteModalOpen && (
                <DeleteConfirmationModal
                  isOpen={isDeleteModalOpen}
                  onClose={() => setIsDeleteModalOpen(false)}
                  onDelete={handleDeleteContact}
                  modalName="number"
                />
              )}
            </div>

            <div className="max-md:col-span-12 lg:col-span-3 max-xl:col-span-3">
              <div className="bg-white p-[20px] rounded-[15px] shadow-lg h-full">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-semibold max-sm:text-[16px] max-mb:text-[18px]">
                    Pending Maintenances
                  </h3>
                  <button className="py-[8px] px-[10px] rounded-[10px] text-[#5678E9] font-semibold text-[14px] leading-[14px]">
                    View all
                  </button>
                </div>
                <ul className="max-h-64 overflow-y-auto pr-[8px] custom-scrollbar">
                  {pendingMaintenances.map((maintenance, index) => (
                    <li
                      key={index}
                      className="border-b border-gray-200 py-2 flex items-center"
                    >
                      <img
                        src={rogerimage}
                        alt="Profile"
                        className="rounded-full w-10 h-10 mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <div className="font-normal">
                            <p className="font-normal text-[14px]">
                              {maintenance.name}
                            </p>
                            <p className="text-[#A7A7A7] text-[12px]">
                              {maintenance.duration}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#E74C3C] font-bold">
                              ₹ {maintenance.amount}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* chart section end */}

          <div className="grid grid-cols-3 max-2xl:grid-cols-2 gap-3 mt-[20px] max-xl:grid-cols-1 max-sm:grid-col-1">
            <div className="col-span-2 max-2xl:col-span-2 max-xl:col-span-1">
              <DashboardTable />
            </div>
            <div className="bg-[#fff] rounded-lg shadow-md w-full p-[20px] overflow-y-auto">
              <div className="flex justify-between items-center mb-[27px] ps-[20px] pr-[20px] max-sm:ps-[10px] max-sm:pr-0">
                <div>
                  <h2 className="text-[20px] font-semibold leading-[27px] max-sm:text-[16px] max-md:text-[18px] max-2xl:text-[18px]">
                    Upcoming Activity
                  </h2>
                </div>
                <div>
                  <select
                    id="month-select"
                    className="text-[15px] border border-gray-300 rounded-lg px-2 py-1 text-gray-700 flex items-center outline-none w-[116px]"
                  >
                    <option value="" disabled defaultValue>
                      Month
                    </option>
                    <option
                      value="last-week"
                      className="text-[15px] max-sm:text-[15px] bg-custom-gradient"
                    >
                      Last Week
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
              </div>

              <ul className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
                {activities.map((activity, index) => (
                  <li
                    key={activity._id}
                    className="flex items-center justify-between bg-white py-[12px] px-[15px] rounded-lg shadow-sm max-sm:px-[5px]"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-[40px] h-[40px] bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold acvtivity">
                        {activity.title[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium  mb-1">
                          {activity.title}
                        </p>
                        <p className="text-[14px] text-[#A7A7A7]  leading-[19.5px]">
                          8:00 PM To 10:00 PM
                        </p>
                      </div>
                    </div>
                    <p className="text-[14px] text-[#4F4F4F] leading-4">
                      {new Date(activity.date)
                        .toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        .replace(/\//g, "-")}
                    </p>
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
