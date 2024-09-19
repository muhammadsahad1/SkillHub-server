import { createNotification, markAsRead, notifications } from './notification/index.js';
// ================================= Notificantion use cases ================================= \\
export class NotificationUseCase {
    notificationRepository;
    io;
    constructor(notificationRepository, io) {
        this.notificationRepository = notificationRepository;
        this.io = io;
    }
    async createNotification(senderId, receiverId, message, type, link, next) {
        return await createNotification(senderId, receiverId, message, type, link, this.notificationRepository, this.io, next);
    }
    async notifications(userId, next) {
        return await notifications(userId, this.notificationRepository, next);
    }
    async markAsRead(notificationId, next) {
        await markAsRead(notificationId, this.notificationRepository, next);
    }
}
