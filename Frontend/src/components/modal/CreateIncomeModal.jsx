import React from 'react';

const CreateIncomeModal = ({ isOpen, onClose, formData, handleInputChange, handleSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create Other Income</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-black-600 mb-1">Title*</label>
              <input
                name="title"
                type="text"
                placeholder="Enter Title"
                className="w-full p-2 border border-gray-200 rounded-lg"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-black-600 mb-1">Date*</label>
              <input
                name="date"
                type="date"
                className="w-full p-2 border border-gray-200 rounded-lg"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-black-600 mb-1">Due Date*</label>
              <input
                name="dueDate"
                type="date"
                className="w-full p-2 border border-gray-200 rounded-lg"
                value={formData.dueDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-black-600 mb-1">Description*</label>
              <textarea
                name="description"
                placeholder="Enter Description"
                className="w-full p-2 border border-gray-200 rounded-lg"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-black-600 mb-1">Amount*</label>
              <div className="relative">
                <span className="absolute left-3 top-2">₹</span>
                <input
                  name="amount"
                  type="number"
                  placeholder="0.00"
                  className="w-full p-2 pl-7 border border-gray-200 rounded-lg"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className='flex gap-5'>
           <button type="submit" className="bg-white text-black w-[190px] px-4 py-2 border  rounded-md">cancel</button>
           <button type="submit" className="bg-[#F6F8FB] font-semibold text-black px-4 py-2 w-[190px] border rounded-md">save</button>
           </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIncomeModal;