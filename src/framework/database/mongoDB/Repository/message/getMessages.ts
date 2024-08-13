import { Iconversation } from "../../../../../commonEntities/entities/conversation";
import { Imessage } from "../../../../../commonEntities/entities/message";
import { IS3Operations } from "../../../../service/s3Bucket";
import ConversationModel from "../../model/conversation";
import userModel from "../../model/userModel";

export const getChat = async (
  userToChatId: string,
  senderId: string,
  userModels: typeof userModel,
  s3: IS3Operations,
  conversationModel: typeof ConversationModel
): Promise<any> => {
  try {
    console.log("userTOchjat ==>",userToChatId);
    
    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, userToChatId] },
      })
      .populate("messages");

      console.log("converstion =========>",conversation);
      

    if (!conversation || !conversation.messages) {
      return null;
    }

    const messages = conversation?.messages;
    const user = await userModels
      .findById(senderId)
      .select("_id name email profileImage");

    let profileImageUrl = "";
    if (user?.profileImage) {
      profileImageUrl = await s3.getObjectUrl({
        bucket: process.env.C3_BUCKET_NAME,
        key: user?.profileImage,
      });
    }

    const result = {
      user : user,
      profileImageUrl : profileImageUrl,
      messages : messages,
    };
    console.log("resiult++++++++++++++>",result);

  } catch (error) {
    console.error("Error in create conversation:", error);
    return undefined;
  }
};
