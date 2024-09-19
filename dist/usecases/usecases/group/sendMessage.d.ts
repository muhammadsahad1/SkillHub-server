import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
export declare const sendMessage: (senderId: string, groupId: string, message: string, groupRepository: IGroupRepository, next: Next) => Promise<{
    success: boolean;
    message: string;
} | void>;
