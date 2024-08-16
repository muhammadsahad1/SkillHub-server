
import { InotificationRepository } from "../../../../usecases/interface/repositoryInterface/notificationRepository";
import { INotification, NotificationModel,NotificationType } from "../model/notification";
import { createNotification, notifications} from './notification/index'

export class NotificationRepository implements InotificationRepository{
  constructor(private notificationModel : typeof NotificationModel){}

  async createNotification(senderId: string, receiverId: string, message: string, type: NotificationType): Promise<INotification | undefined> {
    return await createNotification(senderId,receiverId,message,type,this.notificationModel)
  } 
  
  async notifications(userId : string): Promise<INotification[] | undefined> {
    return await notifications(userId,this.notificationModel)
  }
  
}