import mongoose, { Schema, Document } from "mongoose";

export interface IGroup extends Document {
  groupName: string;
  description: string;
  creator: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  skills: string[];
  created_at?: Date;
  updated_at?: Date;
  groupImage?: string;

  pendingRequests: mongoose.Types.ObjectId[];
  admin: mongoose.Types.ObjectId[];
}