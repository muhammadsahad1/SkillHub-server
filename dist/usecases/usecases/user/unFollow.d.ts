import { Next } from "../../../framework/types/serverPackageType";
import { InotificationRepository } from "../../interface/repositoryInterface/notificationRepository";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const unFollow: (toUnfollowId: string, fromFollowerId: string, userRepository: IuserRepository, notification: InotificationRepository, next: Next) => Promise<void | {
    success: boolean;
    message: string;
}>;
