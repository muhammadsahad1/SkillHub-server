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
exports.MessageController = void 0;
const errorMiddleware_1 = require("../../usecases/middlewares/errorMiddleware");
const httpStatus_1 = __importDefault(require("../status/httpStatus"));
class MessageController {
    constructor(messageUseCase) {
        this.messageUseCase = messageUseCase;
    }
    sendMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { receiverId, messages } = req.body;
                const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield this.messageUseCase.sendMessage(senderId, receiverId, messages, next);
                res.status(httpStatus_1.default.CREATED).json(result); // Use CREATED status
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    getChat(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { senderId, userToChatId } = req.query;
                const result = yield this.messageUseCase.getChat(userToChatId, senderId, next);
                res.status(httpStatus_1.default.OK).json(result); // Use OK status
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    chatUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield this.messageUseCase.getConversationsUsers(userId, next);
                res.status(httpStatus_1.default.OK).json(result); // Use OK status
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    markAsRead(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { conversationId } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                yield this.messageUseCase.markAsRead(conversationId, userId, next);
                res.status(httpStatus_1.default.NO_CONTENT).send(); // Use NO_CONTENT status for successful operation without content
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    uploadImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { senderId, receiverId } = req.body;
                const result = yield this.messageUseCase.sendImage(senderId, receiverId, req.file, next);
                res.status(httpStatus_1.default.OK).json(result); // Use OK status
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
}
exports.MessageController = MessageController;
