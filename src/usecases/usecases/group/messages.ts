import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const messages = async (
  groupId: string,
  groupRepository: IGroupRepository,
  next: Next
) => {
    try {
      const result = await groupRepository.messages(groupId);
      if (!result) {
        return next(new ErrorHandler(401, "join group failed"));
      }
      console.log("res ==>",result)
      return result;
    } catch (error) {
      return next(new ErrorHandler(401,"Internal server error"))
    }
};
