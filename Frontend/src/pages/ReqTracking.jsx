import React, { useEffect, useState } from "react";
import { FaEye, FaTrash, FaPen } from "react-icons/fa";
import CreateRequestModal from "../components/modal/CreateRequestModal";
import ViewRequestModal from "../components/modal/ViewRequestModal";
import EditRequestModal from "../components/modal/EditRequestModal";
import DeleteRequestModal from "../components/modal/DeleteRequestModal";
import {
  CreateRequest,
  DeleteRequest,
  GetRequests,
  UpdateRequest,
} from "../services/requestTrackingService";
import toast from "react-hot-toast";

const ReqTracking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [Requests, setRequests] = useState([]);

  let avatar = "https://mighty.tools/mockmind-api/content/human/65.jpg";

  // create new request
  const handleSubmit = async (data) => {
    try {
      const response = await CreateRequest(data);
      toast.success(response.data.message);
      fetchRequests();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // delete request by id
  const handleDelete = async (id) => {
    setRequests(Requests.filter((request) => request._id !== id));
    try {
      const response = await DeleteRequest(id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // update request by id
  const handleUpdate = async (id, data) => {
    try {
      const response = await UpdateRequest(id, data);
      fetchRequests();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsEditModalOpen(false);
    }
  };

  // get all request
  const fetchRequests = async () => {
    try {
      const response = await GetRequests();
      setRequests(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Design
  return (
    <div className="min-h-screen bg-gray-100 max-w-[870px] max-sm:container max-sm:mx-auto max-md:container max-md:mx-auto max-lg:container max-lg:mx-auto 
    xl:max-w-[980px]     
    2xl:max-w-[1200px]   
    3xl:max-w-[2240px]    
    security-table">
      <div className="container mx-auto bg-white rounded-xl shadow-sm p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-[20px] font-semibold text-gray-800 max-xl:mb-0 max-sm:mb-[15px]">Create Request</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 md:mt-0 bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-300"
            >
              Create Request
            </button>
          </div>

          <div className="max-h-[25rem] overflow-y-auto lg:overflow-x-hidden max-md:overflow-x-auto pr-[8px] ps-[20px] custom-scrollbar">
            <table className="w-full text-center">
              <thead>
                <tr className="bg-indigo-50">
                  <th className="px-4 md:px-8 py-3 text-md font-bold text-black-500">Requester Name</th>
                  <th className="px-4 md:px-8 py-3 text-md font-bold text-black-500">Request Name</th>
                  <th className="px-4 md:px-8 py-3 text-md font-bold text-black-500">Description</th>
                  <th className="px-4 md:px-8 py-3 text-md font-bold text-black-500">Request Date</th>
                  <th className="px-4 md:px-8 py-3 text-md font-bold text-black-500">Unit Number</th>
                  <th className="px-4 md:px-8 py-3 text-md font-bold text-black-500">Priority</th>
                  <th className="px-4 md:px-8 py-3 text-md font-bold text-black-500">Status</th>
                  <th className="px-4 md:px-8 py-3 text-md font-bold text-black-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {Requests.map((Request) => (
                  <tr key={Request._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={avatar} alt="" className="w-6 h-6 md:w-8 md:h-8 rounded-full" />
                        <span className="text-sm md:text-md font-semibold text-[#4F4F4F]">
                          {Request.requester}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm md:text-md font-semibold text-[#4F4F4F]">
                      {Request.name}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm md:text-md font-semibold text-[#4F4F4F]">
                      {Request.description}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm md:text-md font-semibold text-[#4F4F4F]">
                      {new Date(Request.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-sm md:text-md text-[#4F4F4F]">
                      <span className="bg-blue-50 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                        {Request.wing}
                      </span>
                      <span className="ml-2 text-sm font-semibold text-gray-600">{Request.unit}</span>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <PriorityBadge priority={Request.priority} />
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <StatusBadge status={Request.status} />
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => { setSelectedRequest(Request); setIsViewModalOpen(true); }}
                                className="p-2 rounded-md bg-blue-50 text-[#5678E9] hover:bg-blue-100">
                          <FaEye size={16} />
                        </button>
                        <button onClick={() => { setSelectedRequest(Request); setIsEditModalOpen(true); }}
                                className="p-2 rounded-md bg-blue-50 text-[#39973D] hover:bg-green-100">
                          <FaPen size={16} />
                        </button>
                        <button onClick={() => { setSelectedRequest(Request); setIsDeleteModalOpen(true); }}
                                className="p-2 rounded-md bg-blue-50 text-[#E74C3C] hover:bg-red-100">
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modals */}
          <CreateRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmit} />
          {selectedRequest && (
            <ViewRequestModal isOpen={isViewModalOpen} onClose={() => { setIsViewModalOpen(false); setSelectedRequest(null); }} Request={selectedRequest} />
          )}
          {selectedRequest && (
            <EditRequestModal isOpen={isEditModalOpen} onClose={() => { setIsEditModalOpen(false); setSelectedRequest(null); }} Request={selectedRequest} onSubmit={handleUpdate} />
          )}
          {selectedRequest && (
            <DeleteRequestModal isOpen={isDeleteModalOpen} onClose={() => { setIsDeleteModalOpen(false); setSelectedRequest(null); }} onDelete={handleDelete} Request={selectedRequest} />
          )}
        </div>
      </div>
    </div>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: "bg-[#E74C3C] text-white font-semibold text-xs",
    Medium: "bg-[#5678E9] text-white font-semibold text-xs",
    Low: "bg-[#39973D] text-white font-semibold text-xs",
  };
  return (
    <p className={`flex items-center justify-center w-[80px] md:w-[100px] h-[24px] md:h-[31px] rounded-full ${styles[priority]}`}>
      {priority}
    </p>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-[#FFC3131A] text-[#FFC313] font-semibold text-xs",
    Solve: "bg-[#39973D1A] text-[#39973D] font-semibold text-xs",
    Open: "bg-[#5678E91A] text-[#5678E9] font-semibold text-xs",
  };
  const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <p className={`flex items-center justify-center w-[80px] md:w-[100px] h-[24px] md:h-[31px] rounded-full ${styles[capitalizedStatus]}`}>
      {capitalizedStatus}
    </p>
  );
};

export default ReqTracking;
