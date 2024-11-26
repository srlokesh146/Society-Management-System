import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import Avatar from "../../../assets/images/Avatar.png";
import videoicon from "../../../assets/images/videoicon.png";
import callicon from "../../../assets/images/callicon.png";
import dottedicon from "../../../assets/images/dottedicon.svg";
import Smiley from "../../../assets/images/Smiley.svg";
import Paperclip from "../../../assets/images/Paperclip.svg";
import camera from "../../../assets/images/camera.svg";
import speaker from "../../../assets/images/speaker.svg";

export default function AccessForums() {
    const [message, setMessage] = useState("");
    const [selectedChatId, setSelectedChatId] = useState(3); // Default to the third chat (Arlene McCoy)
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [discussions, setDiscussions] = useState([
        { id: 1, sender: "Michael John", message: "Hello! How are you?", time: "10:25", isReceived: true },
        { id: 2, sender: "You", message: "I am good, thanks!", time: "10:30", isReceived: false }
    ]);

    const chats = [
        { id: 1, name: "Michael John", message: "Hi, John! How are you doing?", time: "10:27" },
        { id: 2, name: "Jenny Wilson", message: "Hello, Jenny", time: "7:00" },
        { id: 3, name: "Arlene McCoy", message: "Typing...", time: "9:20" },
        { id: 4, name: "Esther Howard", message: "Hello, Esther", time: "10:27" },
    ];

    const sampleDiscussions = {
        1: [
            { id: 1, sender: "Michael John", message: "Hello! How are you?", time: "10:25", isReceived: true },
        ],
        2: [
            { id: 1, sender: "Jenny Wilson", message: "Good Morning!", time: "7:05", isReceived: true },
        ],
        3: [
            { id: 1, sender: "Arlene McCoy", message: "Hi there, How are you?", time: "9:20", isReceived: true },
            { id: 2, sender: "You", message: "I’m good, how about you?", time: "9:25", isReceived: false },
        ],
        4: [
            { id: 1, sender: "Esther Howard", message: "See you at the meeting!", time: "10:30", isReceived: true },
        ],
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            setDiscussions((prev) => [
                ...prev,
                { id: prev.length + 1, sender: "You", message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isReceived: false },
            ]);
            setMessage("");
        }
    };

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev);
    };

    const handleChatClick = (chatId) => {
        setSelectedChatId(chatId);
        setDiscussions(sampleDiscussions[chatId] || []); // Load discussions for the selected chat
        setMessage(""); // Clear input field
    };

    return (
        <div className="flex bg-gray-100">
            {/* Chats Section */}
            <div className="w-1/4 flex flex-col space-y-4 max-md:w-full max-xl:w-1/2 max-2xl:w-1/2 max-sm:w-full">
                <div className="bg-white h-[91vh] shadow-lg rounded-tl-[15px] p-6 max-sm:p-4">
                    <h1 className="mb-[12px] text-[#202224] text-[20px] font-semibold">Chat</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Here"
                            className="py-2 w-full pl-10 bg-[#F6F8FB] h-[48px] rounded-lg"
                        />
                        <FiSearch className="absolute left-3 top-[14px] text-gray-400 text-[20px] mr-[20px]" />
                    </div>
                    <div className="overflow-x-auto custom-scrollbar h-[70vh]">
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                className={`flex justify-between items-center p-2 transition-all duration-300 py-[12px] cursor-pointer rounded-[10px] ${selectedChatId === chat.id ? 'bg-gray-200' : 'hover:bg-gray-50 rounded-[10px]'
                                    }`}
                                onClick={() => handleChatClick(chat.id)}
                            >
                                <div className="flex items-center">
                                    <img
                                        className="h-[48px] w-[48px] rounded-full object-cover mr-[19px]"
                                        src={Avatar}
                                        alt="Avatar"
                                    />
                                    <div>
                                        <h4 className="font-semibold">{chat.name}</h4>
                                        <p className="text-sm text-gray-600">{chat.message}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">{chat.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Discussions Section */}
            <div className="flex-1 flex flex-col max-sm:hidden max-md:hidden">
                {/* Header Section */}
                <div className="flex justify-between items-center bg-white py-[18px] px-6 rounded-tr-[15px]">
                    <div className="flex items-center">
                        <img
                            className="h-10 w-10 rounded-full object-cover mr-[19px]"
                            src={Avatar}
                            alt="Avatar"
                        />
                        <div>
                            <h4 className="font-semibold">{chats.find(chat => chat.id === selectedChatId)?.name}</h4> {/* Header shows the selected chat's name */}
                            <span className="text-xs text-gray-400">Active</span>
                        </div>
                    </div>
                    <div className="relative flex items-center space-x-4">
                        <img src={videoicon} alt='videoicon' className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500" />
                        <img src={callicon} className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500" />
                        {isDropdownVisible && (
                            <div className="absolute top-[40px] right-0 bg-white shadow-lg rounded-lg w-[112px] p-[20px] z-10">
                                <ul className="space-y-2">
                                    <li className="text-[#202224] hover:text-blue-500 cursor-pointer font-semibold mb-[10px]">Copy</li>
                                    <li className="text-[#202224] hover:text-blue-500 cursor-pointer font-semibold">Forward</li>
                                </ul>
                            </div>
                        )}
                        <img onClick={toggleDropdown} src={dottedicon} alt='dottedicon' className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500" />
                    </div>
                </div>

                {/* Chat Messages */}
                <div className="overflow-x-auto p-[20px] custom-scrollbar h-[73vh] bg-[#F4F4F4]">
                    {discussions.map((chat) => (
                        <div
                            key={chat.id}
                            className={`flex ${chat.isReceived ? 'justify-start' : 'justify-end'} mb-4`}
                        >
                            <div
                                className={`max-w-[70%] p-3 rounded-lg ${chat.isReceived ? 'bg-gray-200 text-left' : 'bg-blue-500 text-white text-right'}`}
                            >
                                <p className="text-sm">{chat.message}</p>
                                <span className="text-xs text-gray-400 block mt-2">{chat.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Message Input Section */}
                <div className="flex items-center p-[20px] bg-white border-t relative">
                    <input
                        type="text"
                        className="w-[93.5%] p-2 rounded-full shadow-[0px_7px_15px_0px_#0000000D] py-[9px] ps-[40px] pl-[40px] relative"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <img src={Smiley} alt="Smiley" className="absolute left-[40px] translate-x-[-20px] cursor-pointer" />
                    <img src={camera} alt="Camera Icon" className="absolute right-[40px] translate-x-[-65px] cursor-pointer" />
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer absolute right-[15px] translate-x-[-130px]"
                    >
                        <img src={Paperclip} alt="Attachment Icon" />
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                    />
                    <img src={speaker} alt="Speaker Icon" className="absolute right-[15px] cursor-pointer" />
                </div>
            </div>
        </div>
    );
}
