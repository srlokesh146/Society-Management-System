import React from 'react';
import { Link } from 'react-router-dom';
import LoginImage from '../assets/login.png'; // Importing the login image
import BackgroundImage from '../assets/bg.png'; // Importing the background image

const Login = () => {
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }} // Background image
    >
      {/* Left Section (Image and Title) */}
      <div className="bg-gray-100 rounded-lg shadow-lg p-8 max-w-[900px] w-full flex flex-col items-center h-auto md:h-[950px] relative overflow-hidden">
        {/* Decorative Background Section */}
        <div className="absolute inset-0 opacity-10 rounded-lg"></div>

        {/* Title Section */}
        <h1 className="text-6xl mt-20 font-bold mr-96 text-gray-700 z-10 mb-4">
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
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
          <form className="space-y-4">
            {/* Email or Phone Input */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email or Phone
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter Your Phone Number or Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
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
              <a href="#" className="text-orange-500 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              Sign In
            </button>

            {/* Register Link */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Don’t have an account?{' '}
                <Link to="/register" className="text-orange-500 hover:underline">
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
