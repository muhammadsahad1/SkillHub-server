import mongoose from "mongoose";
import ConversationModel from "../../model/conversation.js";
import MessageModel from "../../model/message.js";

// here while user sending message that time conversation is creating
export const sendMessage = async (
  senderId: string,
  receiverId: string,
  message: string,
  messageModel: typeof MessageModel,
  conversationModel: typeof ConversationModel
) => {

  try {

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // creating conversation if the converstion not exists
    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],lastMessage: null
      });
    }

    const newMessage = new messageModel({
      senderId,
      receiverId,
      message,
      media : "",
    });
    console.log("neww=>",newMessage);
    
    
    if (newMessage) {
      await newMessage.save();
      conversation.messages.push(
        newMessage._id as any
      );

      conversation.lastMessage = newMessage._id as any

      await conversation.save();
      return newMessage;
    }

  } catch (error) {
    console.error("Error in create conversation:", error);
    return undefined;
  }
};
