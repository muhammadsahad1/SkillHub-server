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
exports.NotificationUseCase = void 0;
const index_js_1 = require("./notification/index.js");
// ================================= Notificantion use cases ================================= \\
class NotificationUseCase {
    constructor(notificationRepository, io) {
        this.notificationRepository = notificationRepository;
        this.io = io;
    }
    createNotification(senderId, receiverId, message, type, link, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.createNotification)(senderId, receiverId, message, type, link, this.notificationRepository, this.io, next);
        });
    }
    notifications(userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.notifications)(userId, this.notificationRepository, next);
        });
    }
    markAsRead(notificationId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, index_js_1.markAsRead)(notificationId, this.notificationRepository, next);
        });
    }
}
exports.NotificationUseCase = NotificationUseCase;
