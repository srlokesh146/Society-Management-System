import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEllipsisV, FaTimes } from "react-icons/fa";
import {
  CreateIncome,
  DeleteIncome,
  GetIncomes,
  UpdateIncome,
} from "../services/incomeService";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addNewNotification } from "../redux/features/notificationSlice";
import { Loader } from "../utils/Loader";

const OtherIncome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    dueDate: "",
    description: "",
    amount: "",
  });

  const [incomeEntries, setIncomeEntries] = useState([]);
  const [activeTab, setActiveTab] = useState("otherIncome");
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const isFormValid =
    formData.title &&
    formData.date &&
    formData.dueDate &&
    formData.description &&
    formData.amount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    try {

      setIsLoading(true)
      const response = await CreateIncome(formData);
      fetchIncome();

      const notification = {
        _id: response.data.notification._id,
        title: response.data.notification.title,
        name: response.data.notification.name,
        message: response.data.notification.message,
        date: response.data.notification.date,
      };

      dispatch(addNewNotification(notification));
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false)
      setFormData({
        title: "",
        date: "",
        dueDate: "",
        description: "",
        amount: "",
      });
      setIsModalOpen(false);
    }
  };

  const handleEdit = (id) => {
    const entry = incomeEntries.find((entry) => entry._id === id);
    setSelectedEntry(entry);
    setFormData(entry);
    setEditModalOpen(true);
    toggleDropdown(id);
  };

  const handleDelete = (id) => {
    const entry = incomeEntries.find((entry) => entry._id === id);
    setSelectedEntry(entry);
    setDeleteModalOpen(true);
    toggleDropdown(id);
  };


  const handleView = (id) => {

    navigate(`/adminincome/${id}`);
    const entry = incomeEntries.find((entry) => entry._id === id);
    setSelectedEntry(entry);
    setViewModalOpen(true);
    toggleDropdown(id);
  };

  const confirmDelete = async () => {
    try {
      setIncomeEntries(
        incomeEntries.filter((entry) => entry._id !== selectedEntry._id)
      );
      const response = await DeleteIncome(selectedEntry._id);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setDeleteModalOpen(false);
      setSelectedEntry(null);
    }
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await UpdateIncome(selectedEntry._id, formData);
      fetchIncome();
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false)
      setFormData({
        title: "",
        date: "",
        dueDate: "",
        description: "",
        amount: "",
      });
      setEditModalOpen(false);
      setSelectedEntry(null);
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      date: "",
      dueDate: "",
      description: "",
      amount: "",
    });
    setIsModalOpen(false);
  };

  const handleEditCancel = () => {
    setFormData({
      title: "",
      date: "",
      dueDate: "",
      description: "",
      amount: "",
    });
    setEditModalOpen(false);
  };

  const fetchIncome = async () => {
    try {
      setIsLoading(true)
      const response = await GetIncomes();
      setIncomeEntries(response.data.Income);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <div className="p-6">
      <div className="">
        <button
          className={`px-4 py-2 rounded-sm h-14 shadow-md transition duration-200 ${activeTab === "income"
            ? "bg-orange-500 text-white"
            : "bg-white-200 text-black"
            }`}
          onClick={() => navigate("/income")}
        >
          Maintenance
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow-sm  h-14 transition duration-200 ${activeTab === "otherIncome"
            ? "bg-custom-gradient text-white"
            : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
          onClick={() => setActiveTab("otherIncome")}
        >
          Other Income
        </button>
      </div>

      <div className="flex flex-col rounded-lg p-8 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-4 max-sm:flex-col">
          <h2 className="text-[20px] font-semibold text-gray-800 max-sm:mb-3">
            Other Income
          </h2>
          <button
            className="px-4 py-2 bg-custom-gradient text-white rounded-lg hover:bg-orange-600"
            onClick={() => setIsModalOpen(true)}
          >
            Create Other Income
          </button>
        </div>

        <div className="grid grid-cols-4 max-xl:grid-cols-2 max-sm:grid-cols-1 max-2xl:grid-cols-2 max-3xl:grid-cols-2 gap-5 mt-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center py-12">
              <Loader />
            </div>
          ) : incomeEntries.length > 0 ? (
            incomeEntries.map((entry) => (
              <div
                key={entry._id}
                className="bg-white h-80 shadow-xl rounded-lg border border-blue-300 relative"
              >
                <div className="bg-[#5678E9] text-white w-full p-2 flex justify-between items-center rounded-t-lg">
                  <h3 className="text-lg font-semibold">{entry.title}</h3>
                  <button
                    className="text-blue-500 bg-white p-1 rounded-md h-5 w-5"
                    onClick={() => toggleDropdown(entry._id)}
                  >
                    <FaEllipsisV size={12} />
                  </button>
                </div>
                {dropdownOpen === entry._id && (
                  <div className="absolute right-0 mt-[-10px] mr-2 w-[100px] h-32 bg-white border rounded-lg shadow-lg z-10">
                    <ul className="py-2">
                      <li
                        className="px-4 py-2 text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleEdit(entry._id)}
                      >
                        Edit
                      </li>
                      <li
                        className="px-4 py-2 text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleDelete(entry._id)}
                      >
                        Delete
                      </li>
                      <li
                        className="px-4 py-2 text-gray-600 cursor-pointer hover:text-black"
                        onClick={() => handleView(entry._id)}
                      >
                        View
                      </li>
                    </ul>
                  </div>
                )}
                <p className="text-gray-600 flex justify-between items-center p-2">
                  Amount Per Member:
                  <p className="text-blue-500 font-semibold bg-indigo-50 rounded-full px-5 py-1 ">
                    ₹ {entry.amount}
                  </p>
                </p>
                <p className="text-gray-600 flex justify-between items-center p-2">
                  Total Members:
                  <p className="text-black font-medium">{entry?.member} </p>
                </p>
                <p className="text-gray-600 flex justify-between items-center p-2">
                  Date:{" "}
                  <p className="text-black font-medium">
                    {new Date(entry.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </p>

                <p className="text-gray-600 flex justify-between items-center p-2">
                  Due Date:{" "}
                  <p className="text-black font-semibold">
                    {new Date(entry.dueDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                </p>
                <p className="text-gray-600 p-2 mt-2 text-sm">
                  Description: <br />
                  <p className="text-black font-medium">
                    {entry.description.length > 100
                      ? entry.description.slice(0, 100) + "..."
                      : entry.description}
                  </p>
                </p>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-4 text-gray-500">No data found.</div>
          )}
        </div>

      </div>

      {/* Add Income Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg h-[500px] w-[400px]">
            <h2 className="text-xl font-semibold mb-2 text-start">
              Create Other Income
            </h2>
            <div className="border-b border-[#F4F4F4] mb-[10px]"></div>
            <form onSubmit={handleApply} className="space-y-4">
              <div className="w-full">
                <label className="font-semibold" htmlFor="title">
                  Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  placeholder="Enter title"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="justify-center flex gap-4">
                <div>
                  <label className="font-semibold" htmlFor="date">
                    Date*
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      className="w-[170px] p-2 border border-gray-300 rounded-lg pr-10"
                      onChange={handleInputChange}
                      required
                    />
                    <span
                      className="absolute right-3 top-2 cursor-pointer"
                      onClick={() =>
                        document.querySelector('input[name="date"]').focus()
                      }
                    ></span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold" htmlFor="dueDate">
                    Due Date*
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      className="w-[170px]  border border-gray-300 rounded-lg p-2 pr-10"
                      onChange={handleInputChange}
                      required
                    />
                    <span
                      className="absolute right-3 top-2 cursor-pointer"
                      onClick={() =>
                        document.querySelector('input[name="dueDate"]').focus()
                      }
                    ></span>
                  </div>
                </div>
              </div>
              <div>
                <label className="font-semibold" htmlFor="description">
                  Description*
                </label>
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="font-semibold" htmlFor="amount">
                  Amount*
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  placeholder="₹ 0000"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-[#FFFFF] border text-black px-4 py-3 rounded-lg w-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`border px-4 py-3 rounded-lg w-full ${isFormValid
                    ? "bg-custom-gradient text-white"
                    : "bg-[#F6F8FB] text-black"
                    }`}
                  disabled={!isFormValid}
                >
                  {isLoading ? <Loader />
                    : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] h-[420px]">
            <h2 className="text-xl font-semibold mb-2 text-left">
              Edit {formData.title}
            </h2>
            <div className="border-b border-[#F4F4F4] mb-[10px]"></div>
            <form onSubmit={saveEdit} className="space-y-4">
              {/* amount */}
              <div className="w-full">
                <label className="font-semibold" htmlFor="amount">
                  Amount*
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* date and due date */}
              <div className="justify-center flex gap-2">
                <div>
                  <label className="font-semibold" htmlFor="date">
                    Date*
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="date"
                      defaultValue={
                        formData?.date
                          ? new Date(formData.date).toISOString().split("T")[0]
                          : ""
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg "
                      onChange={handleInputChange}
                      required
                    />
                    <span
                      className="absolute right-3 top-2 cursor-pointer"
                      onClick={() =>
                        document.querySelector('input[name="date"]').focus()
                      }
                    ></span>
                  </div>
                </div>

                <div>
                  <label className="font-semibold" htmlFor="dueDate">
                    Due Date*
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dueDate"
                      defaultValue={
                        formData?.dueDate
                          ? new Date(formData.dueDate)
                            .toISOString()
                            .split("T")[0]
                          : ""
                      }
                      className="w-full border border-gray-300 rounded-lg p-2 "
                      onChange={handleInputChange}
                      required
                    />
                    <span
                      className="absolute right-3 top-2 cursor-pointer"
                      onClick={() =>
                        document.querySelector('input[name="dueDate"]').focus()
                      }
                    ></span>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <label className="font-semibold" htmlFor="description">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex justify-between gap-6">
                <button
                  type="button"
                  onClick={handleEditCancel}
                  className="bg-gray-300 text-black px-4 py-3 rounded-lg w-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`border px-4 py-3 rounded-lg w-full ${isFormValid
                    ? "bg-custom-gradient text-white"
                    : "bg-[#F6F8FB] text-black"
                    }`}
                  disabled={!isFormValid}
                >
                  {isLoading ? <Loader />
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-2">Delete confirmation?</h2>
            <div className="border-b border-[#F4F4F4] mb-[10px]"></div>
            <p className="text-gray-600">
              Are you sure you want to delete {selectedEntry?.title}?
            </p>
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-white border w-[170px] text-black px-2 py-3 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 w-[170px] text-white px-2 py-3 rounded-md hover:bg-red-600"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherIncome;
