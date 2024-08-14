import mongoose from "mongoose";
import { Imessage } from "../../../../commonEntities/entities/message";

const messsageSchema = new mongoose.Schema<Imessage>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    media: {
      type: String,
    },
    readBy : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
      }
    ]
  },
  // createdAt, updatedAt
  { timestamps: true }
);

const MessageModel = mongoose.model<Imessage>("Message", messsageSchema);
export default MessageModel;
