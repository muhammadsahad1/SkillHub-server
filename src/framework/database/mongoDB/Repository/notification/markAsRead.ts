import { NotificationModel } from "../../model/notification";

export const markAsRead = async (
  notificationId: string,
  notificationModel: typeof NotificationModel
) => {
  try {

    const notiffy = await notificationModel.findByIdAndUpdate(notificationId,{
      read : true
    },{ new : true })
    console.log("notiyyyy ====>",notiffy);
    
} catch (error) {
    console.error("Error in create conversation:", error)
  }
};
