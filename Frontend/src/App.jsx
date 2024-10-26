import React from 'react';
import { Routes, Route } from "react-router-dom"
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import OtpScreenpage from './components/auth/OtpScreenpage';
import ResetPassword from './components/auth/ResetPassword';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/otpscreenpage" element={<OtpScreenpage />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
