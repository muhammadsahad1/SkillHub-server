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
): Promise<ChatResponse | void> => {
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

    const messageWithAllData = await Promise.all(
      conversation?.messages.map(async (msg) => {
        const media = msg?.media
        if(media){
          const mediaImgUrl = await s3.getObjectUrl({
            bucket : process.env.C3_BUCKET_NAME,
            key : media
          })

          return {
            ...msg.toObject(),
            mediaUrl : mediaImgUrl
          }
        }
        return msg.toObject()

      })
    )

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
      messages: messageWithAllData,
      userWithProfileImage,
    };
    console.log("result ==>",result)
    return result;
  } catch (error) {
    console.error("Error in create conversation:", error);
    return undefined;
  }
};