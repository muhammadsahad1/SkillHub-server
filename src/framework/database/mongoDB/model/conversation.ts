import mongoose from "mongoose";
import { Iconversation } from "../../../../commonEntities/entities/conversation";

const conversationSchema = new mongoose.Schema<Iconversation>(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    lastMessage: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

const ConversationModel = mongoose.model<Iconversation>(
  "Conversation",
  conversationSchema
);
export default ConversationModel;
