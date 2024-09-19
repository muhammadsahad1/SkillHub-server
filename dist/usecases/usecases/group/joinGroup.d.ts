import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
export declare const joinGroup: (groupId: string, joinUserId: string, groupRepository: IGroupRepository, next: Next) => Promise<{
    success: boolean;
    message: string;
} | void>;
