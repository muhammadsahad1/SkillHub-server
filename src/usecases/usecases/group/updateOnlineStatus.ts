import { IMember } from "../../../commonEntities/entities/group";
import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const updateOnlineStatus = async (
  groupId: string,
  userId: string,
  status: boolean,
  groupRepository: IGroupRepository,
  next: Next
): Promise<{ success: boolean; message: string ,updatedMember?: IMember } | void> => {
  try {
    console.log("ethi");
    
    const result = await groupRepository.updateOnlineStatus(
      groupId,
      userId,
      status
    );
    if (!result) {
      return next(new ErrorHandler(401, "update online status failed"));
    }
    return result;
  } catch (error) {
    return next(new ErrorHandler(500, "Internal server error"));
  }
};
