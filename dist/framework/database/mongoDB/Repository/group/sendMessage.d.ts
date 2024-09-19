import GroupMessageModel from "../../model/groupMessageModel";
export declare const sendMessage: (senderId: string, groupId: string, message: string, groupMessageModel: typeof GroupMessageModel) => Promise<{
    success: boolean;
    message: string;
} | void>;
