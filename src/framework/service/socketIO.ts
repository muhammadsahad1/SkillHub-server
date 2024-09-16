import { Server } from "socket.io";
import http from "http";

// initializeSocke for wrapp to server
export const initializeSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: "https://skill-hub-client-eight.vercel.app",
      methods: ["GET", "POST", "PUT"],
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
      const { senderId, receiverId, message, media } = data;
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
    socket.on("chat", async (data) => {
      console.log("data in chat noti", data);
      const { senderId, receiverId, type, message, link } = data;
      io.to(`user_${receiverId}`).emit("notification", {
        message,
        type,
        link,
        receiverId,
      });
    });
    // handleMessagRecieve
    socket.on("messageRead", ({ conversationId, senderId, receiverId }) => {
      const roomName = [senderId, receiverId].sort().join("-");
      socket.to(roomName).emit("messageRead", { conversationId });
    });

    // ====================> TO handle the video call Events <======================= \\
    socket.on(
      "callRequest",
      ({ receiverId, receiverName, roomId, callerName }) => {
        io.to(`user_${receiverId}`).emit("callRequest", {
          callerId: socket.id,
          receiverName,
          roomId,
          callerName,
        });
      }
    );

    socket.on("callAccepted", ({ callerId, roomId }) => {
      io.to(callerId).emit("callAccepted", { roomId });
    });

    socket.on("callDecline", ({ callerId }) => {
      io.to(callerId).emit("callDecline");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
    // FOR ADMIN action in verify Requests
    socket.on("verifyRequest", async (data) => {
      const { senderId, receiverId, type, message, link } = data;
      io.to(`user_${receiverId}`).emit("notification", {
        senderId,
        receiverId,
        type,
        message,
        link,
      });
    });

    // ====================> Group Events <======================= \\

    socket.on("joinGroup", (data) => {
      const { groupId, senderId }: { groupId: string; senderId: string } = data;
      socket.join(`group_${groupId}`); //here join the socket with groupID
      console.log(`User ${senderId} joined group ${groupId}`);
    });

    socket.on("sendGroupMessage", (data) => {
      console.log("data===>", data);

      const {
        _id,
        sender,
        message,
        createAt,
      }: {
        _id: string;
        sender: {
          _id: string;
          userProfile: string;
        };

        message: string;
        createAt: Date;
      } = data;
      socket.to(`group_${_id}`).emit("receiveGroupMessage", {
        _id: _id,
        media: null,
        sender: {
          _id: sender._id,
          userProfile: sender.userProfile,
        },
        message: message,
        createAt,
      });
    });
  });

  return io;
};
