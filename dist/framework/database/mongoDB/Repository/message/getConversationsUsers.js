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
exports.getConversationsUsers = void 0;
const getConversationsUsers = (userId, s3, messageModel, conversationModal) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("userId : ==>", userId);
        // finding the conversation of with userId and
        //populating the participants where exlude current userId
        const conversations = yield conversationModal
            .find({ participants: userId })
            .populate({
            path: "participants",
            select: "_id name email profileImage",
            match: { _id: { $ne: userId } },
        })
            .populate({
            path: "lastMessage", // here populating the lastMesage for find the lastMessage
            select: "message senderId createdAt readBy media",
        });
        // Here fetching the otherUsers to lists in chat with imageUrl
        const chatList = yield Promise.all(conversations.map((conversation) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("conversation =>", conversation);
            const otherUser = conversation.participants[0];
            const lastMessage = conversation.lastMessage;
            // generating resign url of profile image
            const profileImageUrl = yield s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: otherUser === null || otherUser === void 0 ? void 0 : otherUser.profileImage,
            });
            let lastMessageUrl = "";
            if (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.media) {
                lastMessageUrl = yield s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.media
                });
            }
            return {
                _id: conversation._id,
                user: {
                    _id: otherUser === null || otherUser === void 0 ? void 0 : otherUser._id,
                    name: (otherUser === null || otherUser === void 0 ? void 0 : otherUser.name) || "Unknown",
                    profileImageUrl: profileImageUrl || "",
                },
                lastMessage: lastMessage ? lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.message : "",
                media: lastMessageUrl || "",
                isRead: lastMessage
                    ? lastMessage.readBy.includes(userId.toString())
                    : false,
                lastMessageTime: (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.createdAt) || (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.updatedaAt),
            };
        })));
        console.log("chatList ===>", chatList);
        return chatList;
    }
    catch (error) {
        console.error("Error in create conversation:", error);
        return undefined;
    }
});
exports.getConversationsUsers = getConversationsUsers;
