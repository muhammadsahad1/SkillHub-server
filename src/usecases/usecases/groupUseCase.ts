import { IGroupCreationData } from "../../commonEntities/entities/createGroup";
import { IGroup } from "../../commonEntities/entities/group";
import { Next } from "../../framework/types/serverPackageType";
import { IGroupRepository } from "../interface/repositoryInterface/groupRepository";
import { IgroupUseCase } from "../interface/usecase/groupUseCase";
import { createGroup, getGroups, joinGroup } from "./group/index";

// ================================ GroupUseCase =========================== \\
export class GroupUseCase implements IgroupUseCase {
  constructor(private groupRepository: IGroupRepository) {}


  async createGroup(
    groupData: IGroupCreationData,
    creatorId: string,
    groupImageFile: Express.Multer.File | undefined,
    next: Next
  ): Promise<{ success: boolean; message: string } | void> {
    return await createGroup(
      groupData,
      creatorId,
      groupImageFile,
      this.groupRepository,
      next
    );
  }

async getGroups(next: Next): Promise<IGroup[] | void> {
    return await getGroups(next,this.groupRepository);
  }

  async joinGroup(groupId: string, joinUserId: string, next: Next): Promise<{ success: boolean; message: string; } | void> {
    return await joinGroup(groupId,joinUserId,this.groupRepository,next)
  }

  async getGroup(groupId: string, next: Next): Promise<{ success: boolean; message: string; group: IGroup; } | void> {
    throw new Error("Method not implemented.");
  }

}
