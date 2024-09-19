import { NotificationType } from "aws-sdk/clients/budgets";
import { INotification } from "../../../framework/database/mongoDB/model/notification";
export interface InotificationRepository {
    createNotification(senderId: string, receiverId: string, message: string, type: NotificationType, link: string): Promise<INotification | undefined>;
    notifications(userId: string): Promise<INotification[] | undefined>;
    markAsReadNotification(notificationId: string): Promise<void>;
    removeNotification(receiverId: string | undefined, type: string): Promise<void>;
}
