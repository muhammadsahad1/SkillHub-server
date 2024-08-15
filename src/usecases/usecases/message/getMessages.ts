import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { ImessageRepository } from "../../interface/repositoryInterface/messageRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const getChat = async (
  userToChatId: string,
  senderId: string,
  s3 : IS3Operations,
  messageRepository: ImessageRepository,
  next: Next
) => {
  try {
    const result = await messageRepository.getChat(userToChatId, senderId,s3);
    if (!result) {
      return next(new ErrorHandler(401, "Getting the messages failed"));
    }
    console.log("result ===>",result);  
    return result;
  } catch (error: any) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};
