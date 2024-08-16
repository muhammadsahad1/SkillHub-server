import { Server } from "socket.io";
import http from "http";

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

    socket.on("joinRoom", ({ senderId, receiverId }) => {
      const roomName = [senderId, receiverId].sort().join("-");
      socket.join(roomName);
      console.log("Joined room:", roomName);
    });
    
    socket.on("sendData", (data) => {
      const { senderId, receiverId, message } = data;
      const roomName = [senderId, receiverId].sort().join("-");
      console.log("Sending data to room:", roomName);
      socket.to(roomName).emit("receiveData", data);
    });

    // handleMessagRecieve
    socket.on("messageRead", ({ conversationId, senderId, receiverId }) => {
      const roomName = [senderId, receiverId].sort().join("-");
      console.log("roomname ==>",roomName);
      socket.to(roomName).emit("messageRead", { conversationId });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
  return io
};
