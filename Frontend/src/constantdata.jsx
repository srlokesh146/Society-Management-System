// dashboard constant
// sidebar
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaMoneyBill } from "react-icons/fa6";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { AiFillSecurityScan } from "react-icons/ai";
import { FaUserShield, FaBullhorn  } from "react-icons/fa";
import { RiMessageFill } from "react-icons/ri";
import icon1 from "./assets/images/icon-1.png"
import moneyrecive from "./assets/images/money-recive.png"
import moneysend from "./assets/images/money-send.png"
import building4 from "./assets/images/building-4.png"


export const sidebarItems = [
  { id: 1, path: "/", label: "Dashboard", icon: <TbLayoutDashboardFilled/> },
  { id: 2, path: "/residentmanagement", label: "Resident Management", icon: <FaMoneyBill/> },
  {
    id: 3,
    label: "Financial Management",
    icon: <RiMoneyDollarBoxFill/>,
    subItems: [
      { id: 4, path: "/income", label: "Income" },
      { id: 5, path: "/expanse", label: "Expanse" },
      { id: 6, path: "/note", label: "Note" },
    ],
  },
  { id: 7, path: "/facilitymanagement", label: "Facility Management",icon: <HiMiniBuildingOffice2/>, },
  {
    id: 8,
    label: "Complaint Tracking",
    icon: <RiMessageFill/>, 
    subItems: [
      { id: 9, path: "/complainttable", label: "Create Complaint" },
      { id: 10, path: "/RequestTracking", label: "Request Tracking" },
    ],
  },
  {
    id: 11,
    label: "Security Management",
    icon: <AiFillSecurityScan/>, 
    subItems: [
      { id: 12, path: "/VisitorLogs", label: "Visitor Logs" },
      { id: 13, path: "/SecurityProtocols", label: "Security Protocols" },
    ],
  },
  { id: 14, path: "/securityguard", label: "Security Guard", icon: <FaUserShield />,  },
  { id: 15, path: "/announcement", label: "Announcement", icon: <FaBullhorn />,  },
];

export const totalBalanceData = [
  { id: 1, label: "Total Balance", amount: "₹ 2,22,520", img: icon1, bgColor: '#FF6A00' },
  { id: 2, label: "Total Income", amount: "₹ 55,000", img: moneyrecive,bgColor: '#39973D' },
  { id: 3, label: "Total Expense", amount: "₹ 20,550", img: moneysend, bgColor: '#869FF3' },
  { id: 4, label: "Total Units", amount: "₹ 20,550", img: building4, bgColor: '#EB37C3' },
];


export const importantNumbers = [
  { name: "Hanna Danin", job: "Plumber", phone: "+91 995867 33657" },
  { name: "Roger Lubin", job: "Electrician", phone: "+91 898765 45677" },
  { name: "Evelyn Harper", job: "Carpenter", phone: "+91 998765 12345" },
  { name: "Chris Foster", job: "Painter", phone: "+91 987654 33211" },
  { name: "Chris Foster", job: "Painter", phone: "+91 987654 33211" },
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

// upcoming activities
// export const upcomingActivities = [
//   { titletext: "S", title: "Society Meeting", time: "8:00 PM To 10:00 PM", date: "24-09-2024," },
//   { titletext: "H",title: "Holi Festival ", time: "8:00 PM To 10:00 PM", date: "01-10-2024" },
//   { titletext: "G",title: "Ganesh Chaturthi", time: "8:00 PM To 10:00 PM", date: "10-10-2024" },
//   { titletext: "N",title: "Navratri Festival", time: "8:00 PM To 10:00 PM", date: "15-10-2024" },
//   { titletext: "S",title: "Society Meeting", time: "8:00 PM To 10:00 PM", date: "15-10-2024" },
// ];

export  const activities = [
  { name: 'Society Meeting', date: '24-09-2024', time: '8:00 PM to 10:00 PM' },
  { name: 'Holi Festival', date: '24-09-2024', time: '8:00 PM to 10:00 PM' },
  { name: 'Ganesh Chaturthi', date: '24-09-2024', time: '8:00 PM to 10:00 PM' },
  { name: 'Navratri Festival', date: '24-09-2024', time: '8:00 PM to 10:00 PM' },
  { name: 'Society Meeting', date: '24-09-2024', time: '8:00 PM to 10:00 PM' },
];









//   dashboard constant end
