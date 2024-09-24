"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
// initializeSocke for wrapp to server
const initializeSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "https://skill-hub-share-platform.vercel.app",
            methods: ["GET", "POST", "PUT"],
            credentials: true,
        },
    });
    io.on("connection", (socket) => {
        console.log("Server con nected with socket ID:", socket.id);
        const userId = socket.handshake.query.userId;
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
        socket.on("follow", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { senderId, receiverId, message, type, link } = data;
            io.to(`user_${receiverId}`).emit("notification", { message, type, link });
        }));
        // to handle the like of post notification
        socket.on("postLiked", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { senderId, receiverId, type, message, link } = data;
            io.to(`user_${receiverId}`).emit("notification", { message, type, link });
        }));
        // to handle the comment event
        socket.on("comment", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { senderId, receiverId, message, type, link } = data;
            io.to(`user_${receiverId}`).emit("notification", { message, type, link });
        }));
        // to handle the chat event notification
        socket.on("chat", (data) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("data in chat noti", data);
            const { senderId, receiverId, type, message, link } = data;
            io.to(`user_${receiverId}`).emit("notification", {
                message,
                type,
                link,
                receiverId,
            });
        }));
        // handleMessagRecieve
        socket.on("messageRead", ({ conversationId, senderId, receiverId }) => {
            const roomName = [senderId, receiverId].sort().join("-");
            socket.to(roomName).emit("messageRead", { conversationId });
        });
        // ====================> TO handle the video call Events <======================= \\
        socket.on("callRequest", ({ receiverId, receiverName, roomId, callerName }) => {
            io.to(`user_${receiverId}`).emit("callRequest", {
                callerId: socket.id,
                receiverName,
                roomId,
                callerName,
            });
        });
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
        socket.on("verifyRequest", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { senderId, receiverId, type, message, link } = data;
            io.to(`user_${receiverId}`).emit("notification", {
                senderId,
                receiverId,
                type,
                message,
                link,
            });
        }));
        // ====================> Group Events <======================= \\
        socket.on("joinGroup", (data) => {
            const { groupId, senderId } = data;
            socket.join(`group_${groupId}`); //here join the socket with groupID
            console.log(`User ${senderId} joined group ${groupId}`);
        });
        socket.on("sendGroupMessage", (data) => {
            console.log("data===>", data);
            const { _id, sender, message, createAt, } = data;
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
exports.default = initializeSocket;
