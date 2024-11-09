import React from 'react';

const CreateIncomeModal = ({ isModalOpen, setIsModalOpen, handleSubmit, title, date, dueDate, description, amount, handleInputChange, isFormValid }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[400px] flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Create Other Income</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-black-600 mb-1">Title*</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Enter Title"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-black-600 mb-1">Date*</label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-black-600 mb-1">Due Date*</label>
                <input
                  type="date"
                  name="dueDate"
                  value={dueDate}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg px-3 py-2"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-black-600 mb-1">Description*</label>
              <textarea
                name="description"
                value={description}
                onChange={handleInputChange}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Enter Description"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-black-600 mb-1">Amount*</label>
              <div className="relative">
                <span className="absolute left-3 top-2">₹</span>
                <input
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={handleInputChange}
                  className="w-full border rounded-lg pl-7 pr-3 py-2"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>
            <div className="border-t w-full mt-auto">
              <div className="flex gap-4 p-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 text-gray-600 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-4 py-3 rounded-lg ${
                    isFormValid
                      ? 'bg-gradient-to-r from-[#FE512E] to-[#F09619] text-white hover:opacity-90'
                      : 'bg-[#F6F8FB] text-black-400 cursor-not-allowed'
                  }`}
                  disabled={!isFormValid}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIncomeModal;