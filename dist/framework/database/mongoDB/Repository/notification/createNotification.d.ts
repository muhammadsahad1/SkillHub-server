import { INotification, NotificationModel, NotificationType } from "../../model/notification";
export declare const createNotification: (senderId: string, receiverId: string, message: string, type: NotificationType, link: string, notificationModel: typeof NotificationModel) => Promise<INotification | undefined>;
