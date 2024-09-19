import userModel from "../../model/userModel";
import { IS3Operations } from "../../../../service/s3Bucket";
import { Iuser } from "../../../../../commonEntities/entities/user";
export declare const getMyFollowing: (userId: string, userModels: typeof userModel, s3: IS3Operations) => Promise<Iuser[] | undefined>;
