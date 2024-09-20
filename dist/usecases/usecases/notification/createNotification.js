import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const createNotification = async (senderId, receiverId, message, type, link, notificationRepository, io, next) => {
    try {
        // Create a new notification entry in the database
        const notification = await notificationRepository.createNotification(senderId, receiverId, message, type, link);
        // If the notification was created successfully, emit it to the relevant room
        if (notification) {
            io.to(`user_${receiverId}`).emit("notification", notification);
        }
        return notification;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
