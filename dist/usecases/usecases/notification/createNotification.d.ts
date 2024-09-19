import { Server } from "socket.io";
import { INotification, NotificationType } from "../../../framework/database/mongoDB/model/notification";
import { Next } from "../../../framework/types/serverPackageType";
import { InotificationRepository } from "../../interface/repositoryInterface/notificationRepository";
export declare const createNotification: (senderId: string, receiverId: string, message: string, type: NotificationType, link: string, notificationRepository: InotificationRepository, io: Server, next: Next) => Promise<INotification | undefined | void>;
