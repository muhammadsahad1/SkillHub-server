import PostModel from "../../model/postModel";
export declare const postView: (postId: string, postModel: typeof PostModel) => Promise<(import("mongoose").Document<unknown, {}, import("../../../../../commonEntities/entities/post").Ipost> & import("../../../../../commonEntities/entities/post").Ipost & {
    _id: import("mongoose").Types.ObjectId;
}) | null | undefined>;
