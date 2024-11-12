// dashboard constant
// sidebar
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaMoneyBill } from "react-icons/fa6";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { AiFillSecurityScan } from "react-icons/ai";
import { FaUserShield, FaBullhorn } from "react-icons/fa";
import { RiMessageFill } from "react-icons/ri";
import icon1 from "./assets/images/icon-1.png";
import moneyrecive from "./assets/images/money-recive.png";
import moneysend from "./assets/images/money-send.png";
import vacate from "./assets/images/vacate.png";
import evelynHarperimage from "./assets/images/EvelynHarperimage.png";
import moneys from "./assets/images/moneys.png";


export const sidebarItems = [
  { id: 1, path: "/dashboard",  label: "Dashboard", icon: <TbLayoutDashboardFilled /> },
  {
    id: 2,
    path: "/residentmanagement",
    label: "Resident Management",
    icon: <FaMoneyBill />,
  },
  {
    id: 3,
    label: "Financial Management",
    icon: <RiMoneyDollarBoxFill />,
    subItems: [
      { id: 4, path: "/income", label: "Income" },
      { id: 5, path: "/expense", label: "Expanse" },
      { id: 6, path: "/note", label: "Note" },
    ],
  },
  {
    id: 7,
    path: "/facilitymanagement",
    label: "Facility Management",
    icon: <HiMiniBuildingOffice2 />,
  },
  {
    id: 8,
    label: "Complaint Tracking",
    icon: <RiMessageFill />,
    subItems: [
      { id: 9, path: "/complainttable", label: "Create Complaint" },
      { id: 10, path: "/reqtracking", label: "Request Tracking" },
    ],
  },
  {
    id: 11,
    label: "Security Management",
    icon: <AiFillSecurityScan />,
    subItems: [
      { id: 12, path: "/visitorlog", label: "Visitor Logs" },
      { id: 13, path: "/SecurityProtocols", label: "Security Protocols" },
    ],
  },
  {
    id: 14,
    path: "/securityguard",
    label: "Security Guard",
    icon: <FaUserShield />,
  },
  {
    id: 15,
    path: "/announcement",
    label: "Announcement",
    icon: <FaBullhorn />,
  },
];

export const Navigationbar = [
  { path: "/editprofile", label: "EditProfile" },
  { path: "/residentmanagement", label: "ResidentManagement" },
  { path: "/reqtracking", label: "RequestTracking" },
  { path: "/visitorlog", label: "VisitorLog" },
  { path: "/securityprotocols", label: "SecurityProtocols" },
  { path: "/announcement", label: "Announcement" },
  { path: "/facilitymanagement", label: "FacilityManagement" },
  { path: "/note", label: "Note" },
  { path: "/ownerform", label: "OwnerForm" },
  { path: "/tenantform", label: "TenantForm" },
  { path: "/complainttable", label: "CreateComplaint" },
  { path: "/income", label: "Income" },
  { path: "/expense", label: "Expense" },
  { path: "/securityguard", label: "SecurityGuard" },
];

export const cardData = [
  {
    title: "Total Balance",
    amount: "2,22,520",
    bgColor: 'rgba(255, 106, 0, 0.5)',
    gradient: 'linear-gradient(255.6deg, #FF6A00 7.71%, rgba(255, 255, 255, 0) 18.54%)',
    iconBg: '#FF6A00',
    icon: icon1,
  },
  {
    title: "Total Income",
    amount: "55,000",
    bgColor: 'rgba(57, 151, 61, 0.5)',
    gradient: 'linear-gradient(255.6deg, #39973D 7.71%, rgba(255, 255, 255, 0) 18.54%)',
    iconBg: '#39973D',
    icon: moneyrecive,
  },
  {
    title: "Total Expense",
    amount: "20,550",
    bgColor: 'rgba(134, 159, 243, 0.5)',
    gradient: 'linear-gradient(255.6deg, #869FF3 7.71%, rgba(255, 255, 255, 0) 18.54%)',
    iconBg: '#869FF3',
    icon: moneysend,
  },
  {
    title: "Total Unit",
    amount: "20,550",
    bgColor: 'rgba(235, 55, 195, 0.5)',
    gradient: 'linear-gradient(255.6deg, #EB37C3 7.71%, rgba(255, 255, 255, 0) 18.54%)',
    iconBg: '#EB37C3',
    icon: vacate,
  },
];



export const importantNumbers = [
  { name: "Hanna Danin", work: "Plumber", phone: "+91 995867 33657" },
  { name: "Roger Lubin", work: "Electrician", phone: "+91 898765 45677" },
  { name: "Evelyn Harper", work: "Carpenter", phone: "+91 998765 12345" },
  { name: "Chris Foster", work: "Painter", phone: "+91 987654 33211" },
  { name: "Chris Foster", work: "Painter", phone: "+91 987654 33211" },
];

export const pendingMaintenances = [
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
  { name: "Roger Lubin", amount: "5,000", duration: "2 Month Pending" },
];

