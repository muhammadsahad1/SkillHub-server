import mongoose from "mongoose";
import { IGroupMessage } from "../../../../commonEntities/entities/groupMessage";



const groupMessageSchema = new mongoose.Schema<IGroupMessage>(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    senderId: {
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
    readBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

groupMessageSchema.index({ senderId: 1 });

const GroupMessageModel = mongoose.model<IGroupMessage>(
  "GroupMessage",
  groupMessageSchema
);

export default GroupMessageModel;
