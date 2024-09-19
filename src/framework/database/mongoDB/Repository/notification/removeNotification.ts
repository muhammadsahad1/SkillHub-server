import { NotificationModel } from "../../model/notification.js";

export const removeNotification = async (
  receiverId: string,
  type: string,
  notificationModel: typeof NotificationModel
) => {
  try {
  
    const result = await notificationModel.deleteMany({ receiverId, type });
    console.log("resssss =>",result);
    
    if (result.deletedCount === 0) {
      console.log("No matching notification found.");
    } else {
      console.log(
        `Notification of type ${type} for receiver ${receiverId} has been deleted.`
      );
    }
  } catch (error) {
    console.error("fetch notifications failed:", error);
    return undefined;
  }
};
