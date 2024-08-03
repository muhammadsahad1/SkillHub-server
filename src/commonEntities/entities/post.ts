import mongoose from "mongoose";

export interface Ipost {
  userId: mongoose.Types.ObjectId;
  imageName: string;
  caption: string;
  createdAt?: Date;
  updatedAt?: Date;
}
