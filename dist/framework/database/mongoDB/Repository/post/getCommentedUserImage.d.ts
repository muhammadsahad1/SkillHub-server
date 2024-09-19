import { IS3Operations } from "../../../../service/s3Bucket";
import { Next } from "../../../../types/serverPackageType";
import userModel from "../../model/userModel";
export declare const getCommentedUserImage: (postOwnerId: string, userId: string, s3: IS3Operations, userModels: typeof userModel, next: Next) => Promise<void | {
    postOwnerId: string;
    userWithImage: any;
    userId: string;
    userName: string;
}>;
