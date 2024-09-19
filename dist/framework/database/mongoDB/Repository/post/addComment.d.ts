import PostModel from "../../model/postModel";
import userModel from "../../model/userModel";
export declare const addComment: (postId: string, userId: string, comment: string, postModels: typeof PostModel, userModelS: typeof userModel) => Promise<any>;
