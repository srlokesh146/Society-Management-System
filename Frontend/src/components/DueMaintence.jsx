import React from 'react'


const Duemaintence = [
    {
        id: 1,
        name: "maintence",
        date: "11/01/2024",
        amount: "1000.00",
           duemaintenceamount:"250.00"
      

    },
    {
        id: 2,
        name: "maintence",
        date: "11/01/2024",
        amount: "1000.00",
           duemaintenceamount:"250.00"
      

    },

   

];

function DueMaintence() {
    return (
        <div>
            <div className="bg-white p-6  mt-6 rounded-lg shadow-sm">
                <div>
                <h1 className='font-semibold font-md'>Due Maintence</h1>
                </div>
                <div className="grid grid-cols-1  mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {Duemaintence.map((Duemaintence) => (

                        <div key={Duemaintence._id} className="border border-gray-300 rounded-lg">

                            <div className="bg-[#5678E9] text-white p-4 flex justify-between items-center rounded-t-lg">
                                <h2 className="text-sm sm:text-base font-semibold">{Duemaintence.name}</h2>
                                <h2 className="text-sm bg-[#FFFFFF1A] w-28 text-center rounded-2xl p-1 font-semibold">Pending</h2>
                            </div>
                            <div className="p-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                                        <span className="font-sm w-24"> Date</span>
                                        <p className="text-grey-400 text-[15px]">{Duemaintence.date}</p>
                                    </div>
                                    
                                    <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
                                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                                        <span className="font-sm w-32">Pending Date</span>
                                        <p className="text-red-500">{Duemaintence.amount}</p>
                                    </div>
                                    <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                                        <span className="font-sm ">Maintenance Amount</span>
                                        <p className="text-red-500">{Duemaintence.duemaintenceamount}</p>
                                    </div>
                                    <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
                                   
                                    <button className='h-14 bg-custom-gradient text-white font-bold  rounded-xl w-full border '>Pay Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DueMaintence