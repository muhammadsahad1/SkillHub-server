import { IGroup } from "../../../../../commonEntities/entities/group";
import { IS3Operations } from "../../../../service/s3Bucket";
import { GroupModel } from "../../model/groupModel";
import userModel from "../../model/userModel";
export declare const getGroup: (groupId: string, s3Operations: IS3Operations, groupModel: typeof GroupModel, userModels: typeof userModel) => Promise<IGroup | undefined>;
