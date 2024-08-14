import { IS3Operations } from "../../../../service/s3Bucket";
import ConversationModel from "../../model/conversation";
import userModel from "../../model/userModel";

export const getConversationsUsers = async (
  userId: string,
  s3: IS3Operations,
  userModels: typeof userModel,
  conversationModal: typeof ConversationModel
) => {
  console.log("keriiiiiiiiiii ====>");
  
  try {
    const conversations = await conversationModal
      .find({ participants: userId })
      .populate({
        path: "participants",
        select: "name email profileImage",
        match: { _id: { $ne: userId } },
      })
      .populate({
        path: "lastMessage",
        select: "message senderId createdAt",
      });

   const chatList = conversations.map((conversation) => {
    console.log("conversation =>",conversation);
    
    // Calculate unread messages for the current user
    const unreadCount = conversation.messages.filter(
      (message: any) => !message.readBy.includes(userId)
    ).length;

    return {
      _id: conversation._id,
      user: conversation.participants[0], // Since we excluded the current user, this is the other user
      lastMessage: conversation.lastMessage,
      unreadCount, // Include the unread message count
    };
  });

  console.log("chatlist ====>",chatList);
  return chatList;

  } catch (error) {
    console.error("Error in create conversation:", error);
    return undefined;
  }
};
