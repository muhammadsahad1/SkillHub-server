import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const fetchOthersPosts: (userId: string, userRepository: IuserRepository, s3: IS3Operations, next: Next) => Promise<void | {
    success: boolean;
    posts: any;
    message?: undefined;
} | {
    success: boolean;
    message: string;
    posts?: undefined;
}>;
