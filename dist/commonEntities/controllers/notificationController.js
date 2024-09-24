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
exports.NotificationController = void 0;
class NotificationController {
    constructor(notificationUseCase) {
        this.notificationUseCase = notificationUseCase;
    }
    // creating new notification
    createNotification(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { senderId, receiverId, message, type, link } = req.body;
            const result = yield this.notificationUseCase.createNotification(senderId, receiverId, message, type, link, next);
            res.status(201).json(result);
        });
    }
    // get all notifications
    getNotifications(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
            const result = yield this.notificationUseCase.notifications(userId, next);
            res.status(201).json(result);
        });
    }
    // marking as read the notification
    markAsRead(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Received markAsRead request");
            console.log("Request body:", req.body);
            const { notificationId } = req.body;
            const result = yield this.notificationUseCase.markAsRead(notificationId, next);
            res.status(201).json(result);
        });
    }
}
exports.NotificationController = NotificationController;
