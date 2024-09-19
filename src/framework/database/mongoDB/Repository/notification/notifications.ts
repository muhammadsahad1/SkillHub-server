import mongoose from "mongoose";
import { INotification, NotificationModel } from "../../model/notification.js";

export const notifications = async (
  userId :  string,
  notificationModel : typeof NotificationModel
): Promise<INotification[] | undefined> => {
  try {
    // fetching the notifications which didnt read
    const notifications = await notificationModel.find({
      receiverId : userId,
      read : false
    }).sort({ createdAt: -1 });

    console.log("notifications =====>",notifications);
    return notifications
  } catch (error) {
    console.error("fetch notifications failed:", error);
    return undefined;
  }
}