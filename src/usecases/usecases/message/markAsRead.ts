import { Next } from "../../../framework/types/serverPackageType";
import { ImessageRepository } from "../../interface/repositoryInterface/messageRepository";

export const markAsRead = async (
  conversationId : string,
  userId : string,
  messageRepository : ImessageRepository,
  next : Next
) => {
  try {
    console.log("conversationId ===>",conversationId);
    console.log("userId ===>",userId);
    
    await messageRepository.markAsRead(conversationId,userId)
    
  } catch (error) {
    console.log("error in markAsRead ",error);
      
  }
}