import { NotificationType } from "aws-sdk/clients/budgets";
import { INotification } from "../../../framework/database/mongoDB/model/notification";
import { Next } from "../../../framework/types/serverPackageType";

export interface InotificationUseCase {
  createNotification(senderId : string ,  receiverId: string, message: string,type : NotificationType,link : string,next : Next):  Promise<INotification | undefined | void> 
  notifications(userId : string,next : Next):Promise<INotification[]>
}