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
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [discussions, setDiscussions] = useState([
        { id: 1, message: "Hi there, How are you?", time: "9:20" },
        { id: 2, message: "Waiting for your reply. As I have to go back soon. I have to travel long distance.", time: "9:22" },
        { id: 3, message: "Hi, I am coming there in few minutes. Please wait!! I am in taxi right now.", time: "9:30" },
        { id: 4, message: "PDF", time: "9:45", file: "2.3 MB" },
        { id: 5, message: "Sure, see you soon.", time: "10:00" },
    ]);

    const chats = [
        { id: 1, name: "Michael John", message: "Hi, John! How are you doing?", time: "10:27" },
        { id: 2, name: "Jenny Wilson", message: "Hello, Jenny", time: "7:00" },
        { id: 3, name: "Arlene McCoy", message: "Typing...", time: "9:20" },
        { id: 4, name: "Esther Howard", message: "Hello, Esther", time: "10:27" },
    ];

    const handleSendMessage = () => {
        if (message.trim()) {
            setDiscussions([
                ...discussions,
                { id: discussions.length + 1, message, time: new Date().toLocaleTimeString() },
            ]);
            setMessage("");
        }
    };

    const toggleDropdown = () => {
        setIsDropdownVisible((prev) => !prev);
    };

    const handleChatClick = (chatId) => {
        setSelectedChatId(chatId);
        setMessage("");
    };

    return (
        <div className="flex bg-gray-100">
            {/* Chats Section */}
            <div className="w-1/4 flex flex-col space-y-4">
                <div className="bg-white h-[91vh] shadow-lg rounded-tl-[15px] p-6">
                    <h1 className="mb-[12px] text-[#202224] text-[20px] font-semibold">Chat</h1>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Here"
                            className="py-2 w-full pl-10 bg-[#F6F8FB] h-[48px] rounded-lg"
                        />
                        <FiSearch className="absolute left-3 top-[14px] text-gray-400 text-[20px] mr-[20px]" />
                    </div>
                    <div className='overflow-x-auto ps-[20px] custom-scrollbar h-[70vh]'>
                        {chats.map((chat) => (
                            <div
                                key={chat.id}
                                className={`flex justify-between items-center p-2 hover:bg-gray-50 transition-all duration-300 py-[12px] ${selectedChatId === chat.id ? 'bg-gray-200' : ''}`}
                                onClick={() => handleChatClick(chat.id)}
                            >
                                <div className="flex items-center">
                                    <img
                                        className="h-10 w-10 rounded-full object-cover mr-[19px]"
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
            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center bg-white py-[18px] px-6 rounded-tr-[15px]">
                    <>
                        <div className="flex items-center justify-between">
                            <img
                                className="h-10 w-10 rounded-full object-cover mr-[19px]"
                                src={Avatar}
                                alt="Avatar"
                            />
                            <div>
                                <h4 className="font-semibold">Arlene McCoy</h4>
                                <span className="text-xs text-gray-400">9:20</span>
                            </div>
                        </div>
                        <div className="relative flex items-center space-x-4">
                            <img src={videoicon} alt='videoicon'
                                className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500"
                            />
                            <img src={callicon} onClick={toggleDropdown} className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500" />
                            {isDropdownVisible && (
                                <div className="absolute top-[40px] right-0 bg-white shadow-lg rounded-lg w-[112px] p-[20px] z-10">
                                    <ul className="space-y-2">
                                        <li className="text-[#202224] hover:text-blue-500 cursor-pointer font-semibold mb-[10px]">Copy</li>
                                        <li className="text-[#202224] hover:text-blue-500 cursor-pointer font-semibold">Forward</li>
                                    </ul>
                                </div>
                            )}
                            <img src={dottedicon} alt='dottedicon'
                                className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500"
                            />
                        </div>
                    </>
                </div>

                {/* Chat Messages */}
                <div className="overflow-x-auto ps-[20px] custom-scrollbar h-[70vh] bg-[#F4F4F4]">
                    {selectedChatId && discussions.map((chat) => (
                        selectedChatId === chat.id && (
                            <div
                                key={chat.id}
                                className="flex justify-between items-center p-2 transition-all duration-300 py-[12px]"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold">{chat.sender}</h4>
                                        <p className="text-sm text-gray-600 bg-gray-200 p-[15px] rounded-[10px] text-wrap">
                                            {chat.message}
                                        </p>
                                        <span className="text-xs text-gray-400">{chat.time}</span>
                                        {chat.file && (
                                            <p className="text-xs text-gray-400 mt-1">{chat.file}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>

                {/* Message Input Section */}
                <div className="flex items-center p-[20px] bg-white border-t relative">
                    <input
                        type="text"
                        className="w-full p-2 rounded-full shadow-[0px_7px_15px_0px_#0000000D] py-[9px] ps-[10px] pl-[40px] relative"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <img
                        src={Smiley}
                        alt="Smiley"
                        className="absolute left-[40px] translate-x-[-20px] cursor-pointer"
                    />
                    <img src={camera} alt="" className='absolute right-[40px] translate-x-[-65px] cursor-pointer'/>
                    <img src={Paperclip} alt="" className='absolute right-[40px] translate-x-[-105px] cursor-pointer'/>
                    <div className='cursor-pointer'>
                        <img src={speaker} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}
