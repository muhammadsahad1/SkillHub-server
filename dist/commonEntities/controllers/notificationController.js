export class NotificationController {
    notificationUseCase;
    constructor(notificationUseCase) {
        this.notificationUseCase = notificationUseCase;
    }
    // creating new notification
    async createNotification(req, res, next) {
        const { senderId, receiverId, message, type, link } = req.body;
        const result = await this.notificationUseCase.createNotification(senderId, receiverId, message, type, link, next);
        res.status(201).json(result);
    }
    // get all notifications
    async getNotifications(req, res, next) {
        const userId = req.user?.id;
        const result = await this.notificationUseCase.notifications(userId, next);
        res.status(201).json(result);
    }
    // marking as read the notification
    async markAsRead(req, res, next) {
        console.log("Received markAsRead request");
        console.log("Request body:", req.body);
        const { notificationId } = req.body;
        const result = await this.notificationUseCase.markAsRead(notificationId, next);
        res.status(201).json(result);
    }
}
