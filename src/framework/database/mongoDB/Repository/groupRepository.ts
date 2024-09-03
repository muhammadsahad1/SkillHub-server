import { IGroupCreationData } from "../../../../commonEntities/entities/createGroup";
import { IGroup } from "../../../../commonEntities/entities/group";
import { IGroupRepository } from "../../../../usecases/interface/repositoryInterface/groupRepository";
import { IS3Operations } from "../../../service/s3Bucket";
import { GroupModel } from "../model/groupModel";
import { createGroup, getGroups} from './group/index'

export class GroupRepository implements IGroupRepository {
  constructor(
    private groupModel: typeof GroupModel,
    private s3Operations: IS3Operations
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
    return await getGroups(this.groupModel,this.s3Operations)
  }

  async joinGroup(groupId : string , joinUserId : string) : Promise<{success :boolean,message : string} | void> {
    return await joinGrop
  }
}
