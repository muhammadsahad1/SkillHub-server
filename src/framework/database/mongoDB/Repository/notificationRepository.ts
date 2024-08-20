
import { InotificationRepository } from "../../../../usecases/interface/repositoryInterface/notificationRepository";
import { INotification, NotificationModel,NotificationType } from "../model/notification";
import { createNotification, markAsRead, notifications, removeNotification} from './notification/index'

export class NotificationRepository implements InotificationRepository{
  constructor(private notificationModel : typeof NotificationModel){}

  async createNotification(senderId: string, receiverId: string, message: string, type: NotificationType,link : string): Promise<INotification | undefined> {
    return await createNotification(senderId,receiverId,message,type,link,this.notificationModel)
  } 
  
  async notifications(userId : string): Promise<INotification[] | undefined> {
    return await notifications(userId,this.notificationModel)
  }
  
  async markAsReadNotification(notificationId: string): Promise<void> {
    await markAsRead(notificationId,this.notificationModel)
  }

  async removeNotification(receiverId: string, type: string): Promise<void> {
    await removeNotification(receiverId,type,this.notificationModel)
  }
  
}