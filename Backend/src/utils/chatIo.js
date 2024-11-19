const express=require("express")
const app = express();
const http=require("http")
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const Chat = require("../models/chat.schema");
const cloudinary = require("../utils/cloudinary");
const fs = require('fs');

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Join a specific chat room based on user IDs
    socket.on('joinRoom', ({ senderId, receiverId }) => {
        const room = [senderId, receiverId].sort().join('_');
        socket.join(room);
    });

    // Handle text message
    socket.on('sendMessage', async ({ senderId, senderModel, receiverId, receiverModel, message }) => {
        const room = [senderId, receiverId].sort().join('_');

        const chatMessage = new Chat({
            senderId,
            senderModel,
            receiverId,
            receiverModel,
            message
        });
        await chatMessage.save();

        io.to(room).emit('receiveMessage', chatMessage);
    });

    // Handle media file upload
    socket.on('sendMedia', async ({ senderId, senderModel, receiverId, receiverModel, file }) => {
        try {
            const room = [senderId, receiverId].sort().join('_');

           
            const result = await cloudinary.uploader.upload(file.path, {
                resource_type: 'auto' 
            });

            // Save the media message in the database
            const chatMessage = new Chat({
                senderId,
                senderModel,
                receiverId,
                receiverModel,
                media: result.secure_url, 
               
            });
            await chatMessage.save();

           
            io.to(room).emit('receiveMessage', chatMessage);

            fs.unlink(file.path, (err) => {
                if (err) {
                    console.error('Error deleting local file:', err);
                } else {
                    console.log('Local file deleted successfully');
                }
            });
        } catch (error) {
            console.error('Error uploading file:', error);
            socket.emit('error', { message: 'File upload failed' });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
