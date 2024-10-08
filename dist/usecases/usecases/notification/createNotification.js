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
exports.createNotification = void 0;
const errorMiddleware_js_1 = require("../../middlewares/errorMiddleware.js");
const createNotification = (senderId, receiverId, message, type, link, notificationRepository, io, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create a new notification entry in the database
        const notification = yield notificationRepository.createNotification(senderId, receiverId, message, type, link);
        // If the notification was created successfully, emit it to the relevant room
        if (notification) {
            io.to(`user_${receiverId}`).emit("notification", notification);
        }
        return notification;
    }
    catch (error) {
        return next(new errorMiddleware_js_1.ErrorHandler(500, "Internal Server Error"));
    }
});
exports.createNotification = createNotification;
