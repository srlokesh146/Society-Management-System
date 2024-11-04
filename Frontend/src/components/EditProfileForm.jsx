import React, { useState } from 'react';

const EditProfileForm = () => {
  // State object for all form fields
  const [formData, setFormData] = useState({
    firstName: 'Arlene',
    lastName: 'McCoy',
    phoneNumber: '+91 99130 44537',
    email: 'ArleneMcCoy25@gmail.com',
    society: 'Shantigram residency',
    country: 'India',
    state: 'Gujarat',
    city: 'Baroda',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 max-w-xl mx-auto">
      <div>
        <label className="block mb-2" htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3"
        />
      </div>
      <div>
        <label className="block mb-2" htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3"
        />
      </div>
      <div>
        <label className="block mb-2" htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3"
        />
      </div>
      <div>
        <label className="block mb-2" htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3"
        />
      </div>
      <div>
        <label className="block mb-2" htmlFor="society">Select Society</label>
        <input
          type="text"
          id="society"
          name="society"
          value={formData.society}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3"
        />
      </div>
      <div>
        <label className="block mb-2" htmlFor="country">Country</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3"
        />
      </div>
      <div>
        <label className="block mb-2" htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3"
        />
      </div>
      <div>
        <label className="block mb-2" htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3"
        />
      </div>

      <button type="submit" className="col-span-1 md:col-span-2 bg-blue-500 text-white py-2 rounded-lg">
        Save Changes
      </button>
    </form>
  );
};

export default EditProfileForm;
