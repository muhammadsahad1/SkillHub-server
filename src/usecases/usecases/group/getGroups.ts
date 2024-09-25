import { IGroup } from "../../../commonEntities/entities/group.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const getGroups = async (
  next : Next,
  groupRepository : IGroupRepository,
):Promise<IGroup[] | void> => {
  try {
    const result = await groupRepository.getGroups()
    if(!result){
      return next(new ErrorHandler(401,"Get groups failed"))
    }
    return result
  } catch (error) {
    return next(new ErrorHandler(500,"Internal server error"))
  }
}