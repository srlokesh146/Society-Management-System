import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PendingMaintence from "../../components/PendingMaintence";
import MaintenceDetails from "../../components/MaintenceDetails";
import DueMaintence from "../../components/DueMaintence";
import PayMentMathodModal from "../../components/modal/PayMentMathodModal";
import PayMenCard from "../../components/modal/PayMenCard";

const maintence = [
    {
        id: 1,
        name: "Maintenance",
        billdate: "11/01/2024",
        pendingdate: "11/01/2024",
        amount: "1000.00",
        penalty: "250.00",
        total: "1250.00",
    },
    {
        id: 2,
        name: "Maintenance",
        billdate: "11/01/2024",
        pendingdate: "11/01/2024",
        amount: "1000.00",
        penalty: "250.00",
        total: "1250.00",
    },
    {
        id: 3,
        name: "Maintenance",
        billdate: "11/01/2024",
        pendingdate: "11/01/2024",
        amount: "1000.00",
        penalty: "250.00",
        total: "1250.00",
    },
];



function MaintenceInvoices() {

    const [isPaymentNowOpen, setIsPaymantNowOpen] = useState(false);
    const [isPaymenCardOpen, setisPaymenCardOpen] = useState(false);

   


    const navigate = useNavigate();

    const handleViewInvoice = () => {
        navigate("/invoicespage");
    };
    const handleMaintenceInvoices = () =>{
        setIsPaymantNowOpen(true)
    };
    
    return (
        <div>
            <div>
                <MaintenceDetails />
            </div>
            <div>
                <div className="bg-white p-6  mt-6 rounded-lg shadow-sm">
                    <div className="flex gap-[1200px]">
                        <h1 className='font-semibold font-md'>Pending Maintence</h1>
                        <button
                            className="border p-3 bg-custom-gradient  rounded-lg text-white font-medium"
                            onClick={handleViewInvoice}
                        >
                            View Invoice
                        </button>
                    </div>
                    <div className="grid grid-cols-1  mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {maintence.map((maintence) => (

                            <div key={maintence._id} className="border border-gray-300  rounded-lg">

                                <div className="bg-[#5678E9] text-white p-4 flex justify-between items-center rounded-t-lg">
                                    <h2 className="text-sm sm:text-base font-semibold">{maintence.name}</h2>
                                    <h2 className="text-sm bg-[#FFFFFF1A] w-28 text-center rounded-2xl p-1 font-semibold">Pending</h2>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                                            <span className="font-sm w-24">Bill Date</span>
                                            <p className="text-grey-400 text-[15px]">{maintence.billdate}</p>
                                        </div>
                                        <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                                            <span className="font-sm w-32">Pending Date</span>
                                            <p className="text-grey-400">{maintence.pendingdate}</p>
                                        </div>
                                        <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
                                        <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                                            <span className="font-sm ">Maintenance Amount</span>
                                            <p className="text-red-500">{maintence.amount}</p>
                                        </div>
                                        <div className="flex justify-between items-center text-sm sm:text-base text-gray-500">
                                            <span className="font-[10px]  ">Maintenance Penalty Amount</span>
                                            <p className="text-red-500">{maintence.penalty  }</p>
                                        </div>
                                        <div className="border-b border-[#F4F4F4] mb-[20px]"></div>
                                        <div className="flex justify-between items-center text-sm sm:text-base text-black">
                                            <span className="font-sm font-semibold ">Grand Total</span>

                                            <span className="text-[15px] ml-40 text-green-600 ">{` ₹`}</span>
                                            <p className=" text-green-600">{maintence.total}</p>
                                        </div>
                                        
                                    
                                    <button
                                    onClick={handleMaintenceInvoices}
                                    className='h-14 bg-custom-gradient text-white font-bold  rounded-xl w-full border '>Pay Now</button>
                                
                                   
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div>
                <DueMaintence />
            </div>

           <div>
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
            
            
            
       
        
        </div>
    );
}

export default MaintenceInvoices;