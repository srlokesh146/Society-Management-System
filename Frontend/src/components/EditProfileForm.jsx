import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Navbar from "./Navbar";
import editimage from "../assets/images/editimage.png";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/images/Avatar.png";
import { useSelector } from "react-redux";
import { getSocieties, UpdateUserProfile } from "../services/AuthService";
import toast from "react-hot-toast";

function EditProfileForm() {
  const { user } = useSelector((store) => store.auth);
  const [profile, setProfile] = useState({
    FirstName: user.FirstName,
    LastName: user.LastName,
    Email: user.Email,
    Phone: user.Phone,
    Country: user.Country,
    State: user.State,
    City: user.City,
    select_society: user.select_society,
    profileImage: user.profileImage,
  });
  const [profileImage, setProfileImage] = useState(editimage);
  const [isEditing, setIsEditing] = useState(false);
  const [societyList, setSocietyList] = useState([]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prevProfile) => ({
        ...prevProfile,
        [e.target.name]: e.target.files[0],
      }));
      setProfileImage(imageUrl);
    }
  };

  // Update user profile
  const handleProfileUpdate = async (id) => {
    console.log(profile)
    try {
      const response = await UpdateUserProfile(id, profile);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsEditing(false);
    }
  };

  // get all societies
  const fetchSocieties = async () => {
    try {
      const response = await getSocieties();
      setSocietyList(response.data.Society);
    } catch (error) {
      toast.error("Failed to fetch societies");
    }
  };

  useEffect(() => {
    fetchSocieties();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-start items-center h-screen bg-edit-images pt-16 px-4 md:px-8">
        <div className="max-w-[991px] w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4 mt-4">
              {isEditing ? "Edit Profile" : "Profile"}
            </h2>
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
                {profile.profileImage ? (
                  <>
                    <img
                      src={
                        profile.profileImage
                          ? profile.profileImage
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                      }
                      alt="Profile"
                      className="w-[150px] h-[150px] rounded-full mb-2"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-[150px] h-[150px] rounded-full mb-2"
                    />
                  </>
                )}

                <button
                  onClick={() => document.getElementById("imageInput").click()}
                  className="absolute bottom-[50%] right-[50%] bg-white p-1 rounded-full shadow-md translate-x-[50px] translate-y-[56px]"
                  title="Edit Profile"
                >
                  <FaEdit className="text-gray-600" />
                </button>
                <input
                  type="file"
                  id="imageInput"
                  style={{ display: "none" }}
                  accept="image/*"
                  name="profileImage"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                />
                <p className="font-semibold">
                  {user.FirstName || "First Name"}{" "}
                  {user.LastName || "Last Name"}
                </p>
              </div>

              <div className="w-full md:w-3/4 md:pl-8 mt-4 md:mt-0">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1">
                        First Name*
                      </label>
                      <input
                        type="text"
                        value={profile.FirstName}
                        onChange={(e) =>
                          setProfile({ ...profile, FirstName: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px]"
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">
                        Last Name*
                      </label>
                      <input
                        type="text"
                        value={profile.LastName}
                        onChange={(e) =>
                          setProfile({ ...profile, LastName: e.target.value })
                        }
                        className="w-[320px] p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="text"
                        value={profile.Phone}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            Phone: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">
                        Email Address*
                      </label>
                      <input
                        type="email"
                        value={profile.Email}
                        onChange={(e) =>
                          setProfile({ ...profile, Email: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">
                        Select Society*
                      </label>
                      <select
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            select_society: e.target.value,
                          })
                        }
                        value={profile.select_society}
                        disabled={!isEditing}
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                      >
                        <option value="{">select society</option>
                        {societyList.map((society) => (
                          <option value={society._id}>
                            {society.Society_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">
                        Country*
                      </label>
                      <input
                        type="text"
                        value={profile.Country}
                        onChange={(e) =>
                          setProfile({ ...profile, Country: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">State*</label>
                      <input
                        type="text"
                        value={profile.State}
                        onChange={(e) =>
                          setProfile({ ...profile, State: e.target.value })
                        }
                        className="w-full p-2 border border-[#202224] bg-transparent rounded-[10px] py-[10.5px] px-[13px] "
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-600 mb-1">City*</label>
                      <input
                        type="text"
                        value={profile.City}
                        onChange={(e) =>
                          setProfile({ ...profile, City: e.target.value })
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
                  onClick={handleProfileUpdate}
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
