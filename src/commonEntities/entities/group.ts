import mongoose, { Schema, Document } from "mongoose";


export interface IMember {
  userId : mongoose.Types.ObjectId,
  isOnline : boolean,
}

export interface IGroup {
  groupName: string;
  description: string;
  creatorId: mongoose.Types.ObjectId;
  members: IMember[]; // Corrected: members should be an array of IMember
  skills: string[];
  created_at?: Date;
  updated_at?: Date;
  groupImage?: string;
  userName?: string;
  profileImageUrl: string;
  groupImageUrl?: string;
}
