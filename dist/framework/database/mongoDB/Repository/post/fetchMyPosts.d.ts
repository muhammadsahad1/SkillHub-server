import { IS3Operations } from "../../../../service/s3Bucket";
import PostModel from "../../model/postModel";
export declare const fetchMyPosts: (userId: string, s3: IS3Operations, postModels: typeof PostModel) => Promise<{
    imageUrl: any;
    userId: import("mongoose").Types.ObjectId;
    imageName: string;
    caption: string;
    type: "image" | "video" | "thoughts";
    likes: import("mongoose").Types.ObjectId;
    comments: {
        _id: any;
        userId: import("mongoose").Types.ObjectId[];
        userName: string;
        comment: string;
        created_at: Date;
    }[];
    saves: import("mongoose").Types.ObjectId[];
    reports: import("mongoose").Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
    _id: import("mongoose").Types.ObjectId;
}[]>;
