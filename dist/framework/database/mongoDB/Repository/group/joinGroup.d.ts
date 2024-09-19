import { GroupModel } from "../../model/groupModel";
export declare const joinGroup: (groupId: string, joinUserId: string, groupModel: typeof GroupModel) => Promise<{
    success: boolean;
    message: string;
}>;
