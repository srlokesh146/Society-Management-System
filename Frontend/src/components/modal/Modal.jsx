import React, { useState, useEffect } from "react";
import { AddImpNumber, UpdateImpNumber } from "../../services/impNumberService";
import toast from "react-hot-toast";

export default function Modal({ contact, onClose, fetchImportantNumbers }) {
  const [formData, setFormData] = useState({
    Full_name: "",
    Phone_Number: "",
    Work: "",
  });
  
  const [errors, setErrors] = useState({
    Full_name: "",
    Phone_Number: "",
    Work: "",
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        Full_name: contact.Full_name,
        Phone_Number: contact.Phone_Number,
        Work: contact.Work,
      });
    }
  }, [contact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSave = async () => {
    let formErrors = { Full_name: "", Phone: "", Work: "" };

    if (!formData.Full_name) {
      formErrors.Full_name = "Full name is required.";
    }
    if (!formData.Phone_Number) {
      formErrors.Phone_Number = "Phone Number is required.";
    }
    if (!formData.Work) {
      formErrors.Work = "Work is required.";
    }

    setErrors(formErrors);

    if (!formErrors.Full_name && !formErrors.Phone_Number && !formErrors.Work) {
      try {
        const response = await AddImpNumber(formData);
        fetchImportantNumbers();
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setFormData({
          Full_name: "",
          Phone_Number: "",
          Work: "",
        });
        setErrors({
          Full_name: "",
          Phone_Number: "",
          Work: "",
        });
        onClose();
      }
    }
  };

  const handleUpdate = async (id) => {
    let formErrors = { Full_name: "", Phone: "", Work: "" };

    if (!formData.Full_name) {
      formErrors.Full_name = "Full name is required.";
    }
    if (!formData.Phone_Number) {
      formErrors.Phone_Number = "Phone Number is required.";
    }
    if (!formData.Work) {
      formErrors.Work = "Work is required.";
    }

    setErrors(formErrors);

    if (!formErrors.Full_name && !formErrors.Phone_Number && !formErrors.Work) {
      try {
        const response = await UpdateImpNumber(id, formData);
        fetchImportantNumbers();
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setFormData({
          Full_name: "",
          Phone_Number: "",
          Work: "",
        });
        setErrors({
          Full_name: "",
          Phone_Number: "",
          Work: "",
        });
        onClose();
      }
    }
  };

  const isFormComplete = formData.name && formData.phone && formData.job;

  return (
<<<<<<< Updated upstream
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[99]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[410px]">
        <h2 className="text-xl font-semibold mb-[10px] border-b border-[#F4F4F4] pb-[10px]">
          {contact ? "Edit Important Number" : "Add Important Number"}
        </h2>
        <div className="pb-[30px]">
          <label className="text-[#202224] font-medium pb-[5px] leading-[21px]">
            Full Name
          </label>
=======
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[9999]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[410px] sm:max-w-[90%] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] h-auto sm:h-auto md:h-auto lg:h-auto">
        <h2 className="text-xl sm:text-2xl md:text-2xl font-semibold mb-[10px] border-b border-[#F4F4F4] pb-[10px]">
          {contact ? 'Edit Important Number' : 'Add Important Number'}
        </h2>
        <div className='pb-[30px] max-sm:pb-[20px] max-md:pb-[20px]'>
          <label className="text-[#202224] font-medium pb-[5px] leading-[21px] text-sm sm:text-base">Full Name</label>
>>>>>>> Stashed changes
          <input
            type="text"
            name="Full_name"
            value={formData.Full_name}
            onChange={handleInputChange}
<<<<<<< Updated upstream
            placeholder="Enter Full name"
            className="w-full p-2 border border-[#000] rounded-lg outline-none"
=======
            placeholder="Enter Full Name"
            className="w-full p-2 border border-[#000] rounded-lg outline-none text-sm sm:text-base"
>>>>>>> Stashed changes
          />
          {errors.Full_name && (
            <span className="text-red-500 text-sm">{errors.Full_name}</span>
          )}
        </div>

<<<<<<< Updated upstream
        <div className="pb-[30px]">
          <label className="text-[#202224] font-medium pb-[5px] leading-[21px]">
            Phone Number
          </label>
=======
        <div className='pb-[30px] max-sm:pb-[20px] max-md:pb-[20px]'>
          <label className="text-[#202224] font-medium pb-[5px] leading-[21px] text-sm sm:text-base">Phone Number</label>
>>>>>>> Stashed changes
          <input
            type="text"
            name="Phone_Number"
            value={formData.Phone_Number}
            onChange={handleInputChange}
            placeholder="+91"
            className="w-full p-2 border border-[#000] rounded-lg outline-none text-sm sm:text-base"
          />
          {errors.Phone_Number && (
            <span className="text-red-500 text-sm">{errors.Phone_Number}</span>
          )}
        </div>

<<<<<<< Updated upstream
        <div className="pb-[30px]">
          <label className="text-[#202224] font-medium pb-[5px] leading-[21px]">
            Work
          </label>
=======
        <div className='pb-[30px] max-sm:pb-[20px] max-md:pb-[20px]'>
          <label className="text-[#202224] font-medium pb-[5px] leading-[21px] text-sm sm:text-base">Work</label>
>>>>>>> Stashed changes
          <input
            type="text"
            name="Work"
            value={formData.Work}
            onChange={handleInputChange}
            placeholder="Enter Work"
            className="w-full p-2 border border-[#000] rounded-lg outline-none text-sm sm:text-base"
          />
          {errors.Work && (
            <span className="text-red-500 text-sm">{errors.Work}</span>
          )}
        </div>

        <div className="flex justify-between mt-4 flex-col sm:flex-row">
          <button
            className="bg-white py-[13.5px] px-[58.5px] rounded-[10px] mr-2 w-full border border-[#D3D3D3] leading-6 font-medium mb-4 sm:mb-0"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
<<<<<<< Updated upstream
            className="bg-[#F6F8FB] text-black py-[13.5px] px-[58.5px] rounded-[10px] border border-[#D3D3D3] w-full leading-6 font-semibold"
            onClick={() => (contact ? handleUpdate(contact._id) : handleSave())}
=======
            className={`py-[13.5px] px-[58.5px] rounded-[10px] border border-[#D3D3D3] w-full leading-6 font-semibold ${isFormComplete ? 'bg-custom-gradient text-white' : 'bg-[#F6F8FB] text-black'}`}
            onClick={handleSave}
>>>>>>> Stashed changes
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
