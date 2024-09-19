import { GroupModel } from "../../model/groupModel";
export declare const leaveGroup: (groupId: string, userId: string, groupModel: typeof GroupModel) => Promise<{
    success: boolean;
    message: string;
} | void>;
