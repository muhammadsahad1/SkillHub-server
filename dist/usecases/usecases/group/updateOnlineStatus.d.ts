import { IMember } from "../../../commonEntities/entities/group";
import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
export declare const updateOnlineStatus: (groupId: string, userId: string, status: boolean, groupRepository: IGroupRepository, next: Next) => Promise<{
    success: boolean;
    message: string;
    updatedMember?: IMember;
} | void>;
