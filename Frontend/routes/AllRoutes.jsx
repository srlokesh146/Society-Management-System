import React from 'react';

import { Route, Routes } from 'react-router-dom';
import ForgotPassword from '../src/component/auth/ForgotPassword';
import OtpScreenpage from '../src/component/auth/OtpScreenpage';
import ResetPassword from '../src/component/auth/ResetPassword';

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/otpscreenpage" element={<OtpScreenpage />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
    </Routes>
  );
}
