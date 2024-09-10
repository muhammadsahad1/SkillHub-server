import { IGroupCreationData } from "../../commonEntities/entities/createGroup";
import { IGroup, IMember } from "../../commonEntities/entities/group";
import { Next } from "../../framework/types/serverPackageType";
import { IGroupRepository } from "../interface/repositoryInterface/groupRepository";
import { IgroupUseCase } from "../interface/usecase/groupUseCase";
import {
  createGroup,
  getGroup,
  getGroups,
  joinGroup,
  leaveGroup,
  messages,
  sendMessage,
  updateOnlineStatus,
} from "./group/index";

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
    return await getGroups(next, this.groupRepository);
  }

  async joinGroup(
    groupId: string,
    joinUserId: string,
    next: Next
  ): Promise<{ success: boolean; message: string } | void> {
    return await joinGroup(groupId, joinUserId, this.groupRepository, next);
  }

  async getGroup(groupId: string, next: Next): Promise<IGroup | void> {
    return await getGroup(groupId, this.groupRepository, next);
  }

  async sendMessage(
    senderId: string,
    groupId: string,
    message: string,
    next: Next
  ): Promise<{ success: boolean; message: string } | void> {
    return await sendMessage(
      senderId,
      groupId,
      message,
      this.groupRepository,
      next
    );
  }

  async messages(groupId: string, next: Next): Promise<any> {
    return await messages(groupId, this.groupRepository, next);
  }

  async updateOnlineStatus(
    groupId: string,
    userId: string,
    status: boolean,
    next: Next
  ): Promise<{
    success: boolean;
    message: string;
    updatedMember?: IMember;
  } | void> {
    console.log("usecaseil");

    return await updateOnlineStatus(
      groupId,
      userId,
      status,
      this.groupRepository,
      next
    );
  }

  async leaveGroup(
    groupId: string,
    userId: string,
    next: Next
  ): Promise<{ success: boolean; message: string } | void> {
    return await leaveGroup(groupId, userId, this.groupRepository, next);
  }
}
