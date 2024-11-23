import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PendingMaintence from "../../components/PendingMaintence";
import MaintenceDetails from "../../components/MaintenceDetails";
import DueMaintence from "../../components/DueMaintence";
import PayMentMathodModal from "../../components/modal/PayMentMathodModal";
import PayMenCard from "../../components/modal/PayMenCard";
import { GetPendingMaintenances, UpdateMaintenanceStatus } from "../../services/maintenanceService";
import toast from "react-hot-toast";

function MaintenceInvoices() {
  const [isPaymentNowOpen, setIsPaymantNowOpen] = useState(false);
  const [isPaymenCardOpen, setisPaymenCardOpen] = useState(false);
  const [maintenance, setMaintenance] = useState([]);
  const [payMaintenance, setPayMaintenance] = useState(null);

  const navigate = useNavigate();

  const handleViewInvoice = () => {
    navigate("/invoicespage");
  };

  const handlePendingMaintence = (maintenance) => {
    setPayMaintenance(maintenance);
    setIsPaymantNowOpen(true);
  };

  const fetchPendingMaintenances = async () => {
    try {
      const response = await GetPendingMaintenances();
      setMaintenance(response.data.Maintenance);
    } catch (error) {
      // toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchPendingMaintenances();
  }, []);

  const handlePayment = async (paymentMode) => {
    try {
      const response = await UpdateMaintenanceStatus(payMaintenance._id, {
        paymentMode: paymentMode,
      });
      toast.success(response.data.message);
      setMaintenance((prev) =>
        prev.filter((entry) => entry._id !== payMaintenance._id)
      );
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setPayMaintenance(null);
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Maintenance Details Section */}
      <div>
        <MaintenceDetails />
      </div>

      {/* Pending Maintenance Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="font-semibold text-lg sm:text-xl">Pending Maintenance</h1>
          <button
            className="border p-3 mt-4 sm:mt-0 bg-custom-gradient rounded-lg text-white font-medium"
            onClick={handleViewInvoice}
          >
            View Invoice
          </button>
        </div>

        {/* Maintenance Cards */}
        <div className="grid grid-cols-1 mt-4 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {maintenance.map((maintence) => (
            <div
              key={maintence._id}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              {/* Card Header */}
              <div className="bg-[#5678E9] text-white p-4 flex justify-between items-center">
                <h2 className="text-sm sm:text-base font-semibold">
                  Maintenance
                </h2>
                <h2 className="text-sm bg-[#FFFFFF1A] w-28 text-center rounded-2xl p-1 font-semibold">
                  {maintence.residentList[0].paymentStatus}
                </h2>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-2 text-sm sm:text-base">
                <div className="flex justify-between items-center text-gray-500">
                  <span className="font-medium">Bill Date</span>
                  <p className="text-gray-400">
                    {new Date(maintence.dueDate).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span className="font-medium">Pending Date</span>
                  <p className="text-gray-400">
                    {new Date(maintence.penaltyDay).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="border-b border-[#F4F4F4]"></div>
                <div className="flex justify-between items-center text-gray-500">
                  <span className="font-medium">Maintenance Amount</span>
                  <p className="text-red-500">{maintence.maintenanceAmount}</p>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span className="font-medium">Penalty Amount</span>
                  <p className="text-red-500">{maintence.penaltyAmount}</p>
                </div>
                <div className="border-b border-[#F4F4F4]"></div>
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-black">Grand Total</span>
                  <p className="text-green-600">
                    ₹{maintence.maintenanceAmount + maintence.penaltyAmount}
                  </p>
                </div>
                <button
                  onClick={() => handlePendingMaintence(maintence)}
                  className="w-full bg-custom-gradient text-white font-bold rounded-xl py-2 mt-2"
                >
                  Pay Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Due Maintenance Section */}
      <div>
        <DueMaintence />
      </div>

      {/* Modals */}
      <PayMentMathodModal
        isOpen={isPaymentNowOpen}
        onClose={() => setIsPaymantNowOpen(false)}
        setisPaymenCardOpen={() => setisPaymenCardOpen(true)}
        handlePayment={handlePayment}
      />
      <PayMenCard
        isOpen={isPaymenCardOpen}
        onClose={() => setisPaymenCardOpen(false)}
        handlePayment={handlePayment}
      />
    </div>
  );
}

export default MaintenceInvoices;
