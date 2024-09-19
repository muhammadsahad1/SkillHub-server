import { Next } from "../../../framework/types/serverPackageType";
import { InotificationRepository } from "../../interface/repositoryInterface/notificationRepository";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const postLike: (userId: string, postId: string, userRepository: IuserRepository, notificationRepository: InotificationRepository, next: Next) => Promise<void | {
    message: string;
    postId: string | undefined;
    postUserId: string | undefined;
}>;
