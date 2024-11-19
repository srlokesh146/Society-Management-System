import React from "react";
import { FaImage } from "react-icons/fa";

function Form({ user }) {
  const handleViewFile = (file) => {
    window.open(file);
  };

  return (
    <div>
      <div className="bg-white grid grid-cols-1 gap-6 p-6 rounded-lg">
        {/* Profile Photo Section */}
        <div className="flex justify-start">
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border border-gray-300"
          />
        </div>

        {/* First Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 mt-[-200px] gap-8 ml-40 items-center">
          <div>
            <label className="block text-md font-medium text-black">
              Full Name
            </label>
            <p className="text-gray-400 font-lighter">{user.Full_name}</p>
          </div>
          <div>
            <label className="block text-md font-medium text-black">
              Phone Number
            </label>
            <p className="text-gray-400 font-lighter">
              +91 {user.Phone_number}
            </p>
          </div>
          <div>
            <label className="block text-md font-medium text-black">
              Email Address
            </label>
            <p className="text-gray-400 font-lighter">{user.Email_address}</p>
          </div>
          <div>
            <label className="block text-md font-medium text-black">
              Gender
            </label>
            <p className="text-gray-400 font-lighter"> {user.Gender}</p>
          </div>
          <div>
            <button
              onClick={() => handleViewFile(user?.Adhar_front)}
              className="flex flex-col items-start w-[300px] ml-[-45px] py-3 px-4 bg-white border border-gray-300 rounded-lg"
            >
              {/* Icon and File Name */}
              <div className="flex items-center gap-3">
                <div>
                  <FaImage size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="font-lighter text-[10px] truncate">
                    Essential Aadharcard Front Side.JPG
                  </p>
                  <p className="text-xs text-start text-gray-500 font-lighter mt-1">
                    3.5 MB
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 mt-[-100px] gap-8  ml-40 items-center">
          <div>
            <label className="block text-md font-medium text-black">Wing</label>
            <p className="text-gray-400 font-lighter">{user.Wing}</p>
          </div>
          <div>
            <label className="block text-md font-medium text-black">Age</label>
            <p className="text-gray-400 font-lighter">{user.Age}</p>
          </div>
          <div>
            <label className="block text-md font-medium text-black">Unit</label>
            <p className="text-gray-400 font-lighter">{user.Unit}</p>
          </div>
          <div>
            <label className="block text-md font-medium text-black">
              Relation
            </label>
            <p className="text-gray-400 font-lighter">{user.Relation}</p>
          </div>
          <div>
            <button
              onClick={() => handleViewFile(user?.Address_proof)}
              className="flex flex-col items-start w-[300px] ml-[-45px] py-3 px-4 bg-white border border-gray-300 rounded-lg"
            >
              {/* Icon and File Name */}
              <div className="flex items-center gap-3">
                <div>
                  <FaImage size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="font-lighter text-[10px] truncate">
                    Address Proof Front Side.PDF
                  </p>
                  <p className="text-xs text-start text-gray-500 font-lighter mt-1">
                    3.5 MB
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
