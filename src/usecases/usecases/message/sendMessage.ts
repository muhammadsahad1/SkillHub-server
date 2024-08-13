import { Next } from "../../../framework/types/serverPackageType"
import { ImessageRepository } from "../../interface/repositoryInterface/messageRepository"
import { ErrorHandler } from "../../middlewares/errorMiddleware"

export const sendMessage = async (
  senderId : string,
  receiverId : string,
  message : string,
  messageRepository : ImessageRepository,
  next : Next
) => {
  try {
    const result = await messageRepository.sendMessage(senderId,receiverId,message)

    if(!result){
      return next(new ErrorHandler(401,"Create a new conversation failed"))
    }
  
    return { success : true , result }
    
  } catch (error :any) {
    return next(new ErrorHandler(500,"Internal Server Error"));
  }
}