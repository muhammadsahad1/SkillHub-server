import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const deleteComment: (postId: string, commentId: string, userRepository: IuserRepository, next: Next) => Promise<void | {
    success: boolean;
    message: string;
}>;
