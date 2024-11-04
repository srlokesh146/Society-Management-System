<<<<<<< Updated upstream
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import OtpScreenpage from "./components/auth/OtpScreenpage";
import ResetPassword from "./components/auth/ResetPassword";
import { Toaster } from "react-hot-toast";

=======
import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import OtpScreenpage from './components/auth/OtpScreenpage';
import ResetPassword from './components/auth/ResetPassword';
import ComplaintTable from './pages/ComplaintTable';
import ReqTracking from './pages/ReqTracking';
import VisitorLog from './pages/VisitorLog';
import SecurityProtocols from './pages/SecurityProtocols';
import SecurityGuard from './pages/SecurityGuard';
import Announcement from './pages/Annousenment';
>>>>>>> Stashed changes
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/otpscreenpage" element={<OtpScreenpage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/ComplaintTable" element={<ComplaintTable />} />
        <Route path="/ReqTracking" element={<ReqTracking />} />
        <Route path="/VisitorLog" element={<VisitorLog />} />
        <Route path="/SecurityProtocols" element={<SecurityProtocols />} />
        <Route path="/SecurityGuard" element={<SecurityGuard />} />
        <Route path="/Announcement" element={<Announcement />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
