// import React, { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { FaChevronDown } from 'react-icons/fa';
// import {
//   Chart as ChartJS,
//   LinearScale,
//   PointElement,
//   LineElement,
//   CategoryScale,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   LinearScale,
//   PointElement,
//   LineElement,
//   CategoryScale,
//   Title,
//   Tooltip,
//   Legend
// );

// const BalanceComponent = () => {
//   const [selectedPeriod, setSelectedPeriod] = useState('Last week');
//   const [isOpen, setIsOpen] = useState(false);
//   const [chartData, setChartData] = useState({
//     labels: ['January', 'February', 'March', 'April'],
//     datasets: [
//       {
//         label: 'Balance',
//         data: [1, 1.2, 0.8, 1.5],
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//       },
//     ],
//   });

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           callback: (value) => value + 'k',
//         },
//       },
//     },
//   };

//   const handleToggleDropdown = () => {
//     setIsOpen((prev) => !prev);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedPeriod(option);
//     setIsOpen(false);
//     updateChartData(option);
//   };

//   const updateChartData = (period) => {
//     switch (period) {
//       case 'Last week':
//         setChartData({
//           labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           datasets: [
//             {
//               label: 'Balance',
//               data: [0.1, 0.2, 0.15, 0.3, 0.25, 0.4, 0.35],
//               borderColor: 'rgba(75, 192, 192, 1)',
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               fill: true,
//             },
//           ],
//         });
//         break;
//       case 'Last month':
//         setChartData({
//           labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
//           datasets: [
//             {
//               label: 'Balance',
//               data: [1.2, 1.5, 1.3, 1.6],
//               borderColor: 'rgba(75, 192, 192, 1)',
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               fill: true,
//             },
//           ],
//         });
//         break;
//       case 'Last year':
//         setChartData({
//           labels: ['Q1', 'Q2', 'Q3', 'Q4'],
//           datasets: [
//             {
//               label: 'Balance',
//               data: [3, 4, 3.5, 5],
//               borderColor: 'rgba(75, 192, 192, 1)',
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               fill: true,
//             },
//           ],
//         });
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="p-[20px] bg-white rounded-[15px] shadow-lg h-full">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Total Balance</h3>
//         <div className="relative">
//           <button
//             onClick={handleToggleDropdown}
//             className="border border-gray-300 rounded-lg px-2 py-1 text-gray-700 flex items-center"
//           >
//             {selectedPeriod} <FaChevronDown className="ml-2" />
//           </button>
//           {isOpen && (
//             <div className="absolute z-10 left-[-39px] bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-[149px]">
//               {['Select Month', 'Last week', 'Last month', 'Last year'].map((option, index) => (
//                 <option
//                   key={option}
//                   onClick={option === 'Select Month' ? null : () => handleOptionClick(option)} 
//                   className={`px-2 py-[3px] cursor-pointer hover:bg-gray-100 ${option === 'Select Month' ? 'text-gray-400 cursor-default' : ''}`}
//                 >
//                   {option}
//                 </option>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="h-64 w-full">
//         <Line
//           data={chartData}
//           options={chartOptions}
//           width={600}
//           height={250}
//         />
//       </div>
//     </div>
//   );
// };

// export default BalanceComponent;
