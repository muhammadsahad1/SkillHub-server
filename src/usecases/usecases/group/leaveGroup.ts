import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const leaveGroup = async (
  groupId: string,
  userId: string,
  groupRepository: IGroupRepository,
  next: Next
) => {
  try {
    const result = await groupRepository.leaveGroup(groupId, userId);
    if (!result) {
      return next(new ErrorHandler(401, "Failed to leave the group"));
    }
    console.log("res ==>",result)
    return result;
  } catch (error) {
    return next(new ErrorHandler(401,"Internal server error"))
  }
};
