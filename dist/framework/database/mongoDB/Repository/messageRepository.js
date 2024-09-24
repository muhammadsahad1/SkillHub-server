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
exports.MessageRepository = void 0;
const index_js_1 = require("./message/index.js");
class MessageRepository {
    constructor(conversationModal, messageModal, userModels) {
        this.conversationModal = conversationModal;
        this.messageModal = messageModal;
        this.userModels = userModels;
    }
    sendMessage(senderId, receiverId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.sendMessage)(senderId, receiverId, message, this.messageModal, this.conversationModal);
        });
    }
    getChat(userToChatId, senderId, s3) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getChat)(userToChatId, senderId, this.userModels, s3, this.conversationModal);
        });
    }
    getConversationsUsers(userId, s3) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getConversationsUsers)(userId, s3, this.messageModal, this.conversationModal);
        });
    }
    markAsRead(conversationId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.markMessagesAsRead)(conversationId, userId, this.messageModal, this.conversationModal);
        });
    }
    sendImage(senderId, receiverId, file, s3Operations) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.sendImage)(senderId, receiverId, file, s3Operations, this.messageModal, this.conversationModal);
        });
    }
}
exports.MessageRepository = MessageRepository;
