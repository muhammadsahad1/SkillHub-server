import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Next } from "../../../framework/types/serverPackageType";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { FetchProfileImageResponse } from "../../../commonEntities/entities/user";
export declare const getProfileImage: (userId: string, userRepository: IuserRepository, s3: IS3Operations, next: Next) => Promise<{
    success: boolean;
    imageUrls: FetchProfileImageResponse | undefined;
    message: string;
} | void>;
