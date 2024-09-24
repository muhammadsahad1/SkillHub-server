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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const messages = (groupId, groupMessageModel, groupModel, userModels, s3Operations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("keroooo");
        if (!mongoose_1.default.Types.ObjectId.isValid(groupId)) {
            throw new Error("Invalid groupId format");
        }
        // Use 'find' to fetch multiple group messages
        const groupMessages = yield groupMessageModel
            .find({ groupId: new mongoose_1.default.Types.ObjectId(groupId) })
            .populate({
            path: "senderId",
            select: "_id name profileImage",
        })
            .exec();
        // Check if the array of messages is empty
        if (!groupMessages || groupMessages.length === 0) {
            return [];
        }
        // Process and return the messages with user data and media
        const messagesWithUsers = yield Promise.all(groupMessages.map((message) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            let profileImageUrl = "";
            const profileImageName = message.senderId.profileImage || "";
            if (profileImageName) {
                profileImageUrl = yield s3Operations.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: profileImageName,
                });
            }
            return {
                _id: message._id,
                message: message.message,
                media: message.media
                    ? yield s3Operations.getObjectUrl({
                        bucket: process.env.C3_BUCKET_NAME,
                        key: message.media,
                    })
                    : null,
                sender: {
                    _id: message.senderId._id,
                    name: (_a = message.senderId) === null || _a === void 0 ? void 0 : _a.name,
                    userProfile: profileImageUrl,
                },
                createdAt: message === null || message === void 0 ? void 0 : message.createdAt,
                readBy: message.readBy,
            };
        })));
        return messagesWithUsers;
    }
    catch (error) {
        console.error("Error fetching group messages:", error);
        throw new Error(`Failed to fetch messages: ${error.message}`);
    }
});
exports.messages = messages;