export const complaintsData = [
  {
    id: 1,
    complainerName: "Evelyn Harper",
    complaintName: "Unethical Behavior",
    date: "01/02/2024",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 2,
    complainerName: "Evelyn Harper",
    complaintName: "Unethical Behavior",
    date: "01/03/2024",
    priority: "High",
    status: "Resolved",
  },
  {
    id: 3,
    complainerName: "Evelyn Harper",
    complaintName: "Unethical Behavior",
    date: "01/04/2024",
    priority: "Low",
    status: "In Progress",
  },
];


export const activities = [
  { name: "Society Meeting", date: "24-09-2024", time: "8:00 PM to 10:00 PM" },
  { name: "Holi Festival", date: "24-09-2024", time: "8:00 PM to 10:00 PM" },
  { name: "Ganesh Chaturthi", date: "24-09-2024", time: "8:00 PM to 10:00 PM" },
  {
    name: "Navratri Festival",
    date: "24-09-2024",
    time: "8:00 PM to 10:00 PM",
  },
  { name: "Society Meeting", date: "24-09-2024", time: "8:00 PM to 10:00 PM" },
];

export const notifications = [
  {
    title: "Evelyn Harper (A- 101)",
    description: (
      <>
        Evelyn Harper gave a fund 
        <span className="ml-1 text-[#5678E9] text-[14px]">of 1000 rupees for Navratri.</span>
      </>
    ),
    event: "for Navratri",
    time: "32 Minutes ago",
    options: ["Accept"],
    options2: ["Decline"],
    icon: (
      <img
        src={evelynHarperimage}
        alt="Evelyn"
        className="w-[40px] h-[40px] rounded-full mr-[10px]"
      />
    ),
  },
  {
    title: "Maintenance (A- 101)",
    description: (
      <>
        Evelyn Harper gave a 
        <span className="text-[#5678E9] text-[14px] ml-1">Maintenance of 1000 rupees.</span>
      </>
    ),
    time: "Tuesday 11:41 AM",
    options: ["Accept"],
    options2: ["Decline"],
    icon: (
      <div className="icon-wrapper">
        <img src={moneys} alt="Evelyn" className="w-[22px] h-[22px] rounded-full relative top-[-3px] mr-[20px]" />
      </div>
    ),
  },
  {
    title: "Ganesh Chaturthi (A- 101)",
    description:
      "Ganesh Chaturthi celebration involves installing Lord Ganesa clay idols.",
      description: (
        <>
          <p> Per Person Amount : <span className="text-[#5678E9]">1,500</span> </p> 
          <span className="tag text-[#4F4F4F] text-[14px]">The celebration of Ganesh Chaturthi involves the installation of clay idols of Lord Ganesa in  OurResident.</span>
        </>
      ),
    time: "Saturday 11:41 AM",
    options: ["Accept"],
    options2: ["Decline"],
    icon: (
      <div className="icon-wrapper-text mr-[10px]">
        <p className="relative top-[-1px] left-[2px] mr-[20px] font-bold">G</p>
      </div>
    ),
  },
  {
    title: "Update Maintenance",
    icon:
      <div className="icon-wrapper">
        <img src={moneys} alt="Evelyn" className="w-[22px] h-[22px] rounded-full relative top-[-3px] mr-[20px]" />
      </div>
  },
];



//   dashboard constant end

// residentmanagement data constant

export const Residentmanagementdata = [
  { fullName: "Evelyn Harper", unit: "A 1001", unitStatus: "Occupied", residentStatus: "Tenant", phone: "97587 85828", member: 1, vehicle: 2 },
  { fullName: "Evelyn Harper", unit: "B 1002", unitStatus: "Vacate", residentStatus: "--", phone: "97587 85828", member: 2, vehicle: 2 },
  { fullName: "Evelyn Harper", unit: "C 1003", unitStatus: "Occupied", residentStatus: "Owner", phone: "97587 85828", member: 1, vehicle: 4 },
  { fullName: "Evelyn Harper", unit: "D 1004", unitStatus: "Occupied", residentStatus: "Tenant", phone: "97587 85828", member: 4, vehicle: 2 },
  { fullName: "Evelyn Harper", unit: "E 2001", unitStatus: "--", residentStatus: "--", phone: "97587 85828", member: 2, vehicle: 2 },
  { fullName: "Robert Fox", unit: "F 2002", unitStatus: "Occupied", residentStatus: "Tenant", phone: "97587 85828", member: 3, vehicle: 2 },
  { fullName: "Evelyn Harper", unit: "G 2003", unitStatus: "Occupied", residentStatus: "Owner", phone: "97587 85828", member: 2, vehicle: 2 },
  { fullName: "Evelyn Harper", unit: "H 2004", unitStatus: "Occupied", residentStatus: "Tenant", phone: "97587 85828", member: 6, vehicle: 3 },
  { fullName: "Evelyn Harper", unit: "I 3001", unitStatus: "Vacate", residentStatus: "--", phone: "97587 85828", member: 2, vehicle: 2 },
  { fullName: "Evelyn Harper", unit: "A 3002", unitStatus: "Occupied", residentStatus: "Owner", phone: "97587 85828", member: 3, vehicle: 3 },
  { fullName: "Evelyn Harper", unit: "I 3003", unitStatus: "Occupied", residentStatus: "Tenant", phone: "97587 85828", member: 3, vehicle: 2 }
];
