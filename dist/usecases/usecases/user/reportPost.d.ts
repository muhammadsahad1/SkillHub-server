import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const reportPost: (postId: string, reason: string, userId: string, userRepository: IuserRepository, next: Next) => Promise<void | {
    success: boolean;
    message: string;
}>;
