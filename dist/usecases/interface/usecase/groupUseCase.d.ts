import { IGroupCreationData } from "../../../commonEntities/entities/createGroup";
import { IGroup, IMember } from "../../../commonEntities/entities/group";
import { Next } from "../../../framework/types/serverPackageType";
export interface IgroupUseCase {
    createGroup(groupData: IGroupCreationData, creatorId: string, groupImageFile: Express.Multer.File | undefined, next: Next): Promise<{
        success: boolean;
        message: string;
    } | void>;
    getGroups(next: Next): Promise<IGroup[] | void>;
    joinGroup(groupId: string, joinUserId: string, next: Next): Promise<{
        success: boolean;
        message: string;
    } | void>;
    getGroup(groupId: string, next: Next): Promise<IGroup | void>;
    sendMessage(senderId: string, grouId: string, message: string, next: Next): Promise<{
        success: boolean;
    } | void>;
    messages(groupId: string, next: Next): Promise<any>;
    updateOnlineStatus(groupId: string, userId: string, status: boolean, next: Next): Promise<{
        success: boolean;
        message: string;
        updatedMember?: IMember;
    } | void>;
    leaveGroup(groupId: string, userId: string, next: Next): Promise<{
        success: boolean;
        message: string;
    } | void>;
}
