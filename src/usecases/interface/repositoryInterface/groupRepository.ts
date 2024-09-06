import { IGroupCreationData } from "../../../commonEntities/entities/createGroup";
import { IGroup, IMember } from "../../../commonEntities/entities/group";

export interface IGroupRepository {
  createGroup(
    groupData: IGroupCreationData,
    creatorId: string,
    groupImageFile: Express.Multer.File | undefined
  ): Promise<{ success: boolean; message: string } | void>;

  getGroups() :Promise<IGroup[] | void>

  joinGroup(groupId : string , joinUserId : string) :  Promise<{ success: boolean; message: string } | void>

  getGroup(groupId : string) : Promise<IGroup | void>

  sendMessage(senderId : string,grouId : string , message : string) : Promise<{success : boolean , message : string} | void>

   messages(groupId : string) :Promise<any>

   updateOnlineStatus(groupId : string , userId : string , status : boolean  ): Promise<{
    success: boolean;
    message: string;
    updatedMember?: IMember;
  } | void>;
}
