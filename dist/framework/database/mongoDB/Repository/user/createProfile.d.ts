import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from "../../model/userModel";
import { IS3Operations } from "../../../../service/s3Bucket";
export declare const createProfile: (userProfile: Iuser, file: Express.Multer.File, S3Operations: IS3Operations, userModels: typeof userModel) => Promise<Iuser | undefined | any>;
