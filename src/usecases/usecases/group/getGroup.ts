import { IGroup } from "../../../commonEntities/entities/group";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const getGroup = async (
  groupId: string,
  groupRepository: IGroupRepository,
  next: Next
):Promise<IGroup | void> => {
  try {
    const result = await groupRepository.getGroup(groupId);
    if (!result) {
      return next(new ErrorHandler(401, "fetch group were failed"));
    }
    console.log("res ==>",result)
    return result;
  } catch (error) {
    return next(new ErrorHandler(500, "Internal server error"));
  }
};