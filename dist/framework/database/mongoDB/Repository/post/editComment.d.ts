import PostModel from "../../model/postModel";
import { IComment } from "../../../../../commonEntities/entities/post";
export declare const editComment: (postId: string, commentId: string, userId: string, updatedComment: string, postModels: typeof PostModel) => Promise<IComment | void>;
