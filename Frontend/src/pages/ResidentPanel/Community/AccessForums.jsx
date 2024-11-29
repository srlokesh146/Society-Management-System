import React, { useEffect, useState } from "react";
import search from "../../../assets/images/search.svg";
import videoicon from "../../../assets/images/videoicon.png";
import callicon from "../../../assets/images/callicon.png";
import dottedicon from "../../../assets/images/dottedicon.svg";
import Smiley from "../../../assets/images/Smiley.svg";
import Paperclip from "../../../assets/images/Paperclip.svg";
import camera from "../../../assets/images/camera.svg";
import speaker from "../../../assets/images/speaker.svg";
import { GetResidents } from "../../../services/ownerTenantService";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import Constant from "../../../config/Constant";
import { useSelector } from "react-redux";
import { GetChatHistory, SendMessage } from "../../../services/chatService";

const socket = io(Constant.SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export default function AccessForums() {
  const userId = useSelector((store) => store.auth.user._id);
  const senderModel = useSelector((store) => store.auth.user.Resident_status);
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(3);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [media, setMedia] = useState(null);

  const handleSendMessage = async () => {
    try {
      const receiverId = receiver._id;
      const receiverModel = receiver.Resident_status;

      const response = await SendMessage({
        userId,
        receiverId,
        message,
        senderModel,
        receiverModel,
        media,
      });

      const image = response.data.data.media;
      socket.emit("sendMessage", { userId, receiverId, message, media: image });

      fetchChatHistory();
      setDiscussions((prev) => [...prev, response.data.data.message]);
      setMedia(null);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setMessage("");
    }
  };

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  function format12HourTimeShort(timestamp) {
    const date = new Date(timestamp);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes.toString().padStart(2, "0")} ${amPm}`;
  }

  const handleChatClick = (user) => {
    setReceiver(user);
    socket.emit("join", { userId, receiverId: user._id });
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setMedia(e.target.files[0]);
  };

  const fetchUsers = async () => {
    try {
      const response = await GetResidents();
      setUserList(response.data.Residents);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchChatHistory = async () => {
    try {
      const receiverId = receiver._id;
      const data = { senderId: userId, receiverId };
      const response = await GetChatHistory(data);
      setDiscussions(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (newMessage) => {
      setDiscussions((prev) => [...prev, newMessage]);
    });
    return () => {
      socket.off("sendMessage");
    };
  }, [receiver]);

  useEffect(() => {
    if (receiver) {
      fetchChatHistory();
    }
  }, [receiver]);

  return (
    <div className="flex bg-gray-100">
      {/* Chats Section */}
      <div className="w-1/4 flex flex-col space-y-4 max-md:w-full max-xl:w-1/2 max-2xl:w-1/2 max-sm:w-full">
        <div className="bg-white h-[91vh] shadow-lg rounded-tl-[15px] p-6 max-sm:p-4">
          <h1 className="mb-[12px] text-[#202224] text-[20px] font-semibold">
            Chat
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Here"
              className="py-2 w-full pl-10 bg-[#F6F8FB] h-[48px] rounded-lg"
            />
            <img
              src={search}
              className="absolute left-3 top-[14px] text-gray-400 text-[20px] mr-[20px]"
            />
          </div>

          <div className="overflow-x-auto custom-scrollbar h-[70vh]">
            {userList.map((user, i) => (
              <div
                key={i}
                className={`flex justify-between items-center p-2 transition-all duration-300 py-[12px] cursor-pointer rounded-[10px] ${
                  selectedChatId === user._id
                    ? "bg-gray-200"
                    : "hover:bg-gray-50 rounded-[10px]"
                }`}
                onClick={() => handleChatClick(user)}
              >
                <div className="flex items-center">
                  <img
                    className="h-[48px] w-[48px] rounded-full object-cover mr-[19px]"
                    src={user.profileImage}
                    alt="Avatar"
                  />
                  <div>
                    <h4 className="font-semibold">{user.Full_name}</h4>
                    <p className="text-sm text-gray-600">
                      {user.Email_address}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">2:00 AM</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Discussions Section */}
      <div className="flex-1 flex flex-col max-sm:hidden max-md:hidden">
        {/* Header Section */}
        {receiver && (
          <div className="flex justify-between items-center bg-white py-[18px] px-6 rounded-tr-[15px]">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full object-cover mr-[19px]"
                src={receiver?.profileImage}
                alt="Avatar"
              />
              <div>
                <h4 className="font-semibold">{receiver?.Full_name}</h4>
                {/* Header shows the selected chat's name */}
                <span className="text-xs text-gray-400">9:00</span>
              </div>
            </div>
            <div className="relative flex items-center space-x-4">
              <img
                src={videoicon}
                alt="videoicon"
                className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500"
              />
              <img
                src={callicon}
                className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500"
              />
              {isDropdownVisible && (
                <div className="absolute top-[40px] right-0 bg-white shadow-lg rounded-lg w-[112px] p-[20px] z-10">
                  <ul className="space-y-2">
                    <li className="text-[#202224] hover:text-blue-500 cursor-pointer font-semibold mb-[10px]">
                      Copy
                    </li>
                    <li className="text-[#202224] hover:text-blue-500 cursor-pointer font-semibold">
                      Forward
                    </li>
                  </ul>
                </div>
              )}
              <img
                src={dottedicon}
                alt="dottedicon"
                onClick={toggleDropdown}
                className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500"
              />
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="overflow-x-auto p-[20px] custom-scrollbar h-[73.2vh] bg-[#F4F4F4]">
          {discussions.map((chat) => (
            <div
              key={chat._id}
              className={`flex ${
                chat.senderId === userId ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-[70%] p-1 rounded-lg ${
                  chat.senderId !== userId
                    ? "bg-gray-200 text-right"
                    : "bg-blue-500 text-white text-left"
                }`}
              >
                <div className="">
                  {chat.media && (
                    <img src={chat.media} width={"100px"} height="auto" />
                  )}
                  <p className="text-sm">{chat.message}</p>
                  <span className="text-xs text-gray-400 block">
                    {format12HourTimeShort(chat.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Section */}
        {receiver && (
          <div className="flex items-center p-[20px] bg-white border-t relative ">
            <input
              type="text"
              className="w-[94%] p-2 rounded-full shadow-[0px_7px_15px_0px_#0000000D] py-[9px] ps-[40px] pl-[40px] relative"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <img
              src={Smiley}
              alt="Smiley"
              className="absolute left-[40px] translate-x-[-20px] cursor-pointer"
            />
            <img
              src={camera}
              alt="Camera Icon"
              className="absolute right-[40px] translate-x-[-65px] cursor-pointer"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer absolute right-[15px] translate-x-[-130px]"
            >
              <img src={Paperclip} alt="Attachment Icon" />
            </label>
            <input
              id="file-upload"
              onChange={handleFileChange}
              type="file"
              className="hidden"
            />
            <img
              src={speaker}
              alt="Speaker Icon"
              className="absolute right-[15px] cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
