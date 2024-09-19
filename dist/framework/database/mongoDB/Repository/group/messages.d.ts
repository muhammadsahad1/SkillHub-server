import { IS3Operations } from "../../../../service/s3Bucket";
import GroupMessageModel from "../../model/groupMessageModel";
import { GroupModel } from "../../model/groupModel";
import userModel from "../../model/userModel";
import { IGroupMessageRes } from "../../../../../commonEntities/entities/IGroupMessage";
export declare const messages: (groupId: string, groupMessageModel: typeof GroupMessageModel, groupModel: typeof GroupModel, userModels: typeof userModel, s3Operations: IS3Operations) => Promise<IGroupMessageRes[] | void>;
