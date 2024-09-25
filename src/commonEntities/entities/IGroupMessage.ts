import mongoose from "mongoose";

export interface IGroupMessageRes {
  _id: mongoose.Types.ObjectId;
  message: string;
  media?: string | null;
  senderId: {
    _id: mongoose.Types.ObjectId;
    name?: string;
    userProfile: string;
  };
  createdAt: Date;
  readBy: mongoose.Types.ObjectId[];
}
