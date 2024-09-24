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
exports.sendImage = void 0;
const conversation_js_1 = __importDefault(require("../../model/conversation.js"));
const sendImage = (senderId, receiverId, file, s3Operations, messageModel, conversationModal) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("its come in repo ");
        let conversation = yield conversation_js_1.default.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if (!conversation) {
            conversation = yield conversationModal.create({
                participants: [senderId, receiverId], lastMessage: null
            });
        }
        let imageName = '';
        if (file) {
            const buffer = file.buffer;
            const mimetype = file.mimetype;
            const originalname = file.originalname;
            const putObjectUrl = {
                originalname,
                buffer,
                mimetype
            };
            imageName = yield s3Operations.putObjectUrl(putObjectUrl);
        }
        const newMessage = new messageModel({
            senderId,
            receiverId,
            message: "",
            media: imageName,
        });
        console.log("newMessage ==>", newMessage);
        if (newMessage) {
            console.log("newMessage =222=>", newMessage);
            const status = yield newMessage.save();
            console.log("status ==>", status);
            conversation.messages.push(newMessage._id);
            yield conversation.save();
            console.log("newMessage ==>", newMessage);
            return {
                success: true
            };
        }
    }
    catch (error) {
        console.error("Error in sendImage:", error);
        return undefined;
    }
});
exports.sendImage = sendImage;
