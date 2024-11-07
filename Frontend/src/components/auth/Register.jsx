import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterImage from "../../assets/images/Register.png";
import BackgroundImage from "../../assets/images/bg.png";
import {
  createSociety,
  getSocieties,
  registerUser,
} from "../../services/AuthService";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Country: "",
    State: "",
    City: "",
    select_society: "",
    password: "",
    Cpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [society, setSociety] = useState({
    Society_name: "",
    Society_address: "",
    Country: "",
    State: "",
    City: "",
    ZipCode: "",
  });

  const [societyList, setSocietyList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocietyChange = (e) => {
    const { name, value } = e.target;
    setSociety({ ...society, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setFormData({
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: "",
        Country: "",
        State: "",
        City: "",
        society: "",
        password: "",
        Cpassword: "",
      });
    }
  };

  const handleSocietySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createSociety(society);
      toast.success(response.data.message);
      fetchSocieties();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setSociety({
        Society_name: "",
        Society_address: "",
        Country: "",
        State: "",
        City: "",
        ZipCode: "",
      });
    }
  };

  const handleSocietySelect = (e) => {
    const selectedValue = e.target.value;
    setFormData({ ...formData, select_society: selectedValue });
    if (selectedValue === "createNew") {
      setShowModal(true); // Show modal if "Create New Society" is selected
    }
  };

  // get all societies
  const fetchSocieties = async () => {
    setIsLoading(true);
    try {
      const response = await getSocieties();
      setSocietyList(response.data.Society || []);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to fetch societies');
      setSocietyList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSocieties();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-6">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Left Section - Branding and Illustration */}
        <div className="md:w-1/2 bg-[#F8F9FC] flex flex-col items-start p-12">
          <h2 className="text-4xl font-bold text-black mb-16">
            <span className="text-[#FE512E]">Dash</span>Stack
          </h2>
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="text-center mb-8">
              <img src={RegisterImage} alt="Society" className="w-full max-w-md mx-auto" />
              
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 p-12">
          <h2 className="text-2xl font-semibold mb-8">Registration</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                <input
                  type="text"
                  name="FirstName"
                  value={formData.FirstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                  placeholder="Enter First Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                <input
                  type="text"
                  name="LastName"
                  value={formData.LastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                  placeholder="Enter Last Name"
                  required
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                  placeholder="Enter Email Address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <input
                  type="tel"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                  placeholder="91+"
                  required
                />
              </div>
            </div>

            {/* Country, State, City */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country*</label>
                <input
                  type="text"
                  name="Country"
                  value={formData.Country}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State*</label>
                <input
                  type="text"
                  name="State"
                  value={formData.State}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City*</label>
                <input
                  type="text"
                  name="City"
                  value={formData.City}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                  placeholder="Enter Name"
                  required
                />
              </div>
            </div>

            {/* Society Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Society*</label>
              <select
                name="select_society"
                value={formData.select_society}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                required
              >
                <option value="">Select Society</option>
                {societyList?.map(({ _id, Society_name }) => (
                  <option key={_id} value={_id}>{Society_name}</option>
                ))}
                <option value="createNew">Create New Society</option>
              </select>
            </div>

            {/* Password Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                  placeholder="Enter Password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
              <input
                type={showPassword ? "text" : "password"}
                name="Cpassword"
                value={formData.Cpassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FE512E]"
                placeholder="Enter Confirm Password"
                required
              />
            </div>

            {/* Terms and Register Button */}
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" required className="w-4 h-4 text-[#FE512E] border-gray-300 rounded focus:ring-[#FE512E]" />
                <span className="ml-2 text-sm text-gray-600">
                  I agree to all the <Link className="text-[#FE512E]">Terms</Link> and <Link className="text-[#FE512E]">Privacy Policies</Link>.
                </span>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FE512E] text-white py-2.5 rounded-lg font-medium hover:bg-[#F09619] transition-colors duration-200"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-[#FE512E] hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
