import React from 'react';

const ViewIncomeModal = ({ isOpen, onClose, entry }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">View Income</h2>
          <p><strong>Title:</strong> {entry.title}</p>
          <p><strong>Amount:</strong> {entry.amount}</p>
          <p><strong>Date:</strong> {entry.date}</p>
          <p><strong>Due Date:</strong> {entry.dueDate}</p>
          <p><strong>Description:</strong> {entry.description}</p>
          <button onClick={onClose} className="bg-gray-300 text-white rounded px-4 py-2">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ViewIncomeModal;
