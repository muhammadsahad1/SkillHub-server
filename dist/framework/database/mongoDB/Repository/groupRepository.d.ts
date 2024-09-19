import { IGroupCreationData } from "../../../../commonEntities/entities/createGroup";
import { IGroup } from "../../../../commonEntities/entities/group";
import { IGroupRepository } from "../../../../usecases/interface/repositoryInterface/groupRepository";
import { IS3Operations } from "../../../service/s3Bucket";
import GroupMessageModel from "../model/groupMessageModel";
import { GroupModel } from "../model/groupModel";
import userModel from "../model/userModel";
export declare class GroupRepository implements IGroupRepository {
    private groupModel;
    private s3Operations;
    private userModels;
    private groupMessageModel;
    constructor(groupModel: typeof GroupModel, s3Operations: IS3Operations, userModels: typeof userModel, groupMessageModel: typeof GroupMessageModel);
    createGroup(groupData: IGroupCreationData, creatorId: string, groupImageFile: Express.Multer.File | undefined): Promise<{
        success: boolean;
        message: string;
    } | void>;
    getGroups(): Promise<IGroup[] | void>;
    joinGroup(groupId: string, joinUserId: string): Promise<{
        success: boolean;
        message: string;
    } | void>;
    getGroup(groupId: string): Promise<IGroup | void>;
    sendMessage(senderId: string, groupId: string, message: string): Promise<{
        success: boolean;
        message: string;
    } | void>;
    messages(groupId: string): Promise<any>;
    updateOnlineStatus(groupId: string, userId: string, status: boolean): Promise<{
        success: boolean;
        message: string;
    } | void>;
    leaveGroup(groupId: string, userId: string): Promise<{
        success: boolean;
        message: string;
    } | void>;
}
