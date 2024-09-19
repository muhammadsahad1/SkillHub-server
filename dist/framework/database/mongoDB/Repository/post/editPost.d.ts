import PostModel from "../../model/postModel";
export declare const editPost: (caption: string, postId: string, postModels: typeof PostModel) => Promise<{
    postId: string | undefined;
    caption: string | undefined;
} | void>;
