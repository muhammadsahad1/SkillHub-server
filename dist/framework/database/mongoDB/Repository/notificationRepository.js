import { createNotification, markAsRead, notifications, removeNotification } from './notification/index';
export class NotificationRepository {
    notificationModel;
    constructor(notificationModel) {
        this.notificationModel = notificationModel;
    }
    async createNotification(senderId, receiverId, message, type, link) {
        return await createNotification(senderId, receiverId, message, type, link, this.notificationModel);
    }
    async notifications(userId) {
        return await notifications(userId, this.notificationModel);
    }
    async markAsReadNotification(notificationId) {
        await markAsRead(notificationId, this.notificationModel);
    }
    async removeNotification(receiverId, type) {
        await removeNotification(receiverId, type, this.notificationModel);
    }
}
