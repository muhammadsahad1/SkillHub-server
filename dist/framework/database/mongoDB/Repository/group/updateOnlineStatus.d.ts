import { GroupModel } from "../../model/groupModel";
import { IMember } from "../../../../../commonEntities/entities/group";
export declare const updateOnlineStatus: (groupId: string, userId: string, status: boolean, groupModel: typeof GroupModel) => Promise<{
    success: boolean;
    message: string;
    updatedMember?: IMember[];
}>;
