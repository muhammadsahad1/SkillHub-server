import { INotification, NotificationModel } from "../../model/notification";
export declare const notifications: (userId: string, notificationModel: typeof NotificationModel) => Promise<INotification[] | undefined>;
