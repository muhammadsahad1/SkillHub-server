import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
export declare const leaveGroup: (groupId: string, userId: string, groupRepository: IGroupRepository, next: Next) => Promise<void | {
    success: boolean;
    message: string;
}>;
