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
exports.MessageUseCase = void 0;
const index_js_1 = require("./message/index.js");
class MessageUseCase {
    constructor(messageRepository, s3) {
        this.messageRepository = messageRepository;
        this.s3 = s3;
    }
    sendMessage(senderId, receiverId, message, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.sendMessage)(senderId, receiverId, message, this.messageRepository, next);
        });
    }
    getChat(userToChatId, senderId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getChat)(userToChatId, senderId, this.s3, this.messageRepository, next);
        });
    }
    getConversationsUsers(userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getConversationsUsers)(userId, this.messageRepository, this.s3, next);
        });
    }
    markAsRead(conversationId, userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, index_js_1.markAsRead)(conversationId, userId, this.messageRepository, next);
        });
    }
    sendImage(senderId, receiverId, file, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.sendImage)(senderId, receiverId, file, this.messageRepository, this.s3, next);
        });
    }
}
exports.MessageUseCase = MessageUseCase;
