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
exports.MessageController = void 0;
class MessageController {
    constructor(messageUseCase) {
        this.messageUseCase = messageUseCase;
    }
    sendMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { receiverId, messages } = req.body;
            const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const result = yield this.messageUseCase.sendMessage(senderId, receiverId, messages, next);
            res.status(201).json(result);
        });
    }
    getChat(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senderId, userToChatId } = req.query;
            const result = yield this.messageUseCase.getChat(userToChatId, senderId, next);
            res.status(200).json(result);
        });
    }
    chatUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const result = yield this.messageUseCase.getConversationsUsers(userId, next);
            res.status(200).json(result);
        });
    }
    markAsRead(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { conversationId } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            yield this.messageUseCase.markAsRead(conversationId, userId, next);
        });
    }
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senderId, receiverId } = req.body;
            const result = yield this.messageUseCase.sendImage(senderId, receiverId, req.file, next);
            res.status(200).json(result);
            return result;
        });
    }
}
exports.MessageController = MessageController;
