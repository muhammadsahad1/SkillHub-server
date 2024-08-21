import { Server } from "socket.io";
import http from "http";
import { log } from "console";

export const initializeSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Server con nected with socket ID:", socket.id);
    const userId = socket.handshake.query.userId as string;
    if (userId) {
      socket.join(`user_${userId}`);
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    }

    socket.on("joinRoom", ({ senderId, receiverId }) => {
      const roomName = [senderId, receiverId].sort().join("-");
      socket.join(roomName);
      console.log("Sending data to room in joinroom:", roomName);
    });

    socket.on("sendData", (data) => {
      const { senderId, receiverId, message } = data;
      const roomName = [senderId, receiverId].sort().join("-");
      socket.to(roomName).emit("receiveData", data);
    });
    // to handle the follow event
    socket.on("follow", async (data) => {
      const { senderId, receiverId, message, type, link } = data;
      io.to(`user_${receiverId}`).emit("notification", { message, type, link });
    });

    // to handle the like of post notification
    socket.on("postLiked", async (data) => {
      const { senderId, receiverId, type, message, link } = data;
      io.to(`user_${receiverId}`).emit("notification", { message, type, link });
    });
    // to handle the comment event
    socket.on("comment", async (data) => {
      const { senderId, receiverId, message, type, link } = data;
      io.to(`user_${receiverId}`).emit("notification", { message, type, link });
    });
    // to handle the chat event notification
    socket.on("chat",async(data) => {
      const { senderId, receiverId, type, message, link } = data;
      io.to(`user_${receiverId}`).emit("notification", { message, type, link });
    });
    // handleMessagRecieve
    socket.on("messageRead", ({ conversationId, senderId, receiverId }) => {
      const roomName = [senderId, receiverId].sort().join("-");
      socket.to(roomName).emit("messageRead", { conversationId });
    });
    
    // ====================> TO handle the video call Events <======================= \\
    socket.on('callRequest',({receiverId , roomId}) => {
      console.log("resId ==>",receiverId ,"roomId ==>",roomId );
      
      io.to(`user_${receiverId}`).emit('callRequest',{callerId : socket.id , roomId})
    })
    
    socket.on('callAccepted',({ callerId , roomId}) => {
      io.to(callerId).emit('callAccepted',({ roomId}))
    })

    socket.on('callDecline',({callerId}) => {
      io.to(callerId).emit('callDecline')
    })

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
  return io;
};
