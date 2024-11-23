import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdSecurity } from "react-icons/md";
import { BsClockFill } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import { BsBank } from "react-icons/bs";
import { BiMoney } from "react-icons/bi";
import { toast } from "react-hot-toast";
import ownerImage from "../assets/images/owner.png";
import verify from "../assets/images/verify.png";
import eye from "../assets/images/eye.svg";
import moneys from "../assets/images/moneys.svg";
import wallet from "../assets/images/wallet.png";
import {
  ConfirmPassword,
  CreateMaintenance,
  GetMaintenances,
} from "../services/maintenanceService";
import { cardData, data } from "../constantdata";

const maintenanceData = [
  {
    id: 1,
    name: "Cody Fisher",
    unitNumber: "A 1001",
    date: "10/02/2024",
    status: "Tenant",
    phoneNumber: "92524 34522",
    amount: "1000",
    penalty: "--",
    paymentStatus: "Pending",
    payment: "Online",
  },
  {
    id: 2,
    name: "Esther Howard",
    unitNumber: "B 1002",
    date: "11/02/2024",
    status: "Owner",
    phoneNumber: "92524 12365",
    amount: "1000",
    penalty: "250",
    paymentStatus: "Done",
    payment: "Cash",
  },
];

const Income = () => {
  const [maintenanceList, setMaintenanceList] = useState([]);
  const [maintenance, setMaintenance] = useState(0);
  const [penalty, setPenalty] = useState(0);
  const [activeTab, setActiveTab] = useState("maintenance");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [maintenanceAmount, setMaintenanceAmount] = useState("");
  const [penaltyAmount, setPenaltyAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [penaltyDay, setPenaltyDay] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSetMaintenance = () => {
    setIsModalOpen(true);
  };

  const handleContinue = async () => {
    try {
      const response = await ConfirmPassword({ password: password });
      toast.success(response.data.message);
      setIsModalOpen(false);
      setIsMaintenanceModalOpen(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setPassword("");
    }
  };

  const calculateDate = (daysToAdd) => {
    const today = new Date();
    today.setDate(today.getDate() + daysToAdd);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleApply = async () => {
    setSubmitted(true);
    let newErrors = {};

    const amountRegex = /^\d+(\.\d{1,2})?$/;

    if (!maintenanceAmount) {
      newErrors.maintenanceAmount = "Maintenance Amount is required.";
    } else if (!amountRegex.test(maintenanceAmount)) {
      newErrors.maintenanceAmount = "Invalid Maintenance Amount.";
    }

    if (!penaltyAmount) {
      newErrors.penaltyAmount = "Penalty Amount is required.";
    } else if (!amountRegex.test(penaltyAmount)) {
      newErrors.penaltyAmount = "Invalid Penalty Amount.";
    }

    if (!dueDate) {
      newErrors.dueDate = "Due Date is required.";
    }

    if (!penaltyDay) {
      newErrors.penaltyDay = "Penalty Day is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const data = {
          maintenanceAmount: +maintenanceAmount,
          penaltyAmount: +penaltyAmount,
          dueDate,
          penaltyDay: calculateDate(parseInt(penaltyDay)),
        };
        const response = await CreateMaintenance(data);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setIsMaintenanceModalOpen(false);
        setMaintenanceAmount("");
        setPenaltyAmount("");
        setDueDate("");
        setPenaltyDay("");
      }
    }
  };

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const ViewDetailsModal = ({ user, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-xl w-[450px] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <h3 className="text-lg font-semibold">View Maintenance Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* User Profile */}
        <div className="px-6 py-4 flex items-center gap-3 border-t border-b border-gray-100">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{user.name}</h4>
            <p className="text-sm text-gray-500">{user.date}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-4 gap-6 p-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Wing</p>
            <p className="font-medium">{user.wing}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Unit</p>
            <p className="font-medium">{user.unit}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <span className="px-2 py-1 text-xs rounded-full bg-[#F3F0FF] text-[#5B3ED6]">
              {user.status}
            </span>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Amount</p>
            <p className="font-medium text-[#12B76A]">₹ {user.amount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Penalty</p>
            <p className="font-medium text-gray-400">--</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span className="text-sm">Pending</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Payment</p>
            <span className="px-2 py-1 text-xs rounded-full bg-[#F2F4F7] text-[#475467]">
              Cash
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const handleOtherIncomeClick = () => {
    navigate("/other-income");
  };

  const GetMaintenancesList = async () => {
    try {
      const response = await GetMaintenances();
      setMaintenanceList(response.data.Maintenance);
    } catch (error) {}
  };

  maintenanceList.map((m) => {
    m.residentList.map((r) => {
      console.log(r.resident.profileImage);
      console.log(r.resident.Full_name);
      console.log(r.resident.Unit);
      console.log(r.resident.Resident_status);
      console.log(r.resident.Phone_number);
      console.log(m.maintenanceAmount);
      console.log(r.penalty);
      console.log(r.paymentStatus);
      console.log(r.paymentMode);
    });
  });

  useEffect(() => {
    GetMaintenancesList();
  }, []);

  return (
    <div>
      {/* Top Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between space-x-4 max-sm:flex-col ">
          <div className="grid grid-cols-2 col-span-2 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1 max-2xl:grid-cols-2 relative z-[9]">
            {data.map((card, index) => (
              <div
                key={index}
                className="flex items-center justify-center relative w-full"
                style={{
                  borderRadius: "15px",
                }}
              >
                <div
                  style={{
                    borderRight: "1px solid transparent",
                    borderTop: "2px solid transparent",
                    borderRadius: "8px",
                  }}
                  className="relative flex flex-col justify-start items-start w-full max-md:flex-col max-md:justify-start max-md:flex max-md:items-start max-sm:flex-col max-sm:justify-start max-sm:flex max-sm:items-start"
                >
                  <div
                    className="w-[7px] h-[52px] mr-[10px] absolute z-[99] top-[50%] rounded-tr-[10px] rounded-br-[10px]"
                    style={{
                      backgroundColor: card.bgColor,
                      transform: "translateY(-50%)",
                    }}
                  />
                  <div
                    className="relative flex flex-col justify-between items-start py-[19px] px-[30px] flex-grow bg-white shadow-lg border-2 border-gray-200 w-full max-sm:pt-[12px] max-sm:pb-[12px] max-md:pt-[12px] max-md:pb-[12px] sm:max-w-full max-sm:max-w-full max-md:col-span-2"
                    style={{
                      borderImageSource: card.gradient,
                      borderImageSlice: 1,
                      borderRadius: 10,
                    }}
                  >
                    <div className="flex justify-between items-center w-full">
                      <div className="flex flex-col items-start">
                        <h6 className="text-[#202224] font-semibold text-[16px] leading-2 max-sm:text-[14px] max-md:text-[18px] mb-[5px]">
                          {card.title}
                        </h6>
                        <h3
                          className={`font-bold text-[26px] max-sm:text-[20px] max-sm:font-medium max-md:text-[20px] max-lg:text-[20px] max-xl:text-[20px] max-2xl:text-[20px] ${card.textColor}`}
                        >
                          <span className="text-[26px] mr-[5px]">{` ₹`}</span>
                          <span className="text-[26px]">{card.amount}</span>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Set Maintenance Button */}
          <button
            onClick={handleSetMaintenance}
            className="bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-6 py-3 rounded-md transition-colors max-sm:mt-3"
          >
            Set Maintenance
          </button>
        </div>
      </div>
      <br />
      {/* Tabs Section */}
      <div>
        <div className="flex flex-1 rounded-md  h-14 mb-0 max-sm:container max-sm:mx-auto max-md:container max-md:mx-auto max-lg:container max-lg:mx-auto max-2xl:container max-2xl:mx-auto">
          <button
            className={`relative py-2 px-6 ${
              activeTab === "maintenance"
                ? "bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] rounded-lg text-white"
                : "bg-gray-100 text-black-600"
            }`}
            onClick={() => setActiveTab("maintenance")}
          >
            Maintenance
          </button>
          <button
            className={`relative py-2 px-6 ${
              activeTab === "otherIncome"
                ? "bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white"
                : "bg-gray-100 text-black-600"
            }`}
            onClick={handleOtherIncomeClick}
          >
            Other Income
          </button>
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6 mb-4">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold text-black-500">
              Maintenace Details
            </h1>
          </div>
          <table className="min-w-full">
            <thead>
              <tr className="text-left  font-bold text-sm bg-indigo-50 rounded-lg  text-black-500">
                <th className="py-3 px-4 font-medium ">Name</th>
                <th className="py-3 px-4 font-medium">Unit Number</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Phone Number</th>
                <th className="py-3 px-4 font-medium">Amount</th>
                <th className="py-3 px-4 font-medium">Penalty</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Payment</th>
                <th className="py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceList.map((m) =>
                m.residentList.map((r) => (
                  <tr key={m._id} className="border-t border-gray-100">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <img
                          src={r.resident.profileImage}
                          alt={""}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <span className="font-medium">
                          {r.resident.Full_name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-black-600">{r.resident.Unit}</span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(m.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full inline-flex items-center gap-1.5 w-[113px] h-[31px] justify-center text-[14px] ${
                          r.resident.Resident_status === "Tenante"
                            ? "bg-pink-50 text-pink-500"
                            : "bg-purple-50 text-purple-500"
                        }`}
                      >
                        {r.resident.Resident_status === "Tenante" ? (
                          <FaUser size={12} />
                        ) : (
                          <img
                            src={ownerImage}
                            className="mr-[4px]"
                            alt="Owner Icon"
                          />
                        )}
                        {r.resident.Resident_status}
                      </span>
                    </td>
                    <td className="py-3 px-4">{r.resident.Phone_number}</td>
                    <td className="py-3 px-4">
                      <span className="text-green-600">
                        ₹ {m.maintenanceAmount}
                      </span>
                    </td>
                    <td className="py-3  px-4">
                      {r.penalty === "--" ? (
                        <span className="text-black-600 px-4 py-1 rounded-full bg-blue-50">
                          --
                        </span>
                      ) : (
                        <span className="bg-[#E74C3C] text-white px-4 py-1 rounded-full">
                          {r.penalty}
                        </span>
                      )}
                    </td>
                    <td className="py-3   px-4">
                      <span
                        className={`py-1 px-2.5 rounded-full inline-flex items-center justify-center text-[14px] gap-1.5 font-medium w-[113px] h-[31px] ${
                          r.paymentStatus === "pending"
                            ? "bg-yellow-50 text-yellow-500 "
                            : "bg-green-50 text-green-500"
                        }`}
                      >
                        {r.paymentStatus === "pending" ? (
                          <BsClockFill size={12} />
                        ) : (
                          <img src={verify} className="mr-[4px]" alt="verify" />
                        )}
                        {r.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center justify-center  w-[113px] h-[31px] text-[14px] ${
                            r.paymentMode === "online"
                              ? "text-blue-600 bg-blue-50"
                              : "text-gray-600 bg-gray-50"
                          } px-2 py-1 rounded-full`}
                        >
                          {r.paymentMode === "online" ? (
                            <img src={wallet} className="pr-[2.5px]" />
                          ) : (
                            <img src={moneys} className="pr-[2.5px]" />
                          )}
                          {r.paymentMode}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleViewClick(m)}
                        className="cursor-pointer text-blue-500 hover:text-blue-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                      >
                        <img src={eye} />
                      </button>

                      {/* Render Modal */}
                      {isViewModalOpen && selectedUser && (
                        <ViewDetailsModal
                          user={selectedUser}
                          onClose={() => {
                            setIsViewModalOpen(false);
                            setSelectedUser(null);
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg w-[400px] p-6">
            <h2 className="text-lg font-semibold mb-4">Set Maintenance</h2>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-black-600 mb-2">
                Password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black-500"
                >
                  {showPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setPassword("");
                }}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="px-4 py-2 bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white rounded-md"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {isMaintenanceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">
              Add Maintenance Detail
            </h2>
            <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
            {/* Maintenance and Penalty Amount Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-black-600 mb-2">
                  Maintenance Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="text"
                    name="maintenanceAmount"
                    value={maintenanceAmount}
                    onChange={(e) => setMaintenanceAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="0000"
                  />
                  {submitted && errors.maintenanceAmount && (
                    <p className="text-red-500">{errors.maintenanceAmount}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm text-black-600 mb-2">
                  Penalty Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="text"
                    name="penaltyAmount"
                    value={penaltyAmount}
                    onChange={(e) => setPenaltyAmount(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="0000"
                  />
                  {submitted && errors.penaltyAmount && (
                    <p className="text-red-500">{errors.penaltyAmount}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Due Date Input */}
            <div className="mb-4">
              <label className="block text-sm text-black-600 mb-2">
                Maintenance Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              {submitted && errors.dueDate && (
                <p className="text-red-500">{errors.dueDate}</p>
              )}
            </div>

            {/* Penalty Day Selection */}
            <div className="mb-6">
              <label className="block text-sm text-black-600 mb-2">
                Penalty Applied After Day Selection
              </label>
              <div className="relative">
                <select
                  name="penaltyDay"
                  value={penaltyDay}
                  onChange={(e) => setPenaltyDay(e.target.value)}
                  className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 appearance-none bg-white "
                >
                  <option value="" disabled selected>
                    Select Penalty Applied After Day
                  </option>
                  <option value="1">1 Day</option>
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="5">5 Days</option>
                  <option value="7">7 Days</option>
                </select>
                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-grey-500  "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {submitted && errors.penaltyDay && (
                  <p className="text-red-500">{errors.penaltyDay}</p>
                )}
              </div>
            </div>

            {/* Action Buttons - Updated styling and positioning */}
            <div className="flex justify-end space-x-4  mt-8">
              <button
                onClick={() => setIsMaintenanceModalOpen(false)}
                className="w-[170px] py-3 border text-black-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className={`w-[170px]  py-3 rounded-md transition-colors ${
                  !maintenanceAmount ||
                  !penaltyAmount ||
                  !dueDate ||
                  !penaltyDay
                    ? "bg-[#F6F8FB] text-black-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90"
                }`}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Income;
