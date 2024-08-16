import { link } from "fs";
import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  message: string;
  type: NotificationType;
  read: Boolean;
  link: string;
  createdAt: Date;
}

export type NotificationType = "follow" | "chat" | "like" | "comment";

const NotificationSchema: Schema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, require: true },
  type: {
    type: String,
    enum: ["follow", "chat", "like", "comment"],
    require: true,
  },
  read: { type: Boolean, default: false },
  link: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
});

export const NotificationModel = mongoose.model<INotification>(
  "Notification",
  NotificationSchema
);
