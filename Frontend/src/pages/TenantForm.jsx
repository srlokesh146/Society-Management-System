import React, { useState, useEffect } from 'react';
import { FaCamera, FaImage, FaUpload, FaCheckCircle } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import OwnerForm from './OwnerForm';
import { useNavigate } from 'react-router-dom';

export default function TeantForm() {
  const [formData, setFormData] = useState({
    members: [],
    vehicles: [],
    fullName: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    wing: '',
    unit: '',
    relation: '',
    aadharFront: null,
    aadharBack: null,
    addressProof: null,
    rentAgreement: null,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('tenant');
  const [memberCount, setMemberCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);
  const navigate = useNavigate();

  const handleTenantClick = () => {
    setActiveTab('owner');
    navigate('/ownerform');
  };
  const handleCreate = () => {
    if (isFormValid) {
      console.log(formData); // Log the form data to the console
    }
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // Validate form data
  useEffect(() => {
    const validateForm = () => {
      const requiredFields = {
        fullName: formData.fullName,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        wing: formData.wing,
        unit: formData.unit,
        relation: formData.relation,
        aadharFront: formData.aadharFront,
        aadharBack: formData.aadharBack,
        addressProof: formData.addressProof,
      };

      const isValid = Object.values(requiredFields).every(value =>
        value !== null && value !== undefined && value !== ''
      );

      setIsFormValid(isValid);
    };

    validateForm();
  }, [formData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file uploads
  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...formData.members];
    if (!updatedMembers[index]) {
      updatedMembers[index] = {};
    }
    updatedMembers[index][field] = value;
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleVehicleChange = (index, field, value) => {
    const updatedVehicles = [...formData.vehicles];
    if (!updatedVehicles[index]) {
      updatedVehicles[index] = {};
    }
    updatedVehicles[index][field] = value;
    setFormData({ ...formData, vehicles: updatedVehicles });
  };
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {/* Tab Buttons */}
      <div className="flex ">
        <button
          className={`px-6 py-2 rounded-t-lg ${activeTab === 'owner' ? 'bg-[#FF6B07] text-white' : 'bg-white text-gray-600'}`}
          onClick={() => handleTenantClick('owner')}
        >
          Owner
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg ${activeTab === 'tenant' ? 'bg-[#FF6B07] text-white' : 'bg-white text-gray-600'}`}
          onClick={() => {
            setActiveTab('tenant');
          }}
        >
          Tenant
        </button>
      </div>

      <div className="grid grid-cols-1 bg-white rounded-lg p-6 shadow-md md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-lighter text-black-500">Owner Full Name*</label>
          <input
            type="text"
            name="Owner_Full_name"
            value={formData.ownerFullName}
            onChange={handleInputChange}
            placeholder="Enter Full Name"
            className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-lighter text-black-500">Owner Phone*</label>
          <input
            type="tel"
            name="Owner_Phone"
            value={formData.ownerPhone}
            onChange={handleInputChange}
            placeholder="+91"
            className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200"
          />
        </div>
        <div>
          <label className="block text-sm font-lighter text-black-500">Owner Address*</label>
          <input
            type="text"
            name="Owner_Address"
            value={formData.ownerAddress}
            onChange={handleInputChange}
            placeholder="Enter Address"
            className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200"
          />
        </div>
      </div>
      {/* Form Container */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Profile Photo Section */}
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="relative w-24 h-24">
              <input
                type="file"
                name='profileImage'
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="hidden"
                id="profilePhotoInput"
              />
              <label
                htmlFor="profilePhotoInput"
                className="cursor-pointer w-full h-full rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-300"
              >
                {profilePhotoPreview ? (
                  <img
                    src={profilePhotoPreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                    <FaCamera size={24} className="text-gray-400" />
                  </div>
                )}
              </label>
            </div>
            <label
              htmlFor="profilePhotoInput"
              className="text-blue-500 font-semibold text-sm mt-2 cursor-pointer"
            >
              Add Photo
            </label>
          </div>

          {/* Form Fields */}
          <div className="md:col-span-10">
            {/* First Row - 3 inputs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-lighter text-black-500">Full Name*</label>
                <input
                  type="text"
                  name="Full_name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-lighter text-black-500">Phone Number*</label>
                <input
                  type="tel"
                  name="Phone_number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91"
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-lighter text-black-500">Email Address</label>
                <input
                  type="email"
                  name="Email_address"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email Address"
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200"
                />
              </div>
            </div>

            {/* Second Row - 5 inputs */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4">
              <div>
                <label className="block text-sm font-lighter text-black-500">Age*</label>
                <input
                  type="number"
                  name="Age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Enter Age"
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-lighter text-black-500">Gender*</label>
                <div onClick={toggleDropdown} className="cursor-pointer">
                  <div className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200 bg-white flex justify-between items-center">
                    <span>{formData.gender || "Select Gender"}</span>
                    <IoIosArrowDown className="text-bold mt-1 text-black pointer-events-none" size={16} />
                  </div>
                </div>

                {isDropdownOpen && (
                  <div className="absolute mt-1 bg-white border border-[#E8E8E8] rounded p-2 w-full z-10">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="Gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleInputChange}
                        className="mr-2 appearance-none checked:bg-orange-400 checked:border-transparent rounded-full border border-gray-400 w-4 h-4 "
                      />
                      Male
                    </label>
                    <label className="flex items-center mt-1">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleInputChange}
                        className="mr-2 appearance-none checked:bg-orange-400 checked:border-transparent rounded-full border border-gray-400 w-4 h-4"
                      />
                      Female
                    </label>
                    <label className="flex items-center mt-1">
                      <input
                        type="radio"
                        name="gender"
                        value="other"
                        checked={formData.gender === 'other'}
                        onChange={handleInputChange}
                        className="mr-2 appearance-none checked:bg-orange-400 checked:border-transparent rounded-full border border-gray-400 w-4 h-4"
                      />
                      other
                    </label>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-lighter text-black-500">Wing*</label>
                <input
                  type="text"
                  name="Wing"
                  value={formData.wing}
                  onChange={handleInputChange}
                  placeholder="Enter Wing"
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-lighter text-black-500">Unit*</label>
                <input
                  type="text"
                  name="Unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  placeholder="Enter Unit"
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-lighter text-black-500">Relation*</label>
                <input
                  type="text"
                  name="Relation"
                  value={formData.relation}
                  onChange={handleInputChange}
                  placeholder="Enter Relation"
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors duration-200"
                />
              </div>
            </div>

            {/* Document Upload Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              {/* Aadhar Front */}
              <div>
                <label className="block text-sm font-lighter text-black-700 mb-2">
                  Upload Aadhar Card (Front Side)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name='Adhar_front:'
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'aadharFront')}
                    className="hidden"
                    id="aadharFrontInput"
                  />
                  <label
                    htmlFor="aadharFrontInput"
                    className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center block cursor-pointer hover:border-gray-300 transition-colors"
                  >
                    {formData.aadharFront ? (
                      <div className="text-sm text-green-600">
                        <FaCheckCircle className="mx-auto mb-2" size={20} />
                        {formData.aadharFront.name}
                      </div>
                    ) : (
                      <>
                        <FaImage className="mx-auto text-gray-400 mb-2" size={20} />
                        <p className="text-sm text-blue-500">Upload a file or drag and drop</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Aadhar Back */}
              <div>
                <label className="block text-sm font-lighter text-black-700 mb-2">
                  Upload Aadhar Card (Back Side)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name='Adhar_back'
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'aadharBack')}
                    className="hidden"
                    id="aadharBackInput"
                  />
                  <label
                    htmlFor="aadharBackInput"
                    className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center block cursor-pointer hover:border-gray-300 transition-colors"
                  >
                    {formData.aadharBack ? (
                      <div className="text-sm text-green-600">
                        <FaCheckCircle className="mx-auto mb-2" size={20} />
                        {formData.aadharBack.name}
                      </div>
                    ) : (
                      <>
                        <FaImage className="mx-auto text-gray-400 mb-2" size={20} />
                        <p className="text-sm text-blue-500">Upload a file or drag and drop</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Address Proof */}
              <div>
                <label className="block text-sm font-lighter text-black-700 mb-2">
                  Address Proof (With Bill Light Bill)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name='Address_proof'
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'addressProof')}
                    className="hidden"
                    id="addressProofInput"
                  />
                  <label
                    htmlFor="addressProofInput"
                    className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center block cursor-pointer hover:border-gray-300 transition-colors"
                  >
                    {formData.addressProof ? (
                      <div className="text-sm text-green-600">
                        <FaCheckCircle className="mx-auto mb-2" size={20} />
                        {formData.addressProof.name}
                      </div>
                    ) : (
                      <>
                        <FaImage className="mx-auto text-gray-400 mb-2" size={20} />
                        <p className="text-sm text-blue-500">Upload a file or drag and drop</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Rent Agreement */}
              <div>
                <label className="block text-sm font-lighter text-black-700 mb-2">
                  Rent Agreement
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name='Rent_Agreement'
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'rentAgreement')}
                    className="hidden"
                    id="rentAgreementInput"
                  />
                  <label
                    htmlFor="rentAgreementInput"
                    className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center block cursor-pointer hover:border-gray-300 transition-colors"
                  >
                    {formData.rentAgreement ? (
                      <div className="text-sm text-green-600">
                        <FaCheckCircle className="mx-auto mb-2" size={20} />
                        {formData.rentAgreement.name}
                      </div>
                    ) : (
                      <>
                        <FaImage className="mx-auto text-gray-400 mb-2" size={20} />
                        <p className="text-sm text-blue-500">Upload a file or drag and drop</p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      <div>
                {/* Member and Vehicle Section */}
           <div className="flex flex-col gap-6 mt-8">
              {/* Member Section */}
              <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm text-black-700 font-medium">
                    Member Counting <span className='text-gray-500'> : (Other Members)</span>
                  </label>
                  <div className="relative">
                    <select
                      className="w-32 h-10 px-3 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-black-600 focus:outline-none appearance-none bg-white cursor-pointer"
                      onChange={(e) => setMemberCount(Number(e.target.value))}
                    >
                      <option value="0">Select Member</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                    <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>

                {/* Member Form Fields */}
                {[...Array(memberCount)].map((_, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4 items-start">
                    <div>
                      <label className="block text-xs text-black-500 font-lighter mb-1">Full Name*</label>
                      <input
                        name="Full_Name"
                        type="text"
                        placeholder="Enter Full Name"
                        onChange={(e) => handleMemberChange(index, 'fullName', e.target.value)}
                        className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-black-500 font-lighter mb-1">Phone No*</label>
                      <input
                        name="Phone_number"
                        type="tel"
                        placeholder="+91"
                        onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                        className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-black-500 font-lighter mb-1">Email</label>
                      <input
                        name="Email_address"
                        type="email"
                        placeholder="Enter Email Address"
                        onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                        className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-black-500 font-lighter mb-1">Age*</label>
                      <input
                        name="Age"
                        type="number"
                        placeholder="Enter Age"
                        onChange={(e) => handleMemberChange(index, 'age', e.target.value)}
                        className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none"
                      />
                    </div>
                    <div className="relative">
                      <label className="block text-xs text-black-500 font-lighter mb-1">Gender*</label>
                      <select className="w-full h-[42px] px-4 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-gray-600 focus:outline-none appearance-none bg-white cursor-pointer"
                       onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <IoIosArrowDown className="absolute right-3 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                    <div>
                      <label className="block text-xs text-black-500 font-lighter mb-1">Relation*</label>
                      <input
                        name="Relation"
                        type="text"
                        placeholder="Enter Relation"
                        onChange={(e) => handleMemberChange(index, 'relation', e.target.value)}
                        className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Vehicle Section */}
              <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm text-black font-medium">Vehicle Counting :</label>
                  <div className="relative">
                    <select
                      className="w-32 h-10 px-3 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-black-600 focus:outline-none appearance-none bg-white cursor-pointer"
                      onChange={(e) => setVehicleCount(Number(e.target.value))}
                    >
                      <option value="0">Select Vehicle</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                    <IoIosArrowDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
                </div>

                {/* Vehicle Form Fields */}
                {[...Array(vehicleCount)].map((_, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="relative">
                      <label className="block text-xs text-black-500 font-lighter mb-1">Vehicle Type*</label>
                      <select className="w-full h-[42px] px-4 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-gray-600 focus:outline-none appearance-none bg-white cursor-pointer"
                        onChange={(e) => handleVehicleChange(index, 'vehicle type', e.target.value)}
                      >
                        <option value="">Two Wheelers</option>
                        <option value="four">Four Wheelers</option>
                      </select>
                      <IoIosArrowDown className="absolute right-3 top-[60%] -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                    <div>
                      <label className="block text-xs text-black-500 font-lighter mb-1">Vehicle Name</label>
                      <input
                        name="vehicle_name"
                        type="text"
                        placeholder="Enter Name"
                        onChange={(e) => handleVehicleChange(index, 'vehicle name', e.target.value)}
                        className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-black-500 font-lighter mb-1">Vehicle Number</label>
                      <input
                        name="vehicle_number"
                        type="text"
                        placeholder="Enter Number"
                        onChange={(e) => handleVehicleChange(index, 'vehicle number', e.target.value)}
                        className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button className="px-6 py-2 border border-gray-200 rounded-lg text-gray-700 bg-white">
                Cancel
              </button>
              <button
                className={`px-6 py-2 rounded-lg transition-colors duration-200 ${isFormValid ? 'bg-[#FF6B07] text-white hover:bg-[#FF5500]' : 'bg-[#F6F8FB] text-gray-400 cursor-not-allowed'}`}
                disabled={!isFormValid}
                onClick={handleCreate} // Call the handleCreate function on click
              >
                Create
              </button>
            </div>
      </div>
    </div>
  );
}