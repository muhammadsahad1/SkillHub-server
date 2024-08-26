import { Server } from "socket.io";
import {
  INotification,
  NotificationType,
} from "../../../framework/database/mongoDB/model/notification";
import { Next } from "../../../framework/types/serverPackageType";
import { InotificationRepository } from "../../interface/repositoryInterface/notificationRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const createNotification = async (
  senderId: string,
  receiverId: string,
  message: string,
  type: NotificationType,
  link : string,
  notificationRepository: InotificationRepository,
  io: Server,
  next: Next
): Promise<INotification | undefined | void> => {
  try {
    // Create a new notification entry in the database
    const notification = await notificationRepository.createNotification(
      senderId,
      receiverId,
      message,
      type,
      link
    );

    // If the notification was created successfully, emit it to the relevant room
    if (notification) {
      io.to(`user_${receiverId}`).emit("notification", notification);
    }

    return notification;
  } catch (error: any) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};
