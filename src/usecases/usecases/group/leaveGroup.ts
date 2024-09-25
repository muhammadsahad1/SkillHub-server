import { Next } from "../../../framework/types/serverPackageType.js";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

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
