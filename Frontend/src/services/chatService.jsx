import api from "./Api";

// send message
export const SendMessage = async (data) =>
  api.post("/v2/chat/sendMessage", data);

// Get messages history
export const GetChatHistory = async (data) =>
  api.get(
    `/v2/chat/getChatHistory?senderId=${data.senderId}&receiverId=${data.receiverId}`
  );
