import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const editingComment: (postId: string, commentId: string, userId: string, updatedComment: string, userRepository: IuserRepository, next: Next) => Promise<void | {
    success: boolean;
    result: import("../../../commonEntities/entities/post").IComment;
}>;
