import React, { useState } from 'react';
import { FaEllipsisV, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const initialMaintenanceData = [
  {
    id: 1,
    name: "Cody Fisher",
    avatar: "/avatars/cody.jpg",
    unitNumber: "A 1001",
    date: "10/02/2024",
    userType: "Tenant",
    phoneNumber: "92524 34522",
    amount: "₹ 1000",
    penalty: "--",
    status: "Pending",
    payment: "Online"
  },
  {
    id: 2,
    name: "Esther Howard",
    avatar: "/avatars/esther.jpg",
    unitNumber: "B 1002",
    date: "11/02/2024",
    userType: "Owner",
    phoneNumber: "92524 12365",
    amount: "₹ 1000",
    penalty: "250",
    status: "Done",
    payment: "Cash"
  },
  // ... add more data
];

function Income() {
  const [activeTab, setActiveTab] = useState('Maintenance');
  const [maintenanceAmount, setMaintenanceAmount] = useState(0);
  const [penaltyAmount, setPenaltyAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [maintenanceDetails, setMaintenanceDetails] = useState({
    maintenanceAmount: '',
    penaltyAmount: '',
    dueDate: '',
    penaltyAfterDays: ''
  });
  const [showCreateOtherIncomeModal, setShowCreateOtherIncomeModal] = useState(false);
  const [otherIncomeDetails, setOtherIncomeDetails] = useState({
    title: '',
    amountPerMember: '',
    totalMember: '',
    date: '',
    dueDate: '',
    description: ''
  });
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-50 text-yellow-600';
      case 'Done': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getPaymentBadge = (payment) => {
    return payment === 'Online' 
      ? 'bg-blue-50 text-blue-600'
      : 'bg-gray-50 text-gray-600';
  };

  const handleSetMaintenance = () => {
    setShowModal(true);
  };

  const handleContinue = () => {
    if (password) {
      setShowModal(false);
      setShowMaintenanceModal(true);
      setPassword('');
    }
  };

  const handleMaintenanceChange = (e) => {
    const { name, value } = e.target;
    setMaintenanceDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMaintenanceSubmit = () => {
    console.log('Maintenance Details:', maintenanceDetails);
    setShowMaintenanceModal(false);
    setMaintenanceDetails({
      maintenanceAmount: '',
      penaltyAmount: '',
      dueDate: '',
      penaltyAfterDays: ''
    });
  };

  // Add this helper function to check if form is filled
  const isFormFilled = () => {
    return (
      maintenanceDetails.maintenanceAmount &&
      maintenanceDetails.penaltyAmount &&
      maintenanceDetails.dueDate &&
      maintenanceDetails.penaltyAfterDays
    );
  };

  const handleOtherIncomeChange = (e) => {
    const { name, value } = e.target;
    setOtherIncomeDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOtherIncomeSubmit = () => {
    console.log('Other Income Details:', otherIncomeDetails);
    setShowCreateOtherIncomeModal(false);
    setOtherIncomeDetails({
      title: '',
      amountPerMember: '',
      totalMember: '',
      date: '',
      dueDate: '',
      description: ''
    });
  };

  const handleOtherIncomeClick = () => {
    setActiveTab('Other Income');
    navigate('/other-income');
  };

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const ViewDetailsModal = ({ user, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[400px]">
        {/* Title Header */}
        <div className="flex justify-between items-center p-3 border-b">
          <h3 className="text-[16px] font-bold">View Maintenance Details</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 p-4">
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">Feb 10, 2024</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-4 gap-4 px-4">
          {/* Wing */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Wing</span>
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {user.unitNumber.split(' ')[0]}
            </span>
          </div>

          {/* Unit */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Unit</span>
            <span className="text-sm font-medium">
              {user.unitNumber.split(' ')[1]}
            </span>
          </div>

          {/* Status */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Status</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              user.userType === 'Owner' ? 'bg-purple-50 text-purple-600' : 'bg-pink-50 text-pink-600'
            }`}>
              {user.userType}
            </span>
          </div>

          {/* Amount */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Amount</span>
            <span className="text-sm font-medium text-green-600">{user.amount}</span>
          </div>
        </div>

        {/* Bottom Status Row */}
        <div className="grid grid-cols-3 gap-4 p-4 mt-2">
          {/* Penalty */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Penalty</span>
            <span className={`text-sm font-medium ${
              user.penalty === '--' ? 'text-gray-400' : 'text-red-500'
            }`}>
              {user.penalty}
            </span>
          </div>

          {/* Status */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Status</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              user.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'
            }`}>
              {user.status}
            </span>
          </div>

          {/* Payment */}
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Payment</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              user.payment === 'Online' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
            }`}>
              {user.payment}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-4">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header Section */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-6">
              <div className="relative px-4 py-2.5 bg-white rounded-lg border-l-4 border border-green-500 border-l-green-500">
                <p className="text-sm text-black-500">Maintenance Amount</p>
                <div className="flex items-center gap-1">
                  <span className="text-green-600 font-bold  text-sm">₹</span>
                  <p className="text-lg font-medium text-green-600">{maintenanceAmount}</p>
                </div>
              </div>
              <div className="relative px-4 py-2.5 bg-white rounded-lg border-l-4 border border-red-500 border-l-red-500">
                <p className="text-sm text-black-500">Penalty Amount</p>
                <div className="flex items-center gap-1">
                  <span className="text-[#FF4242] font-bold text-sm">₹</span>
                  <p className="text-lg font-medium text-[#FF4242]">{penaltyAmount}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={handleSetMaintenance}
              className="bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-6 py-2.5 rounded-lg hover:opacity-90 font-medium"
            >
              Set Maintenance
            </button>
          </div>

          {/* Tabs Section */}
          <div className="flex gap-4 bg-[#F8F9FC] p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('Maintenance')}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === 'Maintenance'
                  ? 'bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] font-bold text-white'
                  : 'text-black-600'
              }`}
            >
              Maintenance
            </button>
            <button
              onClick={handleOtherIncomeClick}
              className={`px-6 py-2 rounded-lg transition-all ${
                activeTab === 'Other Income'
                  ? 'bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] font-bold text-white'
                  : 'text-black-600'
              }`}
            >
              Other Income
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Maintenance Details</h2>
          <div className="overflow-x-auto  rounded-lg">
            <table className="w-full ">
              <thead>
                <tr className="bg-indigo-50 rounded-lg">
                  <th className="text-left px-20 py-4 text-md font-bold text-black-600">Name</th>
                  <th className="text-left px-2 py-4 text-md font-bold text-black-600">Unit Number</th>
                  <th className="text-left px-9 py-4 text-md font-bold text-black-600">Date</th>
                  <th className="text-left px-6 py-4 text-md font-bold text-black-600">Status</th>
                  <th className="text-left px-2 py-4 text-md font-bold text-black-600">Phone Number</th>
                  <th className="text-left px-4 py-4 text-md font-bold text-black-600">Amount</th>
                  <th className="text-left px-6 py-4 text-md font-bold text-black-600">Penalty</th>
                  <th className="text-left px-6 py-4 text-md font-bold text-black-600">Status</th>
                  <th className="text-left px-6 py-4 text-md font-bold text-black-600">Payment</th>
                  <th className="text-left px-4 py-4 text-md font-bold text-black-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {initialMaintenanceData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-16 py-4">
                      <div className="flex items-center gap-3">
                      
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium bg-blue-50 px-1 py-0 rounded-md text-blue-600">{item.unitNumber.split(' ')[0]}</span>
                        <span className="text-sm text-gray-600">{item.unitNumber.split(' ')[1]}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs
                        ${item.userType === 'Tenant' ? 'bg-pink-50 text-pink-600' : 'bg-indigo-50 text-indigo-600'}`}>
                        {item.userType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.phoneNumber}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-green-600">{item.amount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${item.penalty === '--' ? 'text-gray-400' : 'text-red-500'}`}>
                        {item.penalty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs
                        ${item.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs
                        ${item.payment === 'Online' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.payment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        className="p-1.5 bg-indigo-50 rounded-full hover:bg-indigo-100"
                        onClick={() => handleViewClick(item)}
                      >
                        <FaEye className="text-indigo-600" size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px]">
            <h3 className="text-lg font-bold mb-4">Set Maintenance</h3>
            
            <div className="relative mb-4">
              <label className="block text-sm font-semi text-black-600 mb-1">Password*</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setPassword('');
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="px-4 py-2 bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white rounded-lg hover:opacity-90"
                disabled={!password}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {showMaintenanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[400px] relative min-h-[450px]">
            <h3 className="text-lg font-bold mb-4">Add Maintenance Detail</h3>
            
            <div className="space-y-4 mb-20">
              {/* Maintenance and Penalty Amount Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Maintenance Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maintenance Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="maintenanceAmount"
                      value={maintenanceDetails.maintenanceAmount}
                      onChange={handleMaintenanceChange}
                      className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none bg-[#F6F8FB]"
                      placeholder="0000"
                    />
                  </div>
                </div>

                {/* Penalty Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Penalty Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="penaltyAmount"
                      value={maintenanceDetails.penaltyAmount}
                      onChange={handleMaintenanceChange}
                      className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none bg-[#F6F8FB]"
                      placeholder="0000"
                    />
                  </div>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maintenance Due Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={maintenanceDetails.dueDate}
                  onChange={handleMaintenanceChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none bg-[#F6F8FB]"
                />
              </div>

              {/* Penalty Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Penalty Applied After Day Selection
                </label>
                <select
                  name="penaltyAfterDays"
                  value={maintenanceDetails.penaltyAfterDays}
                  onChange={handleMaintenanceChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none bg-[#F6F8FB]"
                >
                  <option value="">Select Days</option>
                  <option value="5">5 Days</option>
                  <option value="10">10 Days</option>
                  <option value="15">15 Days</option>
                  <option value="30">30 Days</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 absolute bottom-6 right-6 left-6">
              <button
                onClick={() => setShowMaintenanceModal(false)}
                className="flex-1 py-3 text-gray-600 bg-[#F6F8FB] rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleMaintenanceSubmit}
                disabled={!isFormFilled()}
                className={`flex-1 py-3 rounded-lg transition-all ${
                  isFormFilled()
                    ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90'
                    : 'bg-[#F6F8FB] text-gray-600 hover:bg-gray-100'
                }`}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {showCreateOtherIncomeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h3 className="text-lg font-bold mb-6">Create Other Income</h3>
            
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={otherIncomeDetails.title}
                  onChange={handleOtherIncomeChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none bg-[#F6F8FB]"
                  placeholder="Enter title"
                />
              </div>

              {/* Amount and Members Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount Per Member
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      name="amountPerMember"
                      value={otherIncomeDetails.amountPerMember}
                      onChange={handleOtherIncomeChange}
                      className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none bg-[#F6F8FB]"
                      placeholder="0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Member
                  </label>
                  <input
                    type="number"
                    name="totalMember"
                    value={otherIncomeDetails.totalMember}
                    onChange={handleOtherIncomeChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none bg-[#F6F8FB]"
                    placeholder="Enter total members"
                  />
                </div>
              </div>

              {/* Dates Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={otherIncomeDetails.date}
                    onChange={handleOtherIncomeChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none bg-[#F6F8FB]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={otherIncomeDetails.dueDate}
                    onChange={handleOtherIncomeChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none bg-[#F6F8FB]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={otherIncomeDetails.description}
                  onChange={handleOtherIncomeChange}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none bg-[#F6F8FB]"
                  placeholder="Enter description"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowCreateOtherIncomeModal(false)}
                className="px-6 py-2.5 text-gray-600 bg-[#F6F8FB] rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleOtherIncomeSubmit}
                className="px-6 py-2.5 bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white rounded-lg hover:opacity-90"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {showViewModal && (
        <ViewDetailsModal 
          user={selectedUser} 
          onClose={() => setShowViewModal(false)} 
        />
      )}
    </div>
  );
}

export default Income; 