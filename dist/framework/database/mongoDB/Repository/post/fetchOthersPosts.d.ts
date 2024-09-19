import mongoose from "mongoose";
import { IS3Operations } from "../../../../service/s3Bucket";
import PostModel from "../../model/postModel";
import userModel from "../../model/userModel";
export declare const fetchOthersPosts: (userId: string, s3: IS3Operations, postModels: typeof PostModel, userModels: typeof userModel) => Promise<({
    postUrl: any;
    profileImageUrl: any;
    userName: string | undefined;
    userId: mongoose.Types.ObjectId;
    imageName: string;
    caption: string;
    type: "image" | "video" | "thoughts";
    likes: mongoose.Types.ObjectId;
    comments: {
        _id: any;
        userId: mongoose.Types.ObjectId[];
        userName: string;
        comment: string;
        created_at: Date;
    }[];
    saves: mongoose.Types.ObjectId[];
    reports: mongoose.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
    _id: mongoose.Types.ObjectId;
} | {
    profileImageUrl: any;
    userName: string | undefined;
    userId: mongoose.Types.ObjectId;
    imageName: string;
    caption: string;
    type: "image" | "video" | "thoughts";
    likes: mongoose.Types.ObjectId;
    comments: {
        _id: any;
        userId: mongoose.Types.ObjectId[];
        userName: string;
        comment: string;
        created_at: Date;
    }[];
    saves: mongoose.Types.ObjectId[];
    reports: mongoose.Types.ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
    _id: mongoose.Types.ObjectId;
})[] | undefined>;
