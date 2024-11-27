import React, { useEffect, useState } from "react";
import { IoSearchOutline, IoNotifications } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../assets/images/Avatar.png";
import { Navigationbar, notifications } from "../constantdata";
import NotificationImage from "../assets/images/notificationimage.png";
import search from "../assets/images/search.svg";
import useCurrentPath from "./useCurrentPath";
import { FaChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import PayNowModal from "./modal/PayNowModal";
import PayPersonModal from "./modal/PayPersonModal";
import PayMentMathodModal from "./modal/PayMentMathodModal";
import PayMenCard from "./modal/PayMenCard";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [showSearch, setShowSearch] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [clearedNotifications, setClearedNotifications] = useState(false);
  const [isPayNowOpen, setIsPayNowOpen] = useState(false);
  const [isPaymentNowOpen, setIsPaymantNowOpen] = useState(false);
  const [isPaymenCardOpen, setisPaymenCardOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const perPersonAmount = 1500;
  const baseAmount = 1500;
  const totalAmount = baseAmount * selectedMembers;

  const {
    isDashboard,
    isResidentManagement,
    isEditProfile,
    isHome,
    isReqTracking,
    isVisitorLog,
    isSecurityProtocols,
    isSecurityGuard,
    isAnnouncement,
    isIncome,
  } = useCurrentPath();

  const handleProfileClick = () => {
    setShowSearch(false);
    if (user.role === "admin" && isDashboard) {
      navigate("/editprofile");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsAccepted(true);
  };

  const handleChange = (e) => {
    const membersCount = Number(e.target.value);
    setSelectedMembers(membersCount);
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setClearedNotifications(false);
  };

  const handleClearNotifications = () => {
    setClearedNotifications(true);
  };

  useEffect(() => {
    if (isDashboard) {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [
    isDashboard,
    isResidentManagement,
    isEditProfile,
    isHome,
    isReqTracking,
    isVisitorLog,
    isSecurityProtocols,
    isSecurityGuard,
    isAnnouncement,
    isIncome,
  ]);

  return (
    <div className=" flex justify-between items-center p-4 bg-white shadow-md sticky top-0 left-0 w-full z-[99] max-md:justify-start max-md:flex max-md:items-start max-sm:flex-col max-sm:justify-start max-sm:items-start max-lg:pl-[50px]">
      {showSearch ? (

        <div className="search-icon relative w-[335px] max-sm:w-[300px] max-md:w-[320px] max-sm:ms-[35px] flex justify-end max-md:ml-[35px] max-sm:hidden ">

        <div className="relative w-[335px] max-sm:w-[300px] max-md:w-[320px] max-sm:ms-[35px] flex justify-end max-md:ml-0 max-sm:hidden">

          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 bg-[#F6F8FB] max-sm:mb-[15px] max-xl:ml-[15px]"
          />

          <span className="absolute left-3 top-[10px] text-gray-400">
           <img className="h-[20px]  w-[20px]" src={search} alt="" />

          <span className="absolute left-3 top-3 text-gray-400 max-xl:left-6">
            <IoSearchOutline size={20} />

          </span>
        </div>
      ) : (
        <div className="flex items-center max-sm:hidden max-md:hidden">
          <span
            className="cursor-pointer text-[18px] leading-[27px] font-normal text-[#A7A7A7] mr-[12px]"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </span>

          <FaChevronRight className="mr-[3px] w-[12px]" />

          {Navigationbar.map((item, index) => (
            <div key={item.path}>
              <span
                className={
                  location.pathname === item.path
                    ? "text-[#5678E9] ml-[12px] text-[18px] font-normal leading-[27px]"
                    : ""
                }
              >
                {location.pathname === item.path ? item.label : ""}
              </span>

              {index < Navigationbar.length - 1 &&
                location.pathname === item.path && (
                  // <FaChevronRight className="mr-[3px] w-[12px]" />
                  <></>
                )}
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center space-x-4 justify-end w-full max-md:justify-end max-sm:justify-end">
      <div className="input-search-icon max-sm:block max-xl:hidden lg:hidden max-sm:rounded-full"></div>
        {/* Notification Icon */}
        <div className="relative">
          <IoNotifications
            size={38}
            className="text-black cursor-pointer border border-[#D3D3D3] rounded-[10px] p-[8px] md:block max-sm:rounded-full max-sm:bg-[#F6F8FB] max-sm:border-none max-sm:w-[50px] max-sm:h-[50px] max-sm:p-[10px]"
            onClick={handleNotificationClick}
          />

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 max-w-[540px] bg-white rounded-lg shadow-lg p-4 z-[9999] max-sm:max-h-[750px] max-sm:p-[30px] max-sm:overflow-y-auto max-sm:min-w-[355px] max-md:min-w-[500px] max-md:left-0 max-md:translate-x-[-100%] max-sm:translate-x-[-55%] sm:min-w-[30rem]">
              <div className="flex justify-between items-center mb-2 max-sm:ps-[15px] max-sm:pr-[15px]">
                <span className="text-[20px] font-normal leading-[30px] max-md:justify-start max-sm:mb-[10px]">
                  Notifications
                </span>
                {clearedNotifications ? (
                  <AiOutlineClose
                    size={20}
                    className="cursor-pointer ml-2 text-gray-500"
                    onClick={() => setIsNotificationOpen(false)}
                  />
                ) : (
                  <button
                    className="text-sm text-gray-500"
                    onClick={handleClearNotifications}
                  >
                    Clear all
                  </button>
                )}
              </div>

              {clearedNotifications ? (
                <div className="text-center py-10">
                  <img
                    src={NotificationImage}
                    alt="No Notifications"
                    className="mx-auto mb-[24px]"
                  />
                  <h4 className="text-[20px] font-normal leading-[30px]">
                    No notification yet!
                  </h4>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-5 mb-[14px]"
                  >
                    <div className="flex items-center">
                      {notification.icon}
                      <h6 className="font-bold text-sm">
                        {notification.title}
                      </h6>
                    </div>
                    <p className="text-[12px] text-[#A7A7A7] font-normal mt-1 ml-[50px] mb-[4px]">
                      {notification.time}
                    </p>
                    <p className="text-sm text-gray-600 ml-[50px]">
                      {notification.description}
                    </p>
                    {notification.title === "Update Maintenance" && (
                      <div className="flex flex-col">
                        <div className="bg-[#F6F8FB] flex justify-between leading-[21px] ml-[50px] pt-[10px] pb-[10px] px-[15px]">
                          <p className="text-sm text-[#4F4F4F]">
                            Maintenance Amount:
                          </p>
                          <p className="text-[#E74C3C]">$ 1500</p>
                        </div>
                        <div className="border border-[#FFFFFF]"></div>
                        <div className="flex justify-between bg-[#F6F8FB] leading-[21px] ml-[50px] pt-[10px] pb-[10px] px-[15px]">
                          <p className="text-sm text-[#4F4F4F]">Penalty:</p>
                          <p className="text-[#39973D]">$ 350</p>
                        </div>
                      </div>
                    )}
                    <div className="flex space-x-3 mt-2 ml-[50px] max-md:justify-start max-sm:space-x-0">
                      {notification.options &&
                        notification.options.map((option, i) => (
                          <button
                            key={i}
                            className="px-[28px] py-[8px] text-xs rounded-[10px] border border-gray-300 max-sm:mr-[15px]"
                          >
                            {option}
                          </button>
                        ))}

                      {notification.title === "Ganesh Chaturthi (A- 101)" && (
                        <div className="space-x-3">
                          <button
                            onClick={handleOpenModal}
                            className={`px-[28px] py-[8px] text-xs rounded-[10px] ${
                              isAccepted
                                ? "border border-gray-300"
                                : "bg-[#5678E9] text-white border border-gray-300"
                            }`}
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className={`px-[28px] py-[8px] text-xs rounded-[10px] ${
                              isAccepted
                                ? "bg-[#5678E9] text-white border border-gray-300"
                                : "border border-gray-300"
                            }`}
                          >
                            Decline
                          </button>
                        </div>
                      )}

                      {notification.options2 &&
                        notification.options2.map((option, i) => (
                          <button
                            key={i}
                            className="px-[28px] py-[8px] text-xs rounded-[10px] bg-[#5678E9] text-white"
                          >
                            {option}
                          </button>
                        ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          <PayPersonModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setIsAccepted(true);
            }}
            totalAmount={totalAmount}
            perPersonAmount={perPersonAmount}
            setIsPayNowOpen={setIsPayNowOpen}
            handleChange={handleChange}
            selectedMembers={selectedMembers}
          />
          <PayNowModal
            isOpen={isPayNowOpen}
            onClose={() => {
              setIsPayNowOpen(false);
              setIsAccepted(true);
            }}
            totalAmount={totalAmount}
            perPersonAmount={perPersonAmount}
            selectedMembers={selectedMembers}
            setIsPaymanNowOpen={() => setIsPaymantNowOpen(true)}
          />
          <PayMentMathodModal
            isOpen={isPaymentNowOpen}
            onClose={() => {
              setIsPaymantNowOpen(false);
              setIsAccepted(true);
            }}
            setisPaymenCardOpen={() => setisPaymenCardOpen(true)}
          />
          <PayMenCard
            isOpen={isPaymenCardOpen}
            onClose={() => {
              setisPaymenCardOpen(false);
              setIsAccepted(false);
            }}
          />
        </div>

        {/* Profile Icon */}
        <div
          className="border-l border-[#F4F4F4] pl-[20px] cursor-pointer max-sm:border-0 max-sm:pl-0"
          onClick={handleProfileClick}
        >
          <img
            src={
              user.role === "security"
                ? user?.profileimage || Avatar
                : user?.profileImage || Avatar
            }
            alt="Profile"
            className="rounded-full w-[48px] h-[48px] max-sm:w-[50px] max-sm:h-[50px] sm:w-[50px] md-[50px] cursor-pointer object-cover"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col md:flex">
          <h6 className="font-bold text-[16px] max-sm:hidden">
            {user.role === "security"
              ? user?.full_name
              : user?.role === "resident"
              ? user?.Full_name
              : user?.FirstName + " " + user?.LastName}
          </h6>
          <span className="text-[12px] leading-[18px] text-[#A7A7A7] max-sm:hidden">
            {user?.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
