import mongoose from "mongoose";

export interface Iconversation {
  participants: mongoose.Schema.Types.ObjectId[];
  messages: mongoose.Schema.Types.ObjectId[];
}
