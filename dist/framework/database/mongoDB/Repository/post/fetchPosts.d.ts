import { IS3Operations } from "../../../../service/s3Bucket";
import PostModel from "../../model/postModel";
import userModel from "../../model/userModel";
export declare const fetchPosts: (userSkill: string, pageParam: number, s3: IS3Operations, userModels: typeof userModel, postModels: typeof PostModel) => Promise<{
    success: boolean;
    message: string;
    posts: {
        userImageUrl: any;
        postImageUrl: any;
        userName: string;
        isProfessional: boolean;
        comments: any[];
        userId: import("mongoose").Types.ObjectId;
        imageName: string;
        caption: string;
        type: "image" | "video" | "thoughts";
        likes: import("mongoose").Types.ObjectId;
        saves: import("mongoose").Types.ObjectId[];
        reports: import("mongoose").Types.ObjectId[];
        createdAt?: Date;
        updatedAt?: Date;
        _id: import("mongoose").Types.ObjectId;
    }[];
    hasMore: boolean;
} | {
    success: boolean;
    message: string;
    posts: never[];
    hasMore?: undefined;
}>;
