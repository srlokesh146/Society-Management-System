import React from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'; 
import avatar from '../assets/images/avatar.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/editprofile'); 
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md sticky top-0 left-0 w-full">
      <div className="relative w-[335px]">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 bg-[#F6F8FB] "
        />
        <span className="absolute left-3 top-3 text-gray-400">
          <IoSearchOutline size={20} />
        </span>
      </div>
      <div className="flex items-center">
        <div className="mr-[20px]">
          <IoNotifications size={38} className="text-black cursor-pointer border border-[#D3D3D3] rounded-[10px] p-[8px]" />
        </div>
        <div className='border-l border-[#F4F4F4] pl-[20px]'>
          <img
            src={avatar}
            alt="Profile"
            className="rounded-full w-[48px] h-[48px] cursor-pointer" // Add cursor pointer
            onClick={handleProfileClick} // Handle click to navigate
          />
        </div>
        <div className='flex flex-col'>
          <h6 className='font-bold text-[16px]'>Moni Roy</h6>
          <span className='text-[12px] leading-[18px] text-[#A7A7A7]'>Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
