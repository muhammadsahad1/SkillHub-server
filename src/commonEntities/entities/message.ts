import mongoose from "mongoose";

export interface Imessage {
  senderId: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
  message: string;
  media?: string;
}
