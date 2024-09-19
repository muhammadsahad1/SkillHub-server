import { Server } from "socket.io";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const addComment: (postId: string, userId: string, comment: string, userRepository: IuserRepository, s3: IS3Operations, io: Server, next: Next) => Promise<void | {
    success: boolean;
    message: string;
    comment: any;
}>;
