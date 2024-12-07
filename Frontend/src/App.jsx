import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgotPassword from './components/auth/ForgotPassword'
import OtpScreenpage from './components/auth/OtpScreenpage'
import ResetPassword from './components/auth/ResetPassword'
import ComplaintTable from './pages/ComplaintTable'
import ReqTracking from './pages/ReqTracking'
import VisitorLog from './pages/VisitorLog'
import SecurityProtocols from './pages/SecurityProtocols'
import './App.css'
import Residentmanagement from './pages/Residentmanagement'
import Dashboard from './pages/Dashboard/Dashboard'
import Navbar from './components/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import EditProfileForm from './components/EditProfileForm'
import SecurityGuardDetails from './pages/SecurityGuardDetails.jsx'
import Announcement from './pages/Announcement.jsx'
import Facilitymanagement from './pages/Facilitymanagement.jsx'
import Note from './pages/Note.jsx'
import Expense from './pages/Expense.jsx'
import Income from './pages/Income'
import OtherIncome from './pages/OtherIncome'
import ResidentManagement from './pages/Residentmanagement'
import TenantForm from './pages/TenantForm.jsx'
import OwnerForm from './pages/OwnerForm.jsx'
import VisitorTracking from './pages/securitypage/VisitorTracking.jsx'
import EmergencyManagement from './pages/securitypage/EmergencyManagement.jsx'
import PrivateRoutes from './routes/PrivateRoutes.jsx'
import EventsParticipate from './pages/residentpanel/EventsParticipation/Activityparticipate.jsx'
import ActivityParticipate from './pages/residentpanel/EventsParticipation/Activityparticipate.jsx'
import Eventtab from './pages/residentpanel/EventsParticipation/EventTab/Eventtab.jsx'
import ResidentOwner from './pages/ResidentPanel/ResidentOwner.jsx'
import ServiceAndComplaint from './pages/ResidentPanel/ServiceAndComplaint.jsx'
import ResidentSecurityProtocol from './pages/ResidentPanel/ResidentSecurityProtocol.jsx'
import Maintenceinvoices from './pages/ResidentPanel/Maintenceinvoices.jsx'
import InvoicesPage from './pages/ResidentPanel/InvoicesPage.jsx'
import OtherIncomeInvoices from './pages/ResidentPanel/OtherIncomeInvoices.jsx'
import AccessForums from './pages/residentpanel/Community/AccessForums.jsx'
import Polls from './pages/residentpanel/Community/OwnPolls.jsx'
import CommunityTab from './pages/residentpanel/Community/communitytab/CommunityTab.jsx'
import Discusion from './pages/ResidentPanel/Community/communitytab/Discusion.jsx'
import ViewIncome from './components/modal/AdminIncome.jsx'
import AdminIncome from './components/modal/AdminIncome.jsx'
import { io } from 'socket.io-client'
import Constant from './config/Constant.jsx'
import OtherInvoices from './pages/ResidentPanel/OtherInvoices.jsx'
import AdminRoutes from './routes/AdminRoutes.jsx'
import QuestionPage from './pages/ResidentPanel/QuestionPage.jsx'

