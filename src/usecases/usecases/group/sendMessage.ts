import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const sendMessage = async (
  senderId: string,
  groupId: string,
  message: string,
  groupRepository: IGroupRepository,
  next: Next
): Promise<{ success: boolean; message: string } | void> => {
  try {
    
    const result = await groupRepository.sendMessage(
      senderId,
      groupId,
      message
    );

    if (!result) {
      return next(new ErrorHandler(401, "send message is failed"));
    }
    return result;
  } catch (error) {
    return next(new ErrorHandler(401, "Internal server error "));
  }
};
