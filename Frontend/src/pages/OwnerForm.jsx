import React, { useState, useEffect } from 'react';
import { FaCamera, FaImage, FaUpload, FaCheckCircle } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import TenantForm from './TenantForm';
import { useNavigate } from 'react-router-dom';

export default function OwnerForm() {
  const [formData, setFormData] = useState({
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
  });
  const [activeTab, setActiveTab] = useState('owner');
  const [memberCount, setMemberCount] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);

  const [isFormValid, setIsFormValid] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

  const navigate = useNavigate();

  const handleTenantClick = () => {
    setActiveTab('tenant');
    navigate('/tenantform');
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

      // Check if all required fields are filled
      const isValid = Object.values(requiredFields).every(value => 
        value !== null && value !== undefined && value !== ''
      );

      // Additional validation for members if any are added
      const areMembersValid = memberCount === 0 || [...Array(memberCount)].every((_, index) => {
        // Add member validation logic here
        return true; // Placeholder
      });

      // Additional validation for vehicles if any are added
      const areVehiclesValid = vehicleCount === 0 || [...Array(vehicleCount)].every((_, index) => {
        // Add vehicle validation logic here
        return true; // Placeholder
      });

      setIsFormValid(isValid && areMembersValid && areVehiclesValid);
    };

    validateForm();
  }, [formData, memberCount, vehicleCount]);

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

  // Member Form Fields Component
  const MemberFormFields = () => (
    <div className="bg-white rounded-lg p-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="md:col-span-1">
          <label className="block text-xs text-gray-500">Full Name*</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-xs text-gray-500">Phone No*</label>
          <input
            type="tel"
            placeholder="+91"
            className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-xs text-gray-500">Email</label>
          <input
            type="email"
            placeholder="Enter Email Address"
            className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-xs text-gray-500">Age*</label>
          <input
            type="number"
            placeholder="Enter Age"
            className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none"
          />
        </div>
        <div className="md:col-span-1">
          <label className="block text-xs text-gray-500">Gender*</label>
          <select className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm text-[#ADADAD] focus:outline-none appearance-none bg-white">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="md:col-span-1">
          <label className="block text-xs text-gray-500">Relation*</label>
          <input
            type="text"
            placeholder="Enter Relation"
            className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );

  // Vehicle Form Fields Component
  const VehicleFormFields = () => (
    <div className="bg-white rounded-lg p-4 mt-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs text-gray-500">Vehicle Type*</label>
          <select className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm text-[#ADADAD] focus:outline-none appearance-none bg-white">
            <option value="">Two Wheelers</option>
            <option value="four">Four Wheelers</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500">Vehicle Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500">Vehicle Number</label>
          <input
            type="text"
            placeholder="Enter Number"
            className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm placeholder:text-[#ADADAD] focus:outline-none"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div >
      {/* Tab Buttons */}
      <div className="min-h-screen bg-[#F8F8F8] p-4">
      {/* Tab Buttons */}
      <div className="flex gap-1 mb-4">
        <button 
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === 'owner' 
              ? 'bg-[#FF6B07] text-white' 
              : 'bg-white text-gray-600'
          }`}
          onClick={() => setActiveTab('owner')}
        >
          Owner
        </button>
        <button 
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === 'tenant' 
              ? 'bg-[#FF6B07] text-white' 
              : 'bg-white text-gray-600'
          }`}
          onClick={handleTenantClick}
        >
          Tenant
        </button>
      </div>
      
      {/* Form Container */}
      <div className="bg-white rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Profile Photo Section */}
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="relative w-24 h-24">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePhotoChange}
                className="hidden"
                id="profilePhotoInput"
              />
              <label 
                htmlFor="profilePhotoInput"
                className="cursor-pointer w-full h-full rounded-full flex items-center justify-center overflow-hidden"
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
                  name="full_Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter Full Name"
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm 
                  placeholder:text-[#ADADAD] focus:outline-none focus:border-black 
                  focus:ring-1 focus:ring-black transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block  text-sm font-lighter text-black-500">Phone Number*</label>
                <input
                  type="tel"
                  name="phone-number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91"
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm 
                  placeholder:text-[#ADADAD] 
                  focus:outline-none 
                  focus:border-blue-500 
                  focus:ring-1 
                  focus:ring-blue-500 
                  transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-lighter text-black-500">Email Address</label>
                <input
                  type="email"
                  name="  Email_address:"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Email Address"
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm 
                  placeholder:text-[#ADADAD] 
                  focus:outline-none 
                  focus:border-[#FF6B07] 
                  focus:ring-1 
                  focus:ring-[#FF6B07] 
                  transition-colors duration-200"
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
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm 
                  placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 
                  focus:ring-black transition-colors duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-lighter text-black-500">Gender*</label>
                <select 
                  name="Gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm 
                  text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 
                  focus:ring-black transition-colors duration-200 appearance-none bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-lighter text-black-500">Wing*</label>
                <input
                  type="text"
                  name="Wing"
                  value={formData.wing}
                  onChange={handleInputChange}
                  placeholder="Enter Wing"
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm 
                  placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 
                  focus:ring-black transition-colors duration-200"
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
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm 
                  placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 
                  focus:ring-black transition-colors duration-200"
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
                  className="w-full h-10 px-3 border border-[#E8E8E8] rounded text-sm 
                  placeholder:text-[#ADADAD] focus:outline-none focus:border-black focus:ring-1 
                  focus:ring-black transition-colors duration-200"
                />
              </div>
            </div>
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
              name="Aadhar_front"
                type="file"
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

          {/* Aadhar Back - Similar structure */}
          <div>
            <label className="block text-sm font-lighter text-black-700 mb-2">
              Upload Aadhar Card (Back Side)
            </label>
            <div className="relative">
              <input
              name="Aadhar_back"
                type="file"
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

          {/* Address Proof - Similar structure */}
          <div>
            <label className="block text-sm font-lighter text-black-700 mb-2">
              Address Proof (With Bill Light Bill)
            </label>
            <div className="relative">
              <input
              name="Address_proof"
                type="file"
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

          <div>
            <label className="block text-sm font-lighter text-black-700 mb-2">
              Rent Agreement
            </label>
            <div className="relative">
              <input
              name="Rent_agreement"
                type="file"
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
        {/* Member and Vehicle Section */}
        <div className="flex flex-col gap-6 mt-8">
          {/* Member Section */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm text-black-700 font-medium">Member Counting <span className='text-gray-500'> : (Other Members)</span></label>
              <div className="relative">
                <select 
                  className="w-32 h-10 px-3 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-black-600 focus:outline-none appearance-none bg-white cursor-pointer"
                  onChange={(e) => setMemberCount(Number(e.target.value))}
                >
                  <option value="0">Select Member</option>
                  {[1,2,3,4,5].map(num => (
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
                  <label className="block text-xs text-black-500 font-lighter  mb-1">Full Name*</label>
                  <input
                  name="Full_Name"
                    type="text"
                    placeholder="Enter Full Name"
                    className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-black-500 font-lighter  mb-1">Phone No*</label>
                  <input
                  name="Phone_number"
                    type="tel"
                    placeholder="+91"
                    className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none"
                  />
                </div>
                <div>
                    <label className="block text-xs text-black-500 font-lighter  mb-1">Email</label>
                  <input
                  name="Email_address"
                    type="email"
                    placeholder="Enter Email Address"
                    className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-black-500 font-lighter  mb-1">Age*</label>
                  <input
                  name="Age"
                    type="number"
                    placeholder="Enter Age"
                    className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs text-black-500 font-lighter  mb-1">Gender*</label>
                  <select className="w-full h-[42px] px-4 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-gray-600 focus:outline-none appearance-none bg-white cursor-pointer">
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
                  {[1,2,3].map(num => (
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

                  <select className="w-full h-[42px] px-4 pr-8 border border-[#E8E8E8] rounded-[4px] text-sm text-gray-600 focus:outline-none appearance-none bg-white cursor-pointer">
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
                    className="w-full h-[42px] px-4 border border-[#E8E8E8] rounded-[4px] text-sm placeholder:text-[#ADADAD] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-black-500 font-lighter mb-1">Vehicle Number</label>
                  <input
                  name="vehicle_number"
                    type="text"
                    placeholder="Enter Number"
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
            className={`px-6 py-2 rounded-lg transition-colors duration-200 ${
              isFormValid 
                ? 'bg-[#FF6B07] text-white hover:bg-[#FF5500]' 
                : 'bg-[#F6F8FB] text-gray-400 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
          >
            Create
          </button>
        </div>
      </div>
       {/* Conditional Rendering */}
       {activeTab === 'owner' ? (
        // Owner Form Content
        <div className="bg-white rounded-lg p-6">
          {/* ... existing owner form content ... */}
        </div>
      ) : (
        // Tenant Form
        <TenantForm />
      )}
    </div>
  );
}
   
