import ConversationModel from "../../model/conversation";
import MessageModel from "../../model/message";

export const markMessagesAsRead = async (
  conversationId: string,
  userId: string,
  messageModal : typeof MessageModel,
  conversationModel: typeof ConversationModel
) => {
  try {
    console.log("vannnn ===>",conversationId);
    
    // Find the conversation and populate messages
    const conversation = await conversationModel
      .findById(conversationId)
      .populate("messages");

    if (!conversation) {
      return;
    }

    await Promise.all(    
      conversation?.messages.map(async (message: any) => {
        console.log("messagesss ====>",message);
        
        if (message && !message.readBy.includes(userId)) {
          message.readBy.push(userId);
          await messageModal.updateOne(
            {
              _id: message._id,
            },
            { $addToSet: { readBy: userId } }
          );
        }
      })
    );

  } catch (error) {
    console.error("Error in markMessagesAsRead:", error);
  }
};
