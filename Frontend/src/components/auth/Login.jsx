import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/images/login.png"; // Importing the login image
import BackgroundImage from "../../assets/images/bg.png"; // Importing the background image
import { loginUser } from "../../services/AuthService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { StoreUser } from "../../redux/features/AuthSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    EmailOrPhone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const [errors, setErrors] = useState({
    EmailOrPhone: "",
    password: "",
  });

  const [submitted, setSubmitted] = useState(false); // Track submission attempts

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitted(true); // Set submitted to true on form submission

    let formIsValid = true;
    let newErrors = { ...errors };
    if (!user.EmailOrPhone) {
      newErrors.EmailOrPhone = "Please enter your email or phone number";
      formIsValid = false;
    }
    if (!user.password) {
      newErrors.password = "Please enter your password";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (!formIsValid) return;

    try {
      const response = await loginUser(user);
      toast.success(response.data.message);
      dispatch(StoreUser(response.data.user));
      if (response.data.user.role === "admin") {
        navigate("/dashboard");
      } else if (response.data.user.role === "security") {
        navigate("/visitortracking");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setUser({
        EmailOrPhone: "",
        password: "",
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="flex flex-col md:flex-row items-center justify-center bg-cover bg-center overflow-auto"
      style={{ backgroundImage: `url(${BackgroundImage})` }} // Background image
    >
      {/* Left Section (Image and Title) */}
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 lg:w-1/2 z-10 w-full flex flex-col items-left h-auto md:h-[950px] relative overflow-hidden">
        {/* Decorative Background Section */}
        <div className="absolute inset-0 opacity-10 rounded-lg"></div>

        {/* Title Section */}
        <h1 className="text-5xl mt-20 font-bold mr-96 text-gray-700 z-10 mb-4">
          <span className="text-[#FE512E]">Dash</span>Stack
        </h1>

        {/* Image Section */}
        <div className="flex-grow flex items-center justify-center w-full">
          <img
            src={LoginImage}
            alt="Society Management Illustration"
            className="w-full h-auto max-w-[600px] object-contain z-10" // Set responsive width and auto height
          />
        </div>
      </div>

      {/* Right Section (Login Form) */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-[530px]">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email or Phone Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email or Phone
              </label>
              <input
                type="text"
                id="email"
                name="EmailOrPhone"
                value={user.EmailOrPhone}
                onChange={handleChange}
                placeholder="Enter Your Phone Number or Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {submitted &&
                errors.EmailOrPhone && ( // Show error if submitted
                  <p className="text-red-500 text-sm mt-1">
                    {errors.EmailOrPhone}
                  </p>
                )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {submitted &&
                errors.password && ( // Show error if submitted
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
              <Link
                to="/forgotpassword"
                className="text-orange-500 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white py-3 rounded-lg font-medium "
            >
              Sign In
            </button>

            {/* Register Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-orange-500 hover:underline"
                >
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
