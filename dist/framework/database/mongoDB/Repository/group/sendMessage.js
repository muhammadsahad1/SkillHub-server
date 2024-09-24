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
exports.sendMessage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sendMessage = (senderId, groupId, message, groupMessageModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const senderID = new mongoose_1.default.Types.ObjectId(senderId);
        const groupID = new mongoose_1.default.Types.ObjectId(groupId);
        yield groupMessageModel.create({
            groupId: groupID,
            senderId: senderID,
            message,
        });
        return {
            success: true,
            message: "Send Message",
        };
    }
    catch (error) {
        return {
            success: false,
            message: "falied to update the send message",
        };
    }
});
exports.sendMessage = sendMessage;
