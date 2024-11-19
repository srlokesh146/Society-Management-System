import React, { useEffect, useState } from "react";
import { FaCheck, FaEye, FaTrash, FaPen } from "react-icons/fa";
import CreateComplaintModal from "../components/modal/CreateComplaintModal";
import ViewComplaintModal from "../components/modal/ViewComplaintModal";
import EditComplaintModal from "../components/modal/EditComplaintModal";
import DeleteConfirmModal from "../components/modal/DeleteConfirmModal";
import {
  CreateComplaint,
  DeleteComplaint,
  GetComplaints,
  UpdateComplaint,
} from "../services/complaintService";
import { toast } from "react-hot-toast";
import eye from "../assets/images/eye.svg";
import edit from "../assets/images/edit.svg";
import trash from "../assets/images/trash.svg";

const ComplaintPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  let avatar = "https://mighty.tools/mockmind-api/content/human/65.jpg";

  const handleSubmit = async (data) => {
    try {
      const response = await CreateComplaint(data);
      toast.success(response.data.message);
      fetchComplaints();
      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    setComplaints(complaints.filter((complaint) => complaint._id !== id));
    try {
      const response = await DeleteComplaint(id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const response = await UpdateComplaint(id, data);
      fetchComplaints();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsEditModalOpen(false);
    }
  };

  const fetchComplaints = async () => {
    try {
      const response = await GetComplaints();
      setComplaints(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 max-sm:flex-col">
            <h1 className="text-[20px] font-semibold text-gray-800 max-xl:mb-0 max-sm:mb-[15px]">
              Create Complaint
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className=" bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-4 py-2 rounded-md hover:opacity-90 transition-all duration-300"
            >
              Create Complaint
            </button>
          </div>

          <div className="overflow-x-auto ">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-indigo-50 rounded-lg overflow-hidden">
                  <th className="text-left px-8 py- text-md  font-semibold text-black-500 first:rounded-l-lg last:rounded-r-lg">
                    Complainer Name
                  </th>
                  <th className="text-left px-9 py-3 text-md font-semibold text-black-500">
                    Complaint Name
                  </th>
                  <th className="text-left px-24 py-3 text-md font-semibold text-black-500">
                    Description
                  </th>
                  {/* <th className="text-left px-4 py-3 text-md font-medium text-black-500">Complaint Date</th> */}
                  <th className="text-left px-4 py-3 text-md font-semibold text-black-500">
                    Unit Number
                  </th>
                  <th className="text-left px-7  py-3 text-md font-semibold text-black-500">
                    Priority
                  </th>
                  <th className="text-left px-8    py-3 text-md font-semibold text-black-500">
                    Status
                  </th>
                  <th className="text-left px-14 py-3 text-md font-semibold text-black-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={avatar}
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-md font-medium  text-[#4F4F4F]">
                          {complaint.complainer}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-md font-medium text-[#4F4F4F]">
                      {complaint.name}
                    </td>
                    <td className="px-6 py-4 text-md font-medium text-[#4F4F4F]">
                      {complaint.description}
                    </td>

                    {/* <td className="px-6 py-4 text-md font-medium text-[#4F4F4F]">{complaint.requestDate}</td> */}
                    <td className="px-6 py-4  text-[#4F4F4F]">
                      <div className="flex items-center gap-2">
                        <span
                          className={`bg-blue-50 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold`}
                        >
                          {complaint.wing}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                          {complaint.unit}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4  text-[#4F4F4F]">
                      <PriorityBadge priority={complaint.priority} />
                    </td>
                    <td className="px-6 py-4  text-[#4F4F4F]">
                      <StatusBadge status={complaint.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setIsViewModalOpen(true);
                          }}
                          className="cursor-pointer text-blue-500 hover:text-blue-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                        >
                          <img src={eye} alt="" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setIsEditModalOpen(true);
                          }}
                          className="cursor-pointer text-green-500 hover:text-green-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                        >
                          <img src={edit} alt=""/>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedComplaint(complaint);
                            setIsDeleteModalOpen(true);
                          }}
                          className="cursor-pointer text-red-500 hover:text-red-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                        >
                          <img src={trash} alt=""/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Create Modal */}
          <CreateComplaintModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmit}
            />
            {/* Edit Modal */}
            {selectedComplaint && (
              <EditComplaintModal
                isOpen={isEditModalOpen}
                onClose={() => {
                  setIsEditModalOpen(false);
                  setSelectedComplaint(null);
                }}
                complaint={selectedComplaint}
                onSubmit={handleUpdate}
              />
            )}

          {/* View Modal */}
          {selectedComplaint && (
            <ViewComplaintModal
              isOpen={isViewModalOpen}
              onClose={() => {
                setIsViewModalOpen(false);
                setSelectedComplaint(null);
              }}
              complaint={selectedComplaint}
            />
          )}


          {/* Delete Modal */}
          {selectedComplaint && (
            <DeleteConfirmModal
              isOpen={isDeleteModalOpen}
              onClose={() => {
                setIsDeleteModalOpen(false);
                setSelectedComplaint(null);
              }}
              onDelete={handleDelete}
              complaint={selectedComplaint}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const PriorityBadge = ({ priority }) => {
  const styles = {
    High: "bg-[#E74C3C] text-white font-medium  text-xs ",
    Medium: "bg-[#5678E9] text-white font-medium text-xs",
    Low: "bg-[#39973D] text-white font-medium text-xs",
  };
  return (
    <p className={`flex items-center justify-center w-[100px] h-[31px] rounded-full text-xs ${styles[priority]}`}>
      {priority}
    </p>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-[#FFC3131A] text-[#FFC313] font-medium text-xs",
    Solve: "bg-[#39973D1A] text-[#39973D] font-medium text-xs",
    Open: "bg-[#5678E91A] text-[#5678E9] font-medium text-xs",
  };

  const lowercaseStatus = status.toLowerCase();
  const capitalizedStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <p className={`flex items-center justify-center w-[100px] h-[31px]  rounded-full ${styles[capitalizedStatus]}`}>
      {capitalizedStatus}
    </p>
  );
};

export default ComplaintPage;
