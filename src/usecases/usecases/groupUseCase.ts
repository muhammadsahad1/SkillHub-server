import { IGroup } from "../../commonEntities/entities/group";
import { Next } from "../../framework/types/serverPackageType";
import { IGroupRepository } from "../interface/repositoryInterface/groupRepository";
import { IgroupUseCase } from "../interface/usecase/groupUseCase";
import { createGroup } from "./group/index";

// ================================ GroupUseCase =========================== \\
export class GroupUseCase implements IgroupUseCase {
  constructor(private groupRepository: IGroupRepository) {}
  async createGroup(
    groupData: IGroup,
    creatorId: string,
    groupImageFile: Express.Multer.File | undefined,
    next: Next
  ): Promise<{ success: boolean; message: string } | void> {
    return await createGroup(groupData, creatorId,groupImageFile, this.groupRepository, next);
  }
}
