import { IS3Operations } from "../../../../service/s3Bucket";
import PostModel from "../../model/postModel";
import userModel from "../../model/userModel";
export declare const uploadPost: (userId: string, file: Express.Multer.File, caption: string, type: string, s3: IS3Operations, userModels: typeof userModel, postModels: typeof PostModel) => Promise<{
    signedUrl: string;
    skill: string | undefined;
    userId: string | undefined;
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
} | {
    success: boolean;
    message: string;
    error: any;
}>;
