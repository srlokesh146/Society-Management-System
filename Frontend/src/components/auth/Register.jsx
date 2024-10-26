import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import RegisterImage from '../../assets/images/Register.png';
import BackgroundImage from '../../assets/images/bg.png';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    password: '',
    confirmPassword: '',
    society: '',
    role: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newSociety, setNewSociety] = useState('');
  const [societyAddress, setSocietyAddress] = useState('');
  const [societyCountry, setSocietyCountry] = useState('');
  const [societyState, setSocietyState] = useState('');
  const [societyCity, setSocietyCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  const handleSocietySubmit = (e) => {
    e.preventDefault();
    console.log('New Society:', newSociety, societyAddress, societyCountry, societyState, societyCity, zipCode);
    setShowModal(false);
    // Reset fields
    setNewSociety('');
    setSocietyAddress('');
    setSocietyCountry('');
    setSocietyState('');
    setSocietyCity('');
    setZipCode('');
  };

  const handleSocietySelect = (e) => {
    const selectedValue = e.target.value;
    setFormData({ ...formData, society: selectedValue });
    if (selectedValue === 'createNew') {
      setShowModal(true); // Show modal if "Create New Society" is selected
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-gray-50 p-4" 
      style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section - Branding and Illustration */}
        <div className="md:w-1/2 bg-gray-100 flex flex-col items-start justify-center p-10">
          <h2 className="text-5xl font-bold text-black mb-20 mt-4">
            <span className="text-[#FE512E]">Dash</span>Stack
          </h2>
          <div className="w-full h-80 flex items-center justify-center mb-10">
            <img
              src={RegisterImage}
              alt="Society Illustration"
              className="object-contain h-full w-auto"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 p-10">
          <h2 className="text-3xl font-semibold text-center mb-6">Registration</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                required
              />
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="91+"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                required
              />
            </div>

            {/* Country, State, City */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <input
                type="text"
                name="country"
                placeholder="Enter Country"
                value={formData.country}
                onChange={handleChange}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="Enter State"
                value={formData.state}
                onChange={handleChange}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="Enter City"
                value={formData.city}
                onChange={handleChange}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                required
              />
            </div>

            {/* Society Dropdown with Create Button */}
            <div className="space-y-2">
              <select
                name="society"
                value={formData.society}
                onChange={handleSocietySelect} // Updated to use the new function
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FE512E] w-full"
                required
              >
                <option value="">Select Society</option>
                <option value="society1">Society 1</option>
                <option value="society2">Society 2</option>
                <option value="society3">Society 3</option>
                <option value="createNew">Create New Society</option>
              </select>
            </div>

          
            {/* Password Fields */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FE512E] w-full"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-600"
              >
                👁️
              </button>
            </div>

            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FE512E] w-full"
              required
            />

            {/* Terms and Submit Button */}
            <div className="flex items-center">
              <input type="checkbox" required className="mr-2" />
              <p className="text-sm">
                I agree to all the <a href="#" className="text-[#FE512E]">Terms</a> and{' '}
                <a href="#" className="text-[#FE512E]">Privacy Policies</a>.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FE512E] text-white py-3 rounded-lg font-bold hover:bg-[#F09619] transition"
            >
              Register
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FE512E] hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Modal Popup for Create Society */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create Society</h3>
            <form onSubmit={handleSocietySubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Society Name"
                value={newSociety}
                onChange={(e) => setNewSociety(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FE512E] transition-all duration-200"
                required
              />
              <input
                type="text"
                placeholder="Society Address"
                value={societyAddress}
                onChange={(e) => setSocietyAddress(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FE512E] transition-all duration-200"
                required
              />
              <input
                type="text"
                placeholder="Country"
                value={societyCountry}
                onChange={(e) => setSocietyCountry(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FE512E] transition-all duration-200"
                required
              />
              <input
                type="text"
                placeholder="State"
                value={societyState}
                onChange={(e) => setSocietyState(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FE512E] transition-all duration-200"
                required
              />
              <input
                type="text"
                placeholder="City"
                value={societyCity}
                onChange={(e) => setSocietyCity(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FE512E] transition-all duration-200"
                required
              />
              <input
                type="text"
                placeholder="Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#FE512E] transition-all duration-200"
                required
              />

              {/* Buttons for Save and Cancel */}
              <div className="flex justify-between space-x-2 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-[#FE512E] text-white py-2 rounded-lg font-bold transition-transform transform hover:scale-105 hover:bg-[#F09619] focus:outline-none focus:ring-2 focus:ring-[#F09619] focus:ring-opacity-50"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)} // Close the modal
                  className="flex-1 bg-gray-300 text-black py-2 rounded-lg font-bold transition-transform transform hover:scale-105 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
