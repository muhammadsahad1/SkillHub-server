import PostModel from "../../model/postModel";
export declare const postLike: (userId: string, postId: string, postModels: typeof PostModel) => Promise<{
    message: string;
    postId: string | undefined;
    postUserId: string | undefined;
}>;
