import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const joinGroup = async (
  groupId: string,
  joinUserId: string,
  groupRepository: IGroupRepository,
  next: Next
): Promise<{ success: boolean; message: string } | void> => {
  try {
    const result = await groupRepository.joinGroup(groupId, joinUserId);
    if (!result) {
      return next(new ErrorHandler(401, "join group failed"));
    }
    console.log("res ==>",result)
    return result;
  } catch (error) {
    return next(new ErrorHandler(401,"Internal server error"))
  }
};