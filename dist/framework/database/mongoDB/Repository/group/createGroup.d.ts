import { IS3Operations } from "../../../../service/s3Bucket";
import { GroupModel } from "../../model/groupModel";
import { IGroupCreationData } from "../../../../../commonEntities/entities/createGroup";
export declare const createGroup: (groupData: IGroupCreationData, creatorId: string, groupImageFile: Express.Multer.File | undefined, s3Operations: IS3Operations, groupModel: typeof GroupModel) => Promise<{
    success: boolean;
    message: string;
}>;
