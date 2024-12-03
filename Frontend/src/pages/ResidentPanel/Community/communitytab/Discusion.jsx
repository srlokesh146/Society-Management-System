import React, { useEffect, useState } from "react";
import Avatar from "../../../../assets/images/avatar.png";
import { socket } from "../../../../components/Socket";
import {
  groupMessageHistory,
  SendGroupMessage,
} from "../../../../services/chatService";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export default function Discussion() {
  const { _id } = useSelector((store) => store.auth.user);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (message !== "") {
      try {
        const messageData = {
          message: message,
        };
        const response = await SendGroupMessage(messageData);
        socket.emit("group-message", response.data.chat);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response.data.messages);
      }
      setMessage("");
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await groupMessageHistory();
      setMessages(response.data.messages);
    } catch (error) {}
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => socket.off("receive_message");
  }, []);

  return (
    <div className="flex h-[87vh] bg-gray-100 r">
      {/* Sidebar */}
      <div className="w-1/4 bg-white ">
        <h2 className="font-bold text-xl my-4 px-4">Chat</h2>
        <div className="">
          {/* List of chats */}
          {["Community"].map((name, index) => (
            <div
              key={index}
              className={
                "p-3 flex gap-2 cursor-pointer bg-gray-200 hover:bg-gray-100 "
              }
            >
              <img src={Avatar} alt="" />
              <div className="">
                <p className="font-medium">{name}</p>
                <p className="text-sm text-gray-500">Typing...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <h2 className="font-bold text-lg">Community</h2>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
            Join Community
          </button>
        </div>

        <div className="absolute bottom-0 w-full p-2 bg-white ">
          <input
            type="text"
            placeholder="Type Here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="w-full px-5 py-2 rounded-full border "
          />
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-4 ${
                m.senderId == _id ? "bg-gray-200" : "bg-white"
              } rounded-lg shadow`}
            >
              <div className="flex items-center gap-2">
                <img
                  src={m.senderProfile}
                  alt=""
                  
                  className="rounded-full w-[30px] h-[30px]"
                />
                <p className="text-sm text-gray-500">{m.senderName}</p>
              </div>
              <p className="font-medium text-lg">{m.message}</p>
              <p className="text-sm text-gray-500">{m.createdA}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
