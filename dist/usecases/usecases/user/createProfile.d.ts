import { Iuser } from "../../../commonEntities/entities/user";
import { Next } from "../../../framework/types/serverPackageType";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const createProfile: (user: Iuser, file: Express.Multer.File, userRepository: IuserRepository, S3Operations: IS3Operations, next: Next) => Promise<{
    success: boolean;
    user?: Iuser;
    message?: string;
} | void>;