function App () {
  const [isSidebaropen, setSidebaropen] = useState(false)
  const location = useLocation()

  // List of routes without sidebar and navbar
  const layoutRoutes = [
    '/',
    '/register',
    '/forgotpassword',
    '/otpscreenpage',
    '/resetpassword'
  ]
  const shouldRenderSidebarAndNavbar = !layoutRoutes.includes(location.pathname)

  const toggleSidebar = () => {
    setSidebaropen(prevState => !prevState)
  }

  const closeSidebar = () => {
    setSidebaropen(false)
  }

  return (
    <div className='h-screen flex overflow-hidden bg-gray-100'>
      {shouldRenderSidebarAndNavbar && (
        <PrivateRoutes>
          <Sidebar isopen={isSidebaropen} onclose={closeSidebar} />
        </PrivateRoutes>
      )}

      <div
        className={`flex-1 flex flex-col transition-all duration-300 main ${
          isSidebaropen && shouldRenderSidebarAndNavbar ? 'ml-[280px]' : 'ml-0'
        }`}
      >
        {shouldRenderSidebarAndNavbar && (
          <PrivateRoutes>
            <Navbar toggleSidebar={toggleSidebar} />
          </PrivateRoutes>
        )}

        <div
          className={`flex-1 ${
            location.pathname === '/dashboard'
              ? 'overflow-hidden max-md:overflow-auto max-lg:overflow-auto max-xl:overflow-auto max-2xl:overflow-auto max-3xl:overflow-y-auto max-2xl:mt-[0] p-6 custom-scrollbar'
              : location.pathname === '/accessforums'
              ? 'overflow-auto overflow-y-hidden'
              : location.pathname === '/editprofile'
              ? 'overflow-hidden max-sm:overflow-y-auto custom-scrollbar'
              : location.pathname === '/visitorlog'
              ? 'overflow-hidden p-6'
              : location.pathname === '/communitiesdiscusion'
              ? 'overflow-hidden p-6'
              : shouldRenderSidebarAndNavbar
              ? 'p-6 max-sm:p-4 overflow-auto'
              : 'lg:overflow-hidden max-md:overflow-auto max-lg:overflow-auto max-xl:overflow-y-auto custom-scrollbar'
          } bg-[#F0F5FB]`}
        >
          <Routes>
            {/* Public Routes without Sidebar and Navbar */}
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/otpscreenpage' element={<OtpScreenpage />} />
            <Route path='/resetpassword' element={<ResetPassword />} />

            {/* Protected Routes with Sidebar and Navbar */}
            {shouldRenderSidebarAndNavbar && (
              <>
                <Route
                  path='/dashboard'
                  element={
                    <PrivateRoutes>
                      <Dashboard />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/editprofile'
                  element={
                    <PrivateRoutes>
                      <AdminRoutes>
                        <EditProfileForm />
                      </AdminRoutes>
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/residentmanagement'
                  element={<Residentmanagement />}
                />
                <Route
                  path='/complainttable'
                  element={
                    <PrivateRoutes>
                      <ComplaintTable />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/reqtracking'
                  element={
                    <PrivateRoutes>
                      <ReqTracking />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/visitorlog'
                  element={
                    <PrivateRoutes>
                      <VisitorLog />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/SecurityProtocols'
                  element={
                    <PrivateRoutes>
                      <SecurityProtocols />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/securityguard'
                  element={
                    <PrivateRoutes>
                      <SecurityGuardDetails />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/announcement'
                  element={
                    <PrivateRoutes>
                      <Announcement />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/facilitymanagement'
                  element={
                    <PrivateRoutes>
                      <Facilitymanagement />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/note'
                  element={
                    <PrivateRoutes>
                      <Note />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/expense'
                  element={
                    <PrivateRoutes>
                      <Expense />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/income'
                  element={
                    <PrivateRoutes>
                      <Income />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/other-income'
                  element={
                    <PrivateRoutes>
                      <OtherIncome />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/ownerform'
                  element={
                    <PrivateRoutes>
                      <OwnerForm />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/ownerform/edit'
                  element={
                    <PrivateRoutes>
                      <OwnerForm />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/tenantform'
                  element={
                    <PrivateRoutes>
                      <TenantForm />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/tenantform/edit'
                  element={
                    <PrivateRoutes>
                      <TenantForm />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/residentmanagement'
                  element={
                    <PrivateRoutes>
                      <ResidentManagement />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/visitortracking'
                  element={
                    <PrivateRoutes>
                      <VisitorTracking />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/emergencymanagement'
                  element={
                    <PrivateRoutes>
                      <EmergencyManagement />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/eventsParticipate'
                  element={
                    <PrivateRoutes>
                      <Eventtab />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/residentowner'
                  element={
                    <PrivateRoutes>
                      <ResidentOwner />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/serviceandcomplaint'
                  element={
                    <PrivateRoutes>
                      <ServiceAndComplaint />
                    </PrivateRoutes>
                  }
                />

                <Route
                  path='/residentsecurityprotocol'
                  element={
                    <PrivateRoutes>
                      <ResidentSecurityProtocol />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/maintenceinvoices'
                  element={
                    <PrivateRoutes>
                      <Maintenceinvoices />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/accessforums'
                  element={
                    <PrivateRoutes>
                      <AccessForums />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/invoicespage'
                  element={
                    <PrivateRoutes>
                      <InvoicesPage />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/otherinvoices'
                  element={
                    <PrivateRoutes>
                      <OtherInvoices />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/otherincomeinvoices'
                  element={
                    <PrivateRoutes>
                      <OtherIncomeInvoices />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/polls'
                  element={
                    <PrivateRoutes>
                      <CommunityTab />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/communitiesdiscusion'
                  element={
                    <PrivateRoutes>
                      <Discusion />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/adminincome/:id'
                  element={
                    <PrivateRoutes>
                      <AdminIncome />
                    </PrivateRoutes>
                  }
                />
                <Route
                  path='/questionpage/:id'
                  element={
                    <PrivateRoutes>
                      <QuestionPage />
                    </PrivateRoutes>
                  }
                />
              </>
            )}
          </Routes>
        </div>
      </div>
      <Toaster position='top-right' reverseOrder={false} />
    </div>
  )
}

export default App
