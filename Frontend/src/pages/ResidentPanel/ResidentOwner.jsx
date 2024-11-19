import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
import Member from "../../components/Member";
import Vehicle from "../../components/Vehicle";
import MaintenceDetails from "../../components/MaintenceDetails";
import PendingMaintence from "../../components/PendingMaintence";
import DueMaintence from "../../components/DueMaintence";
import AnnouncementDetails from "../../components/AnnouncementDetails";
import Form from "../../components/Form";


const ResidentOwner = () => {
    const [activeTab, setActiveTab] = useState("owner");

    const handleTenantClick = () => {
        setActiveTab("tenant");
    };

    return (
        <div className="container mx-auto p-6 rounded-lg">
            {/* Tabs */}
            <div className="flex">
                <button
                    className={`px-6 py-2 rounded-t-lg ${activeTab === "owner"
                        ? "bg-[#FF6B07] text-white"
                        : "bg-white border-b-4 border-orange-500 text-gray-600"
                        }`}
                    onClick={() => setActiveTab("owner")}
                >
                    Owner
                </button>
                <button
                    className={`px-6 py-2 rounded-t-lg ${activeTab === "tenant"
                        ? "bg-[#FF6B07] text-white"
                        : "bg-white border-b-4 border-orange-500 text-gray-600"
                        }`}
                    onClick={handleTenantClick}
                >
                    Tenant
                </button>
            </div>

            <div className="bg-white p-6  rounded-lg shadow-md ">
                                {activeTab === "tenant" && (
                
                                    <div>
                                        
                                        <div className="bg-white p-2  mb-2 rounded-lg">
                                          
                                            <div className="flex gap-20 grid-cols-1 md:grid-cols-">
                                                <div>
                                                    <label className="block text-md font-medium text-black">Owner Name</label>
                                                    <p className="text-gray-500">John Doe</p>
                                                </div>
                                                <div>
                                                    <label className="block text-md font-medium text-black">Phone Number</label>
                                                    <p className="text-gray-500">+91 98765 43210</p>
                                                </div>
                                                <div>
                                                    <label className="block text-md font-medium text-black">Owner Address</label>
                                                    <p className="text-gray-500">johndoe@example.com</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border-b border-[#F4F4F4] mb-[30px]"></div>
                                    <div className="mt-10">
                                        <Form/>
                                    </div>
                                        
                                  
                                    </div>
                
                                )}
                {/* Owner Tab Content */}
                
                                
                {activeTab === "owner" && (
                          <Form/>       
                            
                          )}

        
            </div>

            <div>
                <Member />
            </div>

            <div>
                <Vehicle />
            </div>
            <div>
                <MaintenceDetails />
            </div>
            <div>
                <PendingMaintence />
            </div>
            <div>
                <DueMaintence />
            </div>
            <div>
                <AnnouncementDetails />
            </div>
        </div>
    );
};

export default ResidentOwner;