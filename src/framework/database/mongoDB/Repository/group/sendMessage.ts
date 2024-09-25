import mongoose from "mongoose";
import GroupMessageModel from "../../model/groupMessageModel.js";

export const sendMessage = async (
  senderId: string,
  groupId: string,
  message: string,
  groupMessageModel: typeof GroupMessageModel
) : Promise<{ success: boolean; message: string; } | void> => {
  try {
  
    const senderID = new mongoose.Types.ObjectId(senderId);
    const groupID = new mongoose.Types.ObjectId(groupId);

    await groupMessageModel.create({
      groupId: groupID,
      senderId: senderID,
      message,
    });

    return {
      success: true,
      message: "Send Message",
    };
  } catch (error) {
    return {
      success: false,
      message: "falied to update the send message",
    };
  }
};
