import mongoose from "mongoose";

export interface Ipost {
  userId: mongoose.Types.ObjectId;
  imageName: string;
  caption: string;
  type: "image" | "video" | "thoughts";
  likes: mongoose.Types.ObjectId;
  comments: {
    _id: any;
    userId: mongoose.Types.ObjectId[];
    userName: string;
    comment: string;
    created_at: Date;
  }[];
  saves: mongoose.Types.ObjectId[];
  reports: mongoose.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IComment {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId[]; // Ensure this is a single ObjectId, not an array
  userName: string;
  comment: string;
  created_at: Date;
}
