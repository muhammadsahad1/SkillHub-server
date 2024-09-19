import { IGroup } from "../../../../../commonEntities/entities/group";
import { IS3Operations } from "../../../../service/s3Bucket";
import { GroupModel } from "../../model/groupModel";
export declare const getGroups: (groupModel: typeof GroupModel, s3Operations: IS3Operations) => Promise<IGroup[] | void>;
