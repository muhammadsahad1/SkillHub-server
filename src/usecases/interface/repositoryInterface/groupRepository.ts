import { IGroupCreationData } from "../../../commonEntities/entities/createGroup";
import { IGroup } from "../../../commonEntities/entities/group";

export interface IGroupRepository {
  createGroup(
    groupData: IGroupCreationData,
    creatorId: string,
    groupImageFile: Express.Multer.File | undefined
  ): Promise<{ success: boolean; message: string } | void>;

  getGroups() :Promise<IGroup[] | void>

  joinGroup(groupId : string , joinUserId : string) :  Promise<{ success: boolean; message: string } | void>
}
