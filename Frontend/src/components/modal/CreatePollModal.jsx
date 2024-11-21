import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function CreatePollModal({ closeModal }) {
  const [pollType, setPollType] = useState('Select Poll Type');
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCreatePoll = () => {
    console.log('Poll Created:', { pollType, question, option1, option2 });
    closeModal();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handlePollTypeSelection = (type) => {
    setPollType(type);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white p-6 rounded-lg w-[410px]">
        <h2 className="text-xl font-semibold mb-4">Create Poll</h2>

        <div className="mb-4">
          <label className="block mb-2">Poll Type</label>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-full bg-white text-gray-700 p-2 rounded-md flex justify-between items-center border"
            >
              {pollType}
              {isDropdownOpen ? (
                <FaChevronUp className="text-gray-600" />
              ) : (
                <FaChevronDown className="text-gray-600" />
              )}
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 right-0 bg-white border mt-2 rounded-md shadow-lg z-10">
                <ul className="space-y-1">
                  <li
                    onClick={() => handlePollTypeSelection('Multichoice Polls')}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Multichoice Polls
                  </li>
                  <li
                    onClick={() => handlePollTypeSelection('Ranking Polls')}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Ranking Polls
                  </li>
                  <li
                    onClick={() => handlePollTypeSelection('Rating Polls')}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Rating Polls
                  </li>
                  <li
                    onClick={() => handlePollTypeSelection('Numeric Polls')}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Numeric Polls
                  </li>
                  <li
                    onClick={() => handlePollTypeSelection('Text Polls')}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Text Polls
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Question</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Option 1</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Option 2</label>
          <input
            type="text"
            className="w-full border p-2 rounded-md"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="bg-gray-300 py-2 px-4 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleCreatePoll}
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
