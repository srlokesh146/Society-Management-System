import React, { useState, useEffect } from 'react';

export default function Modal({ contact, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    job: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    job: '',
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        phone: contact.phone,
        job: contact.job,
      });
    }
  }, [contact]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSave = () => {
    let formErrors = { name: '', phone: '', job: '' };

    if (!formData.name) {
      formErrors.name = 'Full Name is required.';
    }
    if (!formData.phone) {
      formErrors.phone = 'Phone Number is required.';
    }
    if (!formData.job) {
      formErrors.job = 'Work is required.';
    }

    setErrors(formErrors);

    if (!formErrors.name && !formErrors.phone && !formErrors.job) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-[99]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[410px]">
        <h2 className="text-xl font-semibold mb-[10px] border-b border-[#F4F4F4] pb-[10px]">
          {contact ? 'Edit Important Number' : 'Add Important Number'}
        </h2>
        <div className='pb-[30px]'>
          <label className="text-[#202224] font-medium pb-[5px] leading-[21px]">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter Full Name"
            className="w-full p-2 border border-[#000] rounded-lg outline-none"
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        <div className='pb-[30px]'>
          <label className="text-[#202224] font-medium pb-[5px] leading-[21px]">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+91"
            className="w-full p-2 border border-[#000] rounded-lg outline-none"
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>

        <div className='pb-[30px]'>
          <label className="text-[#202224] font-medium pb-[5px] leading-[21px]">Work</label>
          <input
            type="text"
            name="job"
            value={formData.job}
            onChange={handleInputChange}
            placeholder="Enter Work"
            className="w-full p-2 border border-[#000] rounded-lg outline-none "
          />
          {errors.job && <span className="text-red-500 text-sm">{errors.job}</span>}
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="bg-white py-[13.5px] px-[58.5px] rounded-[10px] mr-2 w-full border border-[#D3D3D3] leading-6 font-medium"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#F6F8FB] text-black py-[13.5px] px-[58.5px] rounded-[10px] border border-[#D3D3D3] w-full leading-6 font-semibold"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
