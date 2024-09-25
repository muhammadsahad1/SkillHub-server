import { IS3Operations } from "../../../../service/s3Bucket.js";
import ConversationModel from "../../model/conversation.js";
import MessageModel from "../../model/message.js";


export const getConversationsUsers = async (
  userId: string,
  s3: IS3Operations,
  messageModel: typeof MessageModel,
  conversationModal: typeof ConversationModel
) => {
  try {
    console.log("userId : ==>",userId);
    
    // finding the conversation of with userId and
    //populating the participants where exlude current userId
    const conversations = await conversationModal
      .find({ participants: userId })
      .populate({
        path: "participants",
        select: "_id name email profileImage",
        match: { _id: { $ne: userId } },
      })
      .populate({
        path: "lastMessage", // here populating the lastMesage for find the lastMessage
        select: "message senderId createdAt readBy media",
      });
  

    // Here fetching the otherUsers to lists in chat with imageUrl
    const chatList = await Promise.all(
      conversations.map(async (conversation : any) => {
        console.log("conversation =>", conversation);
        const otherUser = conversation.participants[0];
        const lastMessage = conversation.lastMessage;
        

        // generating resign url of profile image
        const profileImageUrl = await s3.getObjectUrl({
          bucket: process.env.C3_BUCKET_NAME,
          key: otherUser?.profileImage,
        });
        let lastMessageUrl = ""
        if(lastMessage?.media){
          lastMessageUrl = await s3.getObjectUrl({
            bucket : process.env.C3_BUCKET_NAME,
            key : lastMessage?.media
          })
        }

      
        return {
          _id: conversation._id,
          user: {
            _id: otherUser?._id,
            name: otherUser?.name || "Unknown",
            profileImageUrl: profileImageUrl || "",
          },
          lastMessage: lastMessage ? lastMessage?.message : "",
          media : lastMessageUrl || "",
          isRead: lastMessage
          ? lastMessage.readBy.includes(userId.toString())
          : false,
          lastMessageTime : lastMessage?.createdAt || lastMessage?.updatedaAt,
        };
      })
    );

    console.log("chatList ===>", chatList);
    return chatList;

  } catch (error) {
    console.error("Error in create conversation:", error);
    return undefined;
  }
};
