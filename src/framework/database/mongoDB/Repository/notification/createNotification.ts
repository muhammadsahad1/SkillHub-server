import mongoose from "mongoose";
import {
  INotification,
  NotificationModel,
  NotificationType,
} from "../../model/notification";

interface NewNotificationData {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  message: string;
  type: NotificationType;
  link : string,
  read: boolean;
}

export const createNotification = async (
  senderId: string, 
  receiverId: string,
  message: string,
  type: NotificationType,
  link : string,
  notificationModel: typeof NotificationModel
):Promise<INotification | undefined> => {
  try {
    const senderObjId = new mongoose.Types.ObjectId(senderId);
    const receiverObjId = new mongoose.Types.ObjectId(receiverId);

    const newNotification: NewNotificationData = {
      senderId: senderObjId,
      receiverId: receiverObjId,
      message,
      type,
      link,
      read: false,
    };

    const notification = await notificationModel.create(newNotification);
    console.log(notification);
    const result = await notification.save();
    console.log("createdNotification",result);
    return result   
  } catch (error) {
    console.error("Error in create conversation:", error);
    return undefined;
  }
};
