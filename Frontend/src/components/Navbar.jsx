import React, { useEffect, useState } from "react";
import { IoSearchOutline, IoNotifications } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../assets/images/Avatar.png";
import { notifications } from "../constantdata";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {
    setShowSearch(false);
    navigate('/editprofile');
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setShowSearch(true);
    } else if (location.pathname === "/residentmanagement") {
      setShowSearch(false);
    } else if (location.pathname === "/editprofile") {
      setShowSearch(false);
    } else if (location.pathname === "/reqtracking") {
      setShowSearch(false);
    } else if (location.pathname === "/visitorlog") {
      setShowSearch(false);
    } else if (location.pathname === "/securityprotocols") {
      setShowSearch(false);
    } else if (location.pathname === "/securityguard") {
      setShowSearch(false);
    } else if (location.pathname === "/announcement") {
      setShowSearch(false);
    } else if (location.pathname === "/income") {
      setShowSearch(false);
    } else if (location.pathname === "/income") {
      setShowSearch(false);
    }
  }, [location]);

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 left-0 w-full z-[99] max-md:flex-col max-md:justify-start max-md:flex max-md:items-start max-sm:flex-col max-sm:justify-start max-sm:items-start max-lg:pl-[50px]">

      {showSearch && (
        <div className="relative w-[335px] max-sm:w-[300px] max-md:w-[320px] max-sm:ms-[35px] flex justify-end max-md:ml-[35px]">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 bg-[#F6F8FB] max-sm:mb-[15px] max-md:mb-[15px]"
          />
          <span className="absolute left-3 top-3 text-gray-400">
            <IoSearchOutline size={20} />
          </span>
        </div>
      )}

      <div className="flex items-center space-x-4 justify-end w-full max-md:justify-start max-sm:justify-start max-sm:ms-[35px] max-md:ml-[35px]">

        {/* Notification Icon */}
        <div className="relative">
          <IoNotifications
            size={38}
            className="text-black cursor-pointer border border-[#D3D3D3] rounded-[10px] p-[8px] md:block"
            onClick={handleNotificationClick}
          />

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div
              className="absolute right-0 mt-2 min-w-[540px] bg-white rounded-lg shadow-lg p-4 z-[9999] max-sm:max-h-[700px] max-sm:overflow-y-auto 
               max-sm:min-w-[310px] max-md:min-w-[500px] max-md:left-0 max-md:translate-x-[-10%] max-sm:translate-x-[-22%] sm:min-w-[30rem] notication-class"
            >
              <div className="flex justify-between items-center mb-2 max-sm:flex-col max-sm:justify-start">
                <span className="font-bold text-lg  max-md:justify-start max-sm:mb-[10px]">Notifications</span>
                <button className="text-sm text-gray-500">Clear all</button>
              </div>
              {notifications.map((notification, index) => (
                <div key={index} className="border-b border-gray-200 pb-5 mb-[14px]">
                  <div className="flex items-center">
                    {/* {notification.icon || (
                      <>
                        <div className="w-10 h-10 mr-[15px] flex items-center justify-center bg-[#5678E9] rounded-full text-center text-sm font-bold text-notification">
                          {notification.text}
                        </div>
                      </>
                    )} */}
                    {notification.icon}
                    <h6 className="font-bold text-sm">{notification.title}</h6>
                  </div>
                  <p className="text-[12px] text-[#A7A7A7] font-normal mt-1 ml-[50px] mb-[4px]">{notification.time}</p>
                  <p className="text-sm text-gray-600 ml-[50px]">{notification.description}</p>
                  {notification.title === "Update Maintenance" && (
                    <div className="flex flex-col">
                      <div className="bg-[#F6F8FB] flex justify-between leading-[21px] ml-[50px] pt-[10px] pb-[10px] px-[15px]">
                        <p className="text-sm text-[#4F4F4F]">Maintenance Amount:</p>
                        <p className="text-[#E74C3C]">$ 1500</p>
                      </div>
                      <div className="border border-[#FFFFFF]"></div>
                      <div className="flex justify-between bg-[#F6F8FB] leading-[21px] ml-[50px] pt-[10px] pb-[10px] px-[15px]">
                        <p className="text-sm text-[#4F4F4F]">Penalty:</p>
                        <p className="text-[#39973D]">$ 350</p>
                      </div>
                    </div>
                  )}
                  <div className="flex space-x-2 mt-2 ml-[50px] max-md:justify-start max-sm:flex-col max-sm:justify-start max-sm:space-x-0">
                    {notification.options &&
                      notification.options.map((option, i) => (
                        <button key={i} className="px-[28px] py-[8px] text-xs rounded-[10px] border border-gray-300 max-sm:mb-[10px]">
                          {option}
                        </button>
                      ))}
                    {notification.options2 &&
                      notification.options2.map((option, i) => (
                        <button key={i} className="px-[28px] py-[8px] text-xs rounded-[10px] bg-[#5678E9] text-white">
                          {option}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div
          className="border-l border-[#F4F4F4] pl-[20px] cursor-pointer"
          onClick={handleProfileClick}
        >
          <img
            src={Avatar}
            alt="Profile"
            className="rounded-full w-[48px] h-[48px] max-sm:w-[50px] max-sm:h-[50px] sm:w-[50px] md-[50px] cursor-pointer object-contain"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col md:flex">
          <h6 className="font-bold text-[16px]">Moni Roy</h6>
          <span className="text-[12px] leading-[18px] text-[#A7A7A7]">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
