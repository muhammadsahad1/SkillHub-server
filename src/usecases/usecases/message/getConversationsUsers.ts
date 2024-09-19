
import { IS3Operations } from "../../../framework/service/s3Bucket.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { ImessageRepository } from "../../interface/repositoryInterface/messageRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const getConversationsUsers = async (
  userId : string,
  messageRepository : ImessageRepository,
  s3 : IS3Operations,
  next : Next
) => {
  try {
    const result = await messageRepository.getConversationsUsers(userId,s3)
    if(!result){
      return next(new ErrorHandler(401, "Getting the messages failed"));
    }
    return result
  } catch (error :any) {
    return next(new ErrorHandler(500,"Internal Server Error"));
  }
}