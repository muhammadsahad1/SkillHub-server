import userModel from "../../model/userModel";
import { IS3Operations } from "../../../../service/s3Bucket";
import { Iuser } from "../../../../../commonEntities/entities/user";
export declare const uploadCoverImage: (userModels: typeof userModel, userId: string, file: Express.Multer.File, S3Operations: IS3Operations) => Promise<Iuser | undefined | any>;
