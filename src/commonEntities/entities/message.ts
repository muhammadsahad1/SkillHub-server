import mongoose from "mongoose";
;

export interface IUser {
  _id: mongoose.Types.ObjectId;
  email: string;
  name: string;
  profileImage?: string;
  profileImageUrl?: string; // Optional, to be added in the response
}

export interface Imessage {
  senderId: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
  message: string;
  media?: string;
  readBy : mongoose.Schema.Types.ObjectId[]
}


export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  media?: string;
  createdAt: Date;
  updatedAt: Date;
  readBy: string[];
}


export interface MessageWithSenderProfileResponse {
  messages: Message[];
  userWithProfileImage: IUser;
}


export type ChatResponse = MessageWithSenderProfileResponse | IUser | undefined;