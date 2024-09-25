import { IGroupCreationData } from "../../../../commonEntities/entities/createGroup.js";
import { IGroup } from "../../../../commonEntities/entities/group.js";
import { IGroupRepository } from "../../../../usecases/interface/repositoryInterface/groupRepository.js";
import { IS3Operations } from "../../../service/s3Bucket.js";
import GroupMessageModel from "../model/groupMessageModel.js";
import { GroupModel } from "../model/groupModel.js";
import userModel from "../model/userModel.js";
import {
  createGroup,
  getGroup,
  getGroups,
  joinGroup,
  leaveGroup,
  messages,
  sendMessage,
  updateOnlineStatus,
} from "./group/index.js";

export class GroupRepository implements IGroupRepository {
  constructor(
    private groupModel: typeof GroupModel,
    private s3Operations: IS3Operations,
    private userModels: typeof userModel,
    private groupMessageModel: typeof GroupMessageModel
  ) {}

  async createGroup(
    groupData: IGroupCreationData,
    creatorId: string,
    groupImageFile: Express.Multer.File | undefined
  ): Promise<{ success: boolean; message: string } | void> {
    return await createGroup(
      groupData,
      creatorId,
      groupImageFile,
      this.s3Operations,
      this.groupModel
    );
  }

  async getGroups(): Promise<IGroup[] | void> {
    return await getGroups(this.groupModel, this.s3Operations);
  }

  async joinGroup(
    groupId: string,
    joinUserId: string
  ): Promise<{ success: boolean; message: string } | void> {
    return await joinGroup(groupId, joinUserId, this.groupModel);
  }

  async getGroup(groupId: string): Promise<IGroup | void> {
    return await getGroup(
      groupId,
      this.s3Operations,
      this.groupModel,
      this.userModels
    );
  }

  async sendMessage(
    senderId: string,
    groupId: string,
    message: string
  ): Promise<{ success: boolean; message: string } | void> {
    return await sendMessage(
      senderId,
      groupId,
      message,
      this.groupMessageModel
    );
  }

  async messages(groupId: string): Promise<any> {
    return await messages(
      groupId,
      this.groupMessageModel,
      this.groupModel,
      this.userModels,
      this.s3Operations
    );
  }

  async updateOnlineStatus(
    groupId: string,
    userId: string,
    status: boolean
  ): Promise<{ success: boolean; message: string } | void> {
    return await updateOnlineStatus(groupId, userId, status, this.groupModel);
  }

  async leaveGroup(
    groupId: string,
    userId: string
  ): Promise<{ success: boolean; message: string } | void> {
    return await leaveGroup(groupId, userId, this.groupModel);
  }
}
