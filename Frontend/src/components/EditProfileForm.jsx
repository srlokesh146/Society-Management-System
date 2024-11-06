import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Navbar from "./Navbar";
import editimage from "../assets/images/editimage.png"
import { IoSearchOutline } from 'react-icons/io5';
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/images/Avatar.png";

function EditProfileForm() {
  const [profile, setProfile] = useState({
    firstName: "Arlene",
    lastName: "McCoy",
    phoneNumber: "+91 99130 44537",
    email: "ArleneMcCoy25@gmail.com",
    society: "Shantigram residency",
    country: "India",
    state: "Gujarat",
    city: "Baroda",
  });
  const [profileImage, setProfileImage] = useState(editimage);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };


  return (
    <>
      <div className="flex flex-col justify-start items-center h-screen bg-edit-images pt-16 px-4 md:px-8">
      
        <div className="max-w-[991px] w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4 mt-4">{isEditing ? "Edit Profile" : "Profile"}</h2>
            {!isEditing && (
              <button
                onClick={handleEditToggle}
                className="bg-custom-gradient text-white py-2 px-4 rounded-lg flex items-center mb-4"
              >
                <FaEdit className="mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row items-start">
              <div className="relative w-full md:w-1/4 flex flex-col items-center">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-[150px] h-[150px] rounded-full mb-2"
                />
                <button
                  onClick={() => document.getElementById('imageInput').click()}
                  className="absolute bottom-[50%] right-[50%] bg-white p-1 rounded-full shadow-md translate-x-[50px] translate-y-[56px]"
                  title="Edit Profile"
                >
                  <FaEdit className="text-gray-600" />
                </button>
                <input
                  type="file"
                  id="imageInput"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <p className="font-semibold">
                  {profile.firstName || "First Name"} {profile.lastName || "Last Name"}
                </p>
              </div>

              <div className="w-full md:w-3/4 md:pl-8 mt-4 md:mt-0">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1">First Name*</label>
                      <input
                        type="text"
                        value={profile.firstName}
                        onChange={(e) =>
                          setProfile({ ...profile, firstName: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px]"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Last Name*</label>
                      <input
                        type="text"
                        value={profile.lastName}
                        onChange={(e) =>
                          setProfile({ ...profile, lastName: e.target.value })
                        }
                        className="w-[320px] p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Phone Number*</label>
                      <input
                        type="text"
                        value={profile.phoneNumber}
                        onChange={(e) =>
                          setProfile({ ...profile, phoneNumber: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Email Address*</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) =>
                          setProfile({ ...profile, email: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Select Society*</label>
                      <input
                        type="text"
                        value={profile.society}
                        onChange={(e) =>
                          setProfile({ ...profile, society: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">Country*</label>
                      <input
                        type="text"
                        value={profile.country}
                        onChange={(e) =>
                          setProfile({ ...profile, country: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">State*</label>
                      <input
                        type="text"
                        value={profile.state}
                        onChange={(e) =>
                          setProfile({ ...profile, state: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">City*</label>
                      <input
                        type="text"
                        value={profile.city}
                        onChange={(e) =>
                          setProfile({ ...profile, city: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSaveChanges}
                  className="bg-custom-gradient text-white py-2 px-4 rounded-lg"
                >
                  Update Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfileForm;