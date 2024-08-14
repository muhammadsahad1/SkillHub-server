import { Iconversation } from "../../../../../commonEntities/entities/conversation";
import { ChatResponse,} from "../../../../../commonEntities/entities/message";
import { IS3Operations } from "../../../../service/s3Bucket";
import ConversationModel from "../../model/conversation";
import userModel from "../../model/userModel";

export const getChat = async (
  userToChatId: string,
  senderId: string,
  userModels: typeof userModel,
  s3: IS3Operations,
  conversationModel: typeof ConversationModel
): Promise<ChatResponse> => {
  try {
    console.log("userTOchjat ==>", userToChatId);

    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, userToChatId] },
      })
      .populate("messages");

    if (!conversation || !conversation.messages) {
      const user = await userModels
      .findById(userToChatId)
      .select("_id name email profileImage");

      let profileImageUrl = "";
      if (user?.profileImage) {
        profileImageUrl = await s3.getObjectUrl({
          bucket: process.env.C3_BUCKET_NAME,
          key: user?.profileImage,
        });
      }
  
      const userWithProfileImage = {
        ...user?.toObject(),
        profileImageUrl: profileImageUrl,
      };
      
      const result = {
        userWithProfileImage,
      };

      return result
    }

    const messages = conversation?.messages;
    const user = await userModels
      .findById(userToChatId)
      .select("_id name email profileImage");

    let profileImageUrl = "";
    if (user?.profileImage) {
      profileImageUrl = await s3.getObjectUrl({
        bucket: process.env.C3_BUCKET_NAME,
        key: user?.profileImage,
      });
    }

    const userWithProfileImage = {
      ...user?.toObject(),
      profileImageUrl: profileImageUrl,
    };
    
    const result = {
      messages: messages,
      userWithProfileImage,
    };

    return result;
  } catch (error) {
    console.error("Error in create conversation:", error);
    return undefined;
  }
};
