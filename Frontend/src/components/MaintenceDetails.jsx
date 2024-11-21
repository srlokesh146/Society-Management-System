import React from 'react'
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
        <div >  
            <div className='h-36 w-full  bg-white mt-6 rounded-lg flex items-center justify-start p-4'>
                
                <h1 className='font-semibold text-lg mt-[10px] text-start'>Show Maintenance Details</h1>
          
           
        <div className="flex items-center justify-between ml-[750px] space-x-4 max-sm:flex-col ">
          <div className="grid grid-cols-2 col-span-2 gap-4 max-xl:grid-cols-2 max-sm:grid-cols-1 max-2xl:grid-cols-2 relative z-[9]">
            {data.map((card, index) => (
              <div
                key={index}
                className="flex items-center justify-center relative w-full"
                style={{
                  borderRadius: '15px',
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
                        <h3 className={`font-semibold text-[26px] max-sm:text-[20px] max-sm:font-medium max-md:text-[20px] max-lg:text-[20px] max-xl:text-[20px] max-2xl:text-[20px] ${card.textColor}`}>
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
          </div>
       
        </div>
      </div>
      
    )
}

export default MaintenceDetails