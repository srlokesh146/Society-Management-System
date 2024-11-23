import React from "react";

export const data = [
  {
    title: "Maintenance Amount",
    amount: "1,500",
    bgColor: "rgba(57, 151, 61, 0.5)",
    gradient:
      "linear-gradient(255.6deg, #39973D 7.71%, rgba(255, 255, 255, 0) 18.54%)",
    iconBg: "#E6F7E6",
    textColor: "text-green-500",
  },
  {
    title: "Penalty Amount",
    amount: "500",
    bgColor: "rgba(255, 106, 0, 0.5)",
    gradient:
      "linear-gradient(255.6deg, #FF6A00 7.71%, rgba(255, 255, 255, 0) 40.54%)",
    iconBg: "#FFE6E6",
    textColor: "text-red-500",
  },
];

function MaintenceDetails() {
  return (
    <div className="p-4">
      <div className="h-auto w-full bg-white mt-6 rounded-lg flex flex-col items-start justify-start p-4 md:flex-row md:items-center md:justify-between">
        {/* Title */}
        <h1 className="font-semibold text-lg text-start">
          Show Maintenance Details
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 mt-4 w-full sm:grid-cols-2 md:mt-0 md:w-auto md:flex md:space-x-4">
          {data.map((card, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center bg-white rounded-lg shadow-lg border-2"
              style={{
                borderImageSource: card.gradient,
                borderImageSlice: 1,
              }}
            >
              {/* Left Accent Bar */}
              <div
                className="w-[7px] h-[52px] absolute left-0 top-1/2 transform -translate-y-1/2 rounded-tr-lg rounded-br-lg"
                style={{ backgroundColor: card.bgColor }}
              />
              {/* Card Content */}
              <div className="flex flex-col items-start justify-between w-full py-4 px-6">
                <h6 className="text-[#202224] font-semibold text-base sm:text-lg mb-2">
                  {card.title}
                </h6>
                <h3
                  className={`font-semibold text-xl sm:text-2xl ${card.textColor}`}
                >
                  <span className="text-lg sm:text-xl mr-1">₹</span>
                  {card.amount}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MaintenceDetails;
