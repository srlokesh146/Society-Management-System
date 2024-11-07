import React, { useState } from 'react';
import { Routes, Route, useLocation } from "react-router-dom"
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import OtpScreenpage from './components/auth/OtpScreenpage';
import ResetPassword from './components/auth/ResetPassword';
import ComplaintTable from './pages/ComplaintTable';
import ReqTracking from './pages/ReqTracking';
import VisitorLog from './pages/VisitorLog';
import SecurityProtocols from './pages/SecurityProtocols';


import { Toaster } from 'react-hot-toast';
import Residentmanagement from './pages/Residentmanagement';

import Dashboard from './pages/Dashboard/Dashboard';
import FinancialManagement from './pages/FinancialManagement';
import Navbar from './components/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import EditProfileForm from './components/EditProfileForm';
import SecurityGuardDetails from './pages/SecurityGuardDetails.jsx';
import Announcement from './pages/Announcement.jsx';
import Facilitymanagement from './pages/Facilitymanagement.jsx';
import Note from './pages/Note.jsx';
import Expense from './pages/Expense.jsx';
import Income from './pages/Income.jsx';
import OtherIncome from './pages/OtherIncome.jsx';






function App() {

  const [isSidebaropen, setSidebaropen] = useState(false);
  const location = useLocation();

  // List of routes without sidebar and navbar
  const layoutRoutes = ["/login", "/register", "/forgotpassword", "/otpscreenpage", "/resetpassword"];
  const shouldRenderSidebarAndNavbar = !layoutRoutes.includes(location.pathname);

  const toggleSidebar = () => {
    setSidebaropen(prevState => !prevState);
  };

  const closeSidebar = () => {
    setSidebaropen(false);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />

      {/* Render Sidebar only if shouldRenderSidebarAndNavbar is true */}
      {shouldRenderSidebarAndNavbar && (
        <Sidebar isopen={isSidebaropen} onclose={closeSidebar} />
      )}

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebaropen && shouldRenderSidebarAndNavbar ? 'ml-[280px]' : 'ml-0'}`}>
        
        {/* Render Navbar only if shouldRenderSidebarAndNavbar is true */}
        {shouldRenderSidebarAndNavbar && <Navbar toggleSidebar={toggleSidebar} />}
        
        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <Routes>
            {/* Public Routes without Sidebar and Navbar */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/otpscreenpage" element={<OtpScreenpage />} />
            <Route path="/resetpassword" element={<ResetPassword />} />

            {/* Protected Routes with Sidebar and Navbar */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/residentmanagement" element={<Residentmanagement />} />
            <Route path="/complainttable" element={<ComplaintTable />} />
          
            <Route path="/reqtracking" element={<ReqTracking />} />
            <Route path="/visitorlog" element={<VisitorLog />} />
            <Route path="/securityprotocols" element={<SecurityProtocols />} />
            <Route path="/securityguard" element={<SecurityGuardDetails />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/editprofile" element={<EditProfileForm />} />
            <Route path="/facilitymanagement" element={<Facilitymanagement />} />
            <Route path="/note" element={<Note />} />
            <Route path="/expense" element={<Expense/>} />
            <Route path="/income" element={<Income/>} />
            <Route path="/other-income" element={<OtherIncome/>} />

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
