import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import DeleteConfirmModal from "../../components/modal/DeleteConfirmModal"; // Import the modal
import CreateComplaintModal from "../../components/modal/CreateComplaintModal"; // Import the Create Complaint modal
import DeleteRequestModal from "../../components/modal/DeleteRequestModal";
import CreateRequestModal from "../../components/modal/CreateRequestModal";

const ServiceAndComplaint = () => {
    const [activeTab, setActiveTab] = useState("complaint");
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [modalItem, setModalItem] = useState(null); // Track item to delete
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the "Create Complaint" modal visibility
    const [complaints, setComplaints] = useState([ // State to store the list of complaints
        {
            id: 1,
            name: "Unethical Behavior",
            requestdate: "14/07/2004",
            status: "open",
            description: "Regular Waste Collection Services.",
        },
        {
            id: 2,
            name: "Unethical Behavior",
            requestdate: "14/07/2004",
            status: "open",
            description: "Regular Waste Collection Services.",
        },
      
        {
            id: 3,
            name: "Unethical Behavior",
            requestdate: "14/07/2004",
            status: "open",
            description: "Regular Waste Collection Services.",
        },
        {
            id: 4,
            name: "Unethical Behavior",
            requestdate: "14/07/2004",
            status: "open",
            description: "Regular Waste Collection Services.",
        },
        {
            id: 5,
            name: "Unethical Behavior",
            requestdate: "14/07/2004",
            status: "open",
            description: "Regular Waste Collection Services.",
        },
        {
            id: 6,
            name: "Unethical Behavior",
            requestdate: "14/07/2004",
            status: "open",
            description: "Regular Waste Collection Services.",
        },
       
    ]);

    const toggleDropdown = (id) => {
        setDropdownOpen(dropdownOpen === id ? null : id);
    };

    const handleDeleteClick = (item) => {
        setModalItem(item); // Set the item to be deleted
    };

    // Handle deletion confirmation from modal
    const confirmDelete = () => {
        setComplaints((prevData) =>
            prevData.filter((item) => item.id !== modalItem.id)
        ); // Remove item from list
        setModalItem(null); // Close modal
    };

    // Handle adding a new complaint
    const handleCreateComplaint = (newComplaint) => {
        console.log(newComplaint)
        setComplaints((prevComplaints) => [
            ...prevComplaints,
            { ...newComplaint, id: prevComplaints.length + 1 } // Generate a new ID
        ]);
        setIsModalOpen(false); // Close the modal after adding the complaint
    };

    return (
        <div className="container mx-auto p-6 rounded-lg">
            {/* Tabs */}
            <div className="flex">
                <button
                    className={`px-2 py-3 rounded-t-lg ${activeTab === "complaint"
                        ? "bg-custom-gradient text-white"
                        : "bg-white  text-black  border-b-4 border-orange-500"
                        }`}
                    onClick={() => setActiveTab("complaint")}
                >
                    Complaint Submission
                </button>
                
                <button
                    className={`px-2 py-3 rounded-t-lg ${activeTab === "request"
                        ? "bg-custom-gradient text-white"
                        : "bg-white text-black  border-b-4 border-orange-500"
                        }`}
                    onClick={() => setActiveTab("request")}
                >
                    Request Submission
                </button>
            </div>

            {/* Complaint Submission Form */}
            {activeTab === "complaint" && (
                <div className="bg-white rounded-xl shadow-sm p-10 ">
                    <div className="flex justify-between items-center mb-6 max-sm:flex-col">
                        <h1 className="text-[22px] font-semibold text-gray-800 max-xl:mb-0 max-sm:mb-[15px]">
                            Complaint
                        </h1>
                        <button
                            onClick={() => setIsModalOpen(true)} // Open the Create Complaint modal
                            className="bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-4 py-3 rounded-lg hover:opacity-90 transition-all duration-300"
                        >
                            Create Complaint
                        </button>
                    </div>
                    <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {complaints.map((item) => (
                            <div key={item.id} className="border border-grey-800 rounded-lg">
                                <div className="bg-[#5678E9] text-white p-4 flex justify-between items-center rounded-t-lg">
                                    <h2 className="text-sm sm:text-base font-semibold">{item.name}</h2>
                                    <div className="relative">
                                        <button
                                            onClick={() => toggleDropdown(item.id)}
                                            className="hover:opacity-80 text-blue-500 rounded-md p-1 bg-white h-5 w-5 flex items-center justify-center"
                                        >
                                            <FaEllipsisV size={12} />
                                        </button>

                                        {dropdownOpen === item.id && (
                                            <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10 py-1">
                                                <button
                                                    onClick={() => handleDeleteClick(item)}
                                                    className="w-full px-4 py-2 text-sm text-black rounded-lg hover:bg-gray-50 flex items-center"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm sm:text-base text-gray-500">
                                            <span className="font-sm ">Request Date</span>
                                            <p className="text-black text-[15px] ml-auto">{item.requestdate}</p>
                                        </div>
                                        <div className="flex items-center text-sm sm:text-base text-gray-500">
                                            <span className="font-sm  ">Status</span>
                                            <p className="text-blue-500 bg-indigo-50 font-semibold p-1 w-24 text-center rounded-full ml-auto">
                                                {item.status}
                                            </p>
                                        </div>
                                        <div className="justify-between items-center text-sm sm:text-base text-gray-500">
                                            <span className="font-sm ">Description</span>
                                            <p className="text-black font-medium text-[14px] mt-1">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {modalItem && (
                        <DeleteConfirmModal
                            isOpen={!!modalItem}
                            onClose={() => setModalItem(null)} // Close the modal
                            onConfirm={confirmDelete} // Delete the item
                            itemName={modalItem.name} // Pass the item's name to the modal
                        />
                    )}

                    {/* Create Complaint Modal */}
                    {isModalOpen && (
                        <CreateComplaintModal
                            isOpen={isModalOpen} // Pass the modal visibility state
                            onClose={() => setIsModalOpen(false)} // Close the modal
                            onSubmit={handleCreateComplaint} // Pass the function to handle new complaint creation
                        />
                    )}
                </div>
            )}

            {/* Request Submission Form */}
            {activeTab === "request" &&  
                <div className="bg-white rounded-xl shadow-sm p-10 ">
                    <div className="flex justify-between items-center mb-6 max-sm:flex-col">
                        <h1 className="text-[22px] font-semibold text-gray-800 max-xl:mb-0 max-sm:mb-[15px]">
                            Request
                        </h1>
                        <button
                            onClick={() => setIsModalOpen(true)} // Open the Create Complaint modal
                            className="bg-gradient-to-r from-[rgba(254,81,46,1)] to-[rgba(240,150,25,1)] text-white px-4 py-3 rounded-lg hover:opacity-90 transition-all duration-300"
                        >
                            Create Request
                        </button>
                    </div>
                    <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {complaints.map((item) => (
                            <div key={item.id} className="border border-grey-800 rounded-lg">
                                <div className="bg-[#5678E9] text-white p-4 flex justify-between items-center rounded-t-lg">
                                    <h2 className="text-sm sm:text-base font-semibold">{item.name}</h2>
                                    <div className="relative">
                                        <button
                                            onClick={() => toggleDropdown(item.id)}
                                            className="hover:opacity-80 text-blue-500 rounded-md p-1 bg-white h-5 w-5 flex items-center justify-center"
                                        >
                                            <FaEllipsisV size={12} />
                                        </button>

                                        {dropdownOpen === item.id && (
                                            <div className="absolute right-0 mt-2 w-28 bg-white rounded-md shadow-lg z-10 py-1">
                                                <button
                                                    onClick={() => handleDeleteClick(item)}
                                                    className="w-full px-4 py-2 text-sm text-black rounded-lg hover:bg-gray-50 flex items-center"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm sm:text-base text-gray-500">
                                            <span className="font-sm ">Request Date</span>
                                            <p className="text-black text-[15px] ml-auto">{item.requestdate}</p>
                                        </div>
                                        <div className="flex items-center text-sm sm:text-base text-gray-500">
                                            <span className="font-sm  ">Status</span>
                                            <p className="text-blue-500 bg-indigo-50 font-semibold p-1 w-24 text-center rounded-full ml-auto">
                                                {item.status}
                                            </p>
                                        </div>
                                        <div className="justify-between items-center text-sm sm:text-base text-gray-500">
                                            <span className="font-sm ">Description</span>
                                            <p className="text-black font-medium text-[14px] mt-1">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {modalItem && (
                        <DeleteRequestModal
                            isOpen={!!modalItem}
                            onClose={() => setModalItem(null)} // Close the modal
                            onConfirm={confirmDelete} // Delete the item
                            itemName={modalItem.name} // Pass the item's name to the modal
                        />
                    )}

                    {/* Create Complaint Modal */}
                    {isModalOpen && (
                        <CreateRequestModal
                            isOpen={isModalOpen} // Pass the modal visibility state
                            onClose={() => setIsModalOpen(false)} // Close the modal
                            onSubmit={handleCreateComplaint} // Pass the function to handle new complaint creation
                        />
                    )}
                 </div>
                 
                 }
        </div>
    );
};

export default ServiceAndComplaint;
