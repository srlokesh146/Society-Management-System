import React, { useState, useEffect } from 'react';

const EditIncomeModal = ({ isOpen, onClose, entry, handleInputChange, handleSubmit }) => {
  if (!isOpen) return null;

  const [localEntry, setLocalEntry] = useState(entry);

  useEffect(() => {
    setLocalEntry(entry);
  }, [entry]);

  const handleLocalChange = (e) => {
    const { name, value } = e.target;
    setLocalEntry({ ...localEntry, [name]: value });
    handleInputChange(e);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Income</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              value={localEntry.title}
              onChange={handleLocalChange}
              placeholder="Title"
              className="border p-2 w-full mb-4"
            />
            <input
              name="amount"
              value={localEntry.amount}
              onChange={handleLocalChange}
              placeholder="Amount"
              className="border p-2 w-full mb-4"
            />
            <input
              name="date"
              value={localEntry.date}
              onChange={handleLocalChange}
              placeholder="Date"
              className="border p-2 w-full mb-4"
            />
            <input
              name="dueDate"
              value={localEntry.dueDate}
              onChange={handleLocalChange}
              placeholder="Due Date"
              className="border p-2 w-full mb-4"
            />
            <textarea
              name="description"
              value={localEntry.description}
              onChange={handleLocalChange}
              placeholder="Description"
              className="border p-2 w-full mb-4"
            />
            <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">Save</button>
            <button type="button" onClick={onClose} className="ml-2 text-gray-500">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditIncomeModal;
