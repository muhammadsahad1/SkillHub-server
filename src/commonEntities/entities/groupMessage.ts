import mongoose from "mongoose";

export interface IGroupMessage {
  groupId: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  message: string;
  media?: string;
  readBy: mongoose.Types.ObjectId[];
}
