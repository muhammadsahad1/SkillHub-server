
import { INotification, NotificationModel ,NotificationType } from "../../framework/database/mongoDB/model/notification.js";
import { InotificationUseCase } from "../interface/usecase/notificationUseCase.js";
import { createNotification , markAsRead, notifications } from './notification/index.js'
import { Next } from "../../framework/types/serverPackageType.js";
import { InotificationRepository } from "../interface/repositoryInterface/notificationRepository.js";
import { Server } from 'socket.io'

// ================================= Notificantion use cases ================================= \\

export class NotificationUseCase implements InotificationUseCase {
  private io : Server
  constructor (private notificationRepository : InotificationRepository ,
    io : Server
  ){
    this.io = io
  }

  async createNotification(senderId: string, receiverId: string, message: string, type: NotificationType,link : string,next : Next):  Promise<INotification | undefined | void> {
    return await createNotification(senderId, receiverId, message, type,link,this.notificationRepository,this.io,next)
  }

  async notifications(userId : string,next: Next):  Promise<INotification[] | undefined | void> {
    return await notifications(userId,this.notificationRepository,next)
  }

  async markAsRead(notificationId: string, next: Next): Promise<void> {
     await markAsRead(notificationId,this.notificationRepository,next)
  }

  
}