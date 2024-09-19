import { IGroupCreationData } from "../../../commonEntities/entities/createGroup";
import { Next } from "../../../framework/types/serverPackageType";
import { IGroupRepository } from "../../interface/repositoryInterface/groupRepository";
export declare const createGroup: (groupData: IGroupCreationData, creatorId: string, groupImageFile: Express.Multer.File | undefined, groupRepository: IGroupRepository, next: Next) => Promise<{
    success: boolean;
    message: string;
} | void>;
