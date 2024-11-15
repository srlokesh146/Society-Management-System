import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaEye } from "react-icons/fa";
import { Residentmanagementdata } from "../constantdata";
import avatar from "../assets/images/avatar.png";
import occupiedImage from "../assets/images/Occupied.png";
import vacateImage from "../assets/images/vacate.png";
import ownerImage from "../assets/images/owner.png";
import tenantImage from "../assets/images/tenant.png";
import avatar2 from "../assets/images/Avatar2.png";
import AddResidentModal from "../components/modal/AddResidentModal";
import { useNavigate } from "react-router-dom";
import ViewResidentModal from "../components/modal/ViewResidentModal";
import VacateModal from "../components/modal/VacateModal";
import ConfirmationModal from "../components/modal/ConfirmationModal";
import { GetResidents } from "../services/ownerTenantService";
import { toast } from "react-hot-toast";
import eye from "../assets/images/eye.svg";
import edit from "../assets/images/edit.svg";

export default function ResidentManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVacateModal, setShowVacateModal] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedResident, setSelectedResident] = useState(null);
  const [viewResident, setViewResident] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [residentList, setResidentList] = useState([]);
  const [wing, setWing] = useState("A");
  const [unit, setUnit] = useState("1001");
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedResident(null);
  };

  const handleSaveResident = (updatedData) => {
    if (selectedResident) {
      console.log("Updating resident:", selectedResident.id, updatedData);
    }
    handleCloseModal();
  };

  const handleEdit = (resident) => {
    setSelectedResident(resident);
    setIsModalOpen(true);
  };

  const handleView = (resident) => {
    setViewResident(resident);
    setIsViewModalOpen(true);
  };

  const handleAddResident = () => {
    navigate("/ownerform");
  };

  // get all resident data

  const fetchResidents = async () => {
    try {
      const response = await GetResidents();
      setResidentList(response.data.Residents);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  return (
    <div>
      <div className="bg-white pt-[20px] rounded-[15px] shadow-md">
        <div className="flex justify-between items-center mb-[27px] ps-[20px] pr-[20px]">
          <h2 className="text-[20px] font-semibold leading-4 max-sm:text-[16px] max-mb:text-[18px]">
            Resident Tenant and Owner Details
          </h2>
          <div>
            <button
              className="modal bg-custom-gradient py-[12px] px-[10px] rounded-[10px] text-white font-semibold text-[18px] leading-[27px] w-[294px]"
              onClick={handleAddResident}
            >
              + Add New Resident details
            </button>
          </div>
        </div>

        <div className="overflow-x-auto pr-[8px] ps-[20px] custom-scrollbar max-h-[44rem] min-w-[400px]">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-start text-black bg-opacity-custom rounded-tl-[15px] rounded-tr-[15px] h-[61px]">
                <th className="text-[14px] font-semibold rounded-tl-[15px] px-4 py-2 text-start">
                  Full Name
                </th>
                <th className="text-[14px] font-semibold px-4 py-2 text-center">
                  Unit Number
                </th>
                <th className="text-[14px] font-semibold px-4 py-2 text-center">
                  Unit Status
                </th>
                <th className="text-[14px] font-semibold px-4 py-2 text-center">
                  Resident Status
                </th>
                <th className="text-[14px] font-semibold px-4 py-2 text-center">
                  Phone Number
                </th>
                <th className="text-[14px] font-semibold px-4 py-2 text-center">
                  Member
                </th>
                <th className="text-[14px] font-semibold px-4 py-2 text-center">
                  Vehicle
                </th>
                <th className="text-[14px] font-semibold rounded-tr-[15px] px-4 py-2 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {residentList.map((resident, index) => (
                <tr key={index} className="border-b border-[#F4F4F4]">
                  <td>
                    <div className="flex items-center justify-start ps-4 py-[16px] max-sm:min-w-[180px] md:min-w-[180px] max-md:min-w-[180px]">
                      {resident.ResidentStatus !== "Owner" &&
                        resident.UnitStatus !== "Occupied" &&
                        resident.ResidentStatus !== "Tenant" ? (
                        <>
                          <img
                            src={avatar2}
                            alt="Owner Document"
                            className="mr-2 w-8 h-8 rounded-full"
                          />
                          <span className="text-[#4F4F4F]">-</span>
                        </>
                      ) : (
                        <>
                          <img
                            src={resident.profileImage}
                            alt="Profile"
                            className="rounded-full mr-2 w-8 h-8"
                          />
                          <span className="text-[#4F4F4F] text-[16px]">
                            {resident.Full_name}
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="px-4 py-2 text-center flex justify-center items-center text-[#4F4F4F]">
                      <span className="mr-2 w-[28px] h-[28px] bg-gray-200 rounded-full flex items-center justify-center text-[#5678E9] text-[14px] font-semibold">
                        {resident.Wing}
                      </span>
                      {resident.Unit}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full font-medium 
                    ${resident.unitStatus === "Occupied"
                          ? "bg-[#ECFFFF] text-[#14B8A6] text-[14px] leading-[21px] font-medium w-[131px] h-[31px]"
                          : "bg-[#FFF6FF] text-[#9333EA] text-[14px] leading-[21px] font-medium w-[131px] h-[31px]"
                        }`}
                    >
                      {resident.unitStatus === "Occupied" ? (
                        <img src={occupiedImage} className="mr-[4px]" />
                      ) : (
                        <img src={vacateImage} className="mr-[4px]" />
                      )}
                      {resident.UnitStatus === "Occupied"
                        ? "Occupied"
                        : "Vacate"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {resident.UnitStatus === "Occupied" ? (
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full font-medium 
                       ${resident.Resident_status === "Tenante"
                            ? "bg-[#FFF1F8] text-[#EC4899] text-[14px] leading-[21px] font-medium w-[131px] h-[31px]"
                            : "bg-[#F1F0FF] text-[#4F46E5] text-[14px] leading-[21px] font-medium w-[131px] h-[31px]"
                          }`}
                      >
                        {resident.Resident_status === "Tenante" ? (
                          <img
                            src={tenantImage}
                            className="mr-[4px]"
                            alt="Tenant Icon"
                          />
                        ) : (
                          <img
                            src={ownerImage}
                            className="mr-[4px]"
                            alt="Owner Icon"
                          />
                        )}
                        {resident.Resident_status === "Tenante"
                          ? "Tenant"
                          : "Owner"}
                      </span>
                    ) : (
                      <span className="text-[#4F4F4F] bg-[#F6F8FB] w-[106px] h-[31px] inline-flex items-center justify-center rounded-[70px]">
                        --
                      </span>
                    )}
                  </td>
                  <td className="text-center px-6 py-4 flex justify-center items-center">
                    {resident.Resident_status !== "Owner" &&
                      resident.UnitStatus !== "Occupied" &&
                      resident.Resident_status !== "Tenante" ? (
                      <div className="text-[#4F4F4F] bg-[#F6F8FB] w-[106px] h-[31px] flex  items-center justify-center rounded-[70px]">
                        <span className="text-[#4F4F4F]">--</span>
                      </div>
                    ) : (
                      <td className="px-4 py-[18px] text-center text-[#4F4F4F] text-[16px]">
                        {resident.Phone_number}
                      </td>
                    )}
                  </td>
                  <td>
                    {resident.Resident_status !== "Owner" &&
                      resident.UnitStatus !== "Occupied" &&
                      resident.Resident_status !== "Tenante" ? (
                      <div className="flex items-center justify-center ps-4 py-[16px] max-sm:min-w-[180px] md:min-w-[180px] max-md:min-w-[180px]">
                        <span className="text-[#4F4F4F]  bg-[#F6F8FB] w-[28px] h-[28px] rounded-full flex justify-center items-center">
                          -
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center ps-4 py-[16px] max-sm:min-w-[180px] md:min-w-[180px] max-md:min-w-[180px]">
                        <span className="text-[#4F4F4F]  bg-[#F6F8FB] w-[28px] h-[28px] rounded-full flex justify-center items-center">
                          {resident.Member_Counting_Total}
                        </span>
                      </div>
                    )}
                  </td>
                  <td>
                    {resident.Resident_status !== "Owner" &&
                      resident.UnitStatus !== "Occupied" &&
                      resident.Resident_status !== "Tenante" ? (
                      <div className="flex items-center justify-center ps-4 py-[16px] max-sm:min-w-[180px] md:min-w-[180px] max-md:min-w-[180px]">
                        <span className="text-[#4F4F4F]  bg-[#F6F8FB] w-[28px] h-[28px] rounded-full flex justify-center items-center">
                          -
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center ps-4 py-[16px] max-sm:min-w-[180px] md:min-w-[180px] max-md:min-w-[180px]">
                        <span className="text-[#4F4F4F]  bg-[#F6F8FB] w-[28px] h-[28px] rounded-full flex justify-center items-center">
                          {resident.Vehicle_Counting_Total}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="text-center">
                    {resident.Resident_status !== "Owner" &&
                      resident.UnitStatus !== "Occupied" &&
                      resident.Resident_status !== "Tenante" ? (
                      <div className="flex items-center justify-center max-sm:min-w-[180px] max-md:min-w-[180px]">
                        <span className="text-[#4F4F4F] bg-[#F6F8FB] w-[106px] h-[31px] inline-flex items-center justify-center rounded-[70px]">
                          -
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className="cursor-pointer text-green-500 hover:text-green-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                          onClick={() => handleEdit(resident)}
                        >
                          <img src={edit} />
                        </button>
                        <button
                          className="cursor-pointer text-green-500 hover:text-green-700 bg-[#F6F8FB] w-[40px] h-[40px] rounded-[10px] flex justify-center items-center"
                          onClick={() => handleView(resident)}
                        >
                          <img src={eye} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddResidentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveResident}
        resident={selectedResident}
        mode="edit"
        setShowVacateModal={setShowVacateModal}
      />

      <VacateModal
        showVacateModal={showVacateModal}
        setShowConfirmModal={setShowConfirmModal}
        onClose={() => setShowVacateModal(false)}
      />

      <ConfirmationModal
        showConfirmModal={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setShowVacateModal(false);
        }}
      />

      <ViewResidentModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        resident={viewResident}
      />
    </div>
  );
}
