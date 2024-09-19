import { IGroupCreationData } from "../../../commonEntities/entities/createGroup.js";
import { IGroup } from "../../../commonEntities/entities/group.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const createGroup = async (
  groupData: IGroupCreationData,
  creatorId: string,
  groupImageFile: Express.Multer.File | undefined,
  groupRepository: IGroupRepository,
  next: Next
): Promise<{ success: boolean; message: string } | void> => {
  try {
    const result = await groupRepository.createGroup(
      groupData,
      creatorId,
      groupImageFile
    );
    if (!result) {
      return next(new ErrorHandler(401, "Group creation falied"));
    }
    return result;
  } catch (error) {
    return next(new ErrorHandler(401, "Internal server error"));
  }
};
