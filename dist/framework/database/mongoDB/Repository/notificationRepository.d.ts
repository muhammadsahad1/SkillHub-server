import { InotificationRepository } from "../../../../usecases/interface/repositoryInterface/notificationRepository";
import { INotification, NotificationModel, NotificationType } from "../model/notification";
export declare class NotificationRepository implements InotificationRepository {
    private notificationModel;
    constructor(notificationModel: typeof NotificationModel);
    createNotification(senderId: string, receiverId: string, message: string, type: NotificationType, link: string): Promise<INotification | undefined>;
    notifications(userId: string): Promise<INotification[] | undefined>;
    markAsReadNotification(notificationId: string): Promise<void>;
    removeNotification(receiverId: string, type: string): Promise<void>;
}
