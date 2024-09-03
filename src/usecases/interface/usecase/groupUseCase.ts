import { IGroupCreationData } from "../../../commonEntities/entities/createGroup";
import { IGroup } from "../../../commonEntities/entities/group";
import { Next } from "../../../framework/types/serverPackageType";

export interface IgroupUseCase {
  createGroup(
    groupData: IGroupCreationData,
    creatorId: string,
    groupImageFile: Express.Multer.File | undefined,
    next: Next
  ): Promise<{ success: boolean; message: string } | void>;

  getGroups(next : Next):Promise<IGroup[] | void>

  joinGroup (groupId : string , joinUserId : string,next : Next) : Promise<{success : boolean; message : string} | void>

  getGroup (groupId : string ,next : Next) : Promise<{success : boolean; message : string ;group : IGroup} | void>
}
