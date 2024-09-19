import mongoose from "mongoose";
import ConversationModel from "../../model/conversation";
import MessageModel from "../../model/message";
export declare const sendMessage: (senderId: string, receiverId: string, message: string, messageModel: typeof MessageModel, conversationModel: typeof ConversationModel) => Promise<(mongoose.Document<unknown, {}, import("../../../../../commonEntities/entities/message").Message> & import("../../../../../commonEntities/entities/message").Message & Required<{
    _id: string;
}>) | undefined>;
