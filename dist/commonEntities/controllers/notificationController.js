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
exports.NotificationController = void 0;
const httpStatus_1 = __importDefault(require("../status/httpStatus"));
class NotificationController {
    constructor(notificationUseCase) {
        this.notificationUseCase = notificationUseCase;
    }
    // creating new notification
    createNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senderId, receiverId, message, type, link } = req.body;
            const result = yield this.notificationUseCase.createNotification(senderId, receiverId, message, type, link, next);
            res.status(httpStatus_1.default.CREATED).json(result);
        });
    }
    // get all notifications
    getNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const result = yield this.notificationUseCase.notifications(userId, next);
            res.status(httpStatus_1.default.OK).json(result);
        });
    }
    // marking as read the notification
    markAsRead(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Received markAsRead request");
            console.log("Request body:", req.body);
            const { notificationId } = req.body;
            const result = yield this.notificationUseCase.markAsRead(notificationId, next);
            res.status(httpStatus_1.default.OK).json(result);
        });
    }
}
exports.NotificationController = NotificationController;
