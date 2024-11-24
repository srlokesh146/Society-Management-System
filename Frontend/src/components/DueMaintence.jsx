import React, { useState } from 'react'
import PayMentMathodModal from './modal/PayMentMathodModal';
import PayMenCard from './modal/PayMenCard';


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


    const [isPaymentNowOpen, setIsPaymantNowOpen] = useState(false);
    const [isPaymenCardOpen, setisPaymenCardOpen] = useState(false);

    const handleDueMaintence = () =>{
        setIsPaymantNowOpen(true)
    };

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
                                <h2 className="text-sm sm:text-base font-medium capitalize">{Duemaintence.name}</h2>
                                <h2 className="text-sm bg-[#FFFFFF1A] w-28 text-center rounded-2xl p-1 font-medium h-[31px]">Pending</h2>
                            </div>
                            <div className="p-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center sm:text-base text-gray-500">
                                        <span className="text-[14px] w-24"> Date</span>
                                        <p className="text-grey-400 text-[14px]">{Duemaintence.date}</p>
                                    </div>
                                    
                                    <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
                                    <div className="flex justify-between items-center sm:text-base text-gray-500">
                                        <span className="text-[14px] w-32">Pending Date</span>
                                        <p className="text-red-500 text-[14px]">{Duemaintence.amount}</p>
                                    </div>
                                    <div className="flex justify-between items-center sm:text-base text-gray-500">
                                        <span className="text-[14px]">Maintenance Amount</span>
                                        <p className="text-red-500 text-[14px]">{Duemaintence.duemaintenceamount}</p>
                                    </div>
                                    <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
                                   
                                    <button 
                                     onClick={handleDueMaintence}
                                    className='h-[51px] bg-custom-gradient text-white font-semibold rounded-[10px] w-full border max-sm:h-[36px] text-[18px] max-sm:text-[16px]'>Pay Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <PayMentMathodModal
            isOpen={isPaymentNowOpen}
            onClose={() => {
              setIsPaymantNowOpen(false);
            
            }}
            setisPaymenCardOpen={() => setisPaymenCardOpen(true)}
          />
          <PayMenCard
            isOpen={isPaymenCardOpen}
            onClose={() => {
              setisPaymenCardOpen(false);
              
            }}
          />
        </div>
    )
}

export default DueMaintence