import mongoose, { Document } from "mongoose";
export interface INotification extends Document {
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    message: string;
    type: NotificationType;
    read: Boolean;
    link: string;
    createdAt: Date;
}
export type NotificationType = "follow" | "chat" | "like" | "comment" | "verifyRequestAccepted" | "verifyRequestRejected";
export declare const NotificationModel: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification> & INotification & Required<{
    _id: unknown;
}>, any>;
