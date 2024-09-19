import mongoose from "mongoose";
import {
  INotification,
  NotificationModel,
  NotificationType,
} from "../../model/notification.js";

interface NewNotificationData {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  message: string;
  type: NotificationType;
  link: string;
  read: boolean;
}

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id);

export const createNotification = async (
  senderId: string, 
  receiverId: string,
  message: string,
  type: NotificationType,
  link: string,
  notificationModel: typeof NotificationModel
): Promise<INotification | undefined> => {
  try {
    // Validate ObjectId
    if (!isValidObjectId(senderId) || !isValidObjectId(receiverId)) {
      throw new Error('Invalid ObjectId format');
    }

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

    console.log("newNoti==>",newNotification);
  
    const notification = await notificationModel.create(newNotification);
    const result = await notification.save();
    return result;   
    
  } catch (error) {
    console.error("Error in createNotification:", error);
    return undefined;
  }
};
