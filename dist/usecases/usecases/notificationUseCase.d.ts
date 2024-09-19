import { INotification, NotificationType } from "../../framework/database/mongoDB/model/notification";
import { InotificationUseCase } from "../interface/usecase/notificationUseCase";
import { Next } from "../../framework/types/serverPackageType";
import { InotificationRepository } from "../interface/repositoryInterface/notificationRepository";
import { Server } from 'socket.io';
export declare class NotificationUseCase implements InotificationUseCase {
    private notificationRepository;
    private io;
    constructor(notificationRepository: InotificationRepository, io: Server);
    createNotification(senderId: string, receiverId: string, message: string, type: NotificationType, link: string, next: Next): Promise<INotification | undefined | void>;
    notifications(userId: string, next: Next): Promise<INotification[] | undefined | void>;
    markAsRead(notificationId: string, next: Next): Promise<void>;
}
