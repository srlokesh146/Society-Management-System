import React, { useState } from "react";
import { FaImage } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Member from "../../components/Member";
import Vehicle from "../../components/Vehicle";
import MaintenceDetails from "../../components/MaintenceDetails";
import PendingMaintence from "../../components/PendingMaintence";
import DueMaintence from "../../components/DueMaintence";
import AnnouncementDetails from "../../components/AnnouncementDetails";
import Form from "../../components/Form";

const ResidentOwner = () => {
  const { user } = useSelector((store) => store.auth);

  const [activeTab, setActiveTab] = useState("owner");

  // 647287
  useEffect(() => {
    if (user?.Resident_status === "Tenante") {
      setActiveTab("tenant");
    } else if (user?.Resident_status === "Owner") {
      setActiveTab("owner");
    }
  }, []);

  return (
    <div className="container mx-auto p-6 rounded-lg">
      {/* Tabs */}
      <div className="flex">
        <button
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === "owner"
              ? "bg-[#FF6B07] text-white"
              : "bg-white text-gray-600 border-b-2 border-[#FF6B07]"
          }`}
        >
          Owner
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg ${
            activeTab === "tenant"
              ? "bg-[#FF6B07] text-white"
              : "bg-white text-gray-600 border-b-2 border-[#FF6B07]"
          }`}
        >
          Tenant
        </button>
      </div>

      <div>
        {user.Resident_status === "Tenante" && activeTab === "tenant" && (
          <div>
            <div className="bg-white p-6 rounded-lg rounded-tl-none mb-6">
              <div className="flex gap-20 grid-cols-1 md:grid-cols-">
                <div>
                  <label className="block text-md font-medium text-black">
                    Owner Name
                  </label>
                  <p className="text-gray-500">{user.Owner_Full_name}</p>
                </div>
                <div>
                  <label className="block text-md font-medium text-black">
                    Phone Number
                  </label>
                  <p className="text-gray-500">+91 {user.Owner_Phone}</p>
                </div>
                <div>
                  <label className="block text-md font-medium text-black">
                    Owner Address
                  </label>
                  <p className="text-gray-500">{user.Owner_Address}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        <div>
          <Form user={user} />
        </div>
        <div>
          <Member member={user.Member_Counting} />
        </div>
        <div>
          <Vehicle vehicle={user.Vehicle_Counting} />
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
    </div>
  );
};

export default ResidentOwner;
