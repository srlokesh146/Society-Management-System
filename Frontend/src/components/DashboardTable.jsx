import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import ViewComplaintModal from "./modal/ViewComplaintModal";
import complainimages from "../assets/images/complainimage.png";
import DeleteConfirmationModal from "./modal/DeleteConfirmationModal";
import {
  DeleteComplaint,
  GetComplaints,
  UpdateComplaint,
} from "../services/complaintService";
import EditComplaintModal from "./modal/EditComplaintModal";
import { toast } from "react-hot-toast";

const getPriorityBackgroundColor = (priority) => {
  switch (priority) {
    case "Medium":
      return "bg-[#5678E9]";
    case "High":
      return "bg-[#39973D]";
    case "Low":
      return "bg-[#E74C3C]";
    default:
      return "";
  }
};

const DashboardTable = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [complaintList, setComplaintList] = useState([]);
  let avatar = "https://mighty.tools/mockmind-api/content/human/65.jpg";

  const onEdit = (complaint) => {
    setCurrentComplaint(complaint);
    setEditModalOpen(true);
  };

  const onView = (complaint) => {
    setCurrentComplaint(complaint);
    setViewModalOpen(true);
  };

  const onSave = async (id, updatedComplaint) => {
    try {
      const response = await UpdateComplaint(id, updatedComplaint);
      fetchComplaints();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setEditModalOpen(false);
    }
  };

  const onCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentComplaint(null);
  };

  const onCloseViewModal = () => {
    setViewModalOpen(false);
    setCurrentComplaint(null);
  };

  const handleDeleteContact = (complaint) => {
    setCurrentComplaint(complaint);
    setDeleteModalOpen(true);
  };

  const onDelete = async () => {
    setComplaintList(
      complaintList.filter(
        (complaint) => complaint._id !== currentComplaint._id
      )
    );
    try {
      const response = await DeleteComplaint(currentComplaint._id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      isDeleteModalOpen(false);
    }
  };

  const onCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setCurrentComplaint(null);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Open":
        return "bg-[#5678E91A] text-[#5678E9]";
      case "Pending":
        return "bg-[#FFC3131A] text-[#FFC313]";
      case "Solved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-[#39973D1A] text-[#39973D]";
    }
  };

  // get complaint list
  const fetchComplaints = async () => {
    try {
      const response = await GetComplaints();
      setComplaintList(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="bg-white pt-[20px] rounded-[15px] col-span-2 max-2xl:col-span-4">
      <div className="flex justify-between items-center mb-[27px] ps-[20px] pr-[20px]">
        <div>
          <h2 className="text-[20px] font-semibold leading-4 max-sm:text-[16px] max-mb:text-[18px]">
            Complaint List
          </h2>
        </div>
        <div>
          <select
            id="month-select"
            className="text-[15px] border border-gray-300 rounded-lg px-2 py-1 text-gray-700 flex items-center outline-none w-[114px]"
          >
            <option value="" disabled defaultValue>
              Month
            </option>
            <option
              value="last-week"
              className="text-[15px] max-sm:text-[15px] bg-custom-gradient"
            >
              Last Week
            </option>
            <option
              value="last-month"
              className="text-[15px] max-sm:text-[15px]"
            >
              Last Month
            </option>
            <option
              value="last-year"
              className="text-[15px] max-sm:text-[15px]"
            >
              Last Year
            </option>
          </select>
        </div>
      </div>

      <div className="max-h-64 overflow-y-auto max-md:overflow-x-auto pr-[8px] ps-[20px] custom-scrollbar">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-start text-black bg-opacity-custom rounded-tl-[15px] rounded-tr-[15px] bg-gray-100 h-[61px] #F4F4F4">
              <th className="text-[14px] leading-[21px] font-semibold rounded-tl-[15px] text-start ps-[20px] max-sm:min-w-[180px] md:min-w-[180px] max-md:min-w-[180px]">
                Complainer Name
              </th>
              <th className="text-[14px] leading-[21px] font-semibold text-start max-sm:min-w-[180px] md:min-w-[166px] max-md:min-w-[180px]">
                Complaint Name
              </th>
              <th className="text-[14px] leading-[21px] font-semibold text-center max-sm:min-w-[180px] md:min-w-[166px] max-md:min-w-[180px]">
                Date
              </th>
              <th className="text-[14px] leading-[21px] font-semibold text-center max-sm:min-w-[180px] md:min-w-[166px] max-md:min-w-[180px]">
                Priority
              </th>
              <th className="text-[14px] leading-[21px] font-semibold text-center max-sm:min-w-[180px] md:min-w-[166px] max-md:min-w-[180px]">
                Complain Status
              </th>
              <th className="text-[14px] leading-[21px] font-semibold rounded-tr-[15px] text-center max-sm:min-w-[180px] md:min-w-[166px] max-md:min-w-[180px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody >
            {complaintList.map((complaint) => (
              <tr
                key={complaint._id}
                className="border-b border-[#F4F4F4] "
              >
                <td>
                  <div className="flex items-center justify-start ps-4 py-[16px] max-sm:min-w-[180px] md:min-w-[180px] max-md:min-w-[180px]">
                    <img
                      src={avatar}
                      alt="Profile"
                      className="rounded-full mr-2 w-8 h-8"
                    />
                    <span>{complaint.complainer}</span>
                  </div>
                  {/* <span className="truncate">{complaint.complainerName}</span> */}
                </td>
                <td className="text-center max-sm:min-w-[180px] md:min-w-[120px] max-md:min-w-[180px]">
                  {complaint.name}
                </td>
                <td className="text-center max-sm:min-w-[180px] md:min-w-[120px] max-md:min-w-[180px]">
                  {new Date(complaint.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="text-center max-sm:min-w-[180px] md:min-w-[120px] max-md:min-w-[180px]">
                  <button
                    className={`rounded-full text-white text-[14px] py-[5px] px-[21px] w-[100px] text-center ${getPriorityBackgroundColor(
                      complaint.priority
                    )}`}
                    title={`Priority: ${complaint.priority}`}
                  >
                    {complaint.priority}
                  </button>
                </td>
                <td className="py-3 text-center max-sm:min-w-[180px] md:min-w-[120px] max-md:min-w-[180px]">
                  <button
                    className={`text-[14px] font-medium leading-[21px] inline-block py-1 px-2 rounded-full w-[113px] h-[31px] ${getStatusStyle(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </button>
                </td>
                <td className="space-x-[10px] text-center flex justify-center items-start h-[40px] pt-[13px] max-sm:min-w-[180px] md:min-w-[120px] max-md:min-w-[180px]">
                  <FaEdit
                    className="cursor-pointer text-blue-500 hover:text-blue-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                    onClick={() => onEdit(complaint)}
                    title="Edit"
                  />
                  <FaEye
                    className="cursor-pointer text-green-500 hover:text-green-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                    onClick={() => onView(complaint)}
                    title="View"
                  />
                  <FaTrashAlt
                    className="cursor-pointer text-red-500 hover:text-red-700 bg-[#F6F8FB] w-[40px] h-[40px] p-[10px] rounded-[10px]"
                    title="Delete"
                    onClick={() => handleDeleteContact(complaint)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditComplaintModal
        isOpen={isEditModalOpen}
        onClose={onCloseEditModal}
        complaint={currentComplaint}
        onSubmit={onSave}
      />
      <ViewComplaintModal
        isOpen={isViewModalOpen}
        onClose={onCloseViewModal}
        complaint={currentComplaint}
        complainimage={complainimages}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onCloseDeleteModal}
        onDelete={onDelete}
      />
    </div>
  );
};

export default DashboardTable;
