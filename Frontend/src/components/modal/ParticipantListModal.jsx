import React from 'react';

const ParticipantListModal = ({ item, setIsParticipantModalOpen }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg w-[90%] max-w-6xl h-[80vh] flex flex-col">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{item.title} Participator Member List</h2>
          <button 
            onClick={() => setIsParticipantModalOpen(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
      </div>
      <div className="p-6 overflow-auto">
        {/* Render participant data here */}
      </div>
    </div>
  </div>
);

export default ParticipantListModal;