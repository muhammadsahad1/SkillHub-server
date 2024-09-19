import userModel from "../../model/userModel";
import { IS3Operations } from "../../../../service/s3Bucket";
import { FetchProfileImageResponse } from "../../../../../commonEntities/entities/user";
export declare const fetchProfileImage: (userModels: typeof userModel, s3: IS3Operations, userId: string) => Promise<FetchProfileImageResponse | undefined>;
