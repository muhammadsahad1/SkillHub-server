import PostModel from "../../model/postModel";
import ReportModel from "../../model/reportRequest";
export declare const reportPost: (postId: string, reason: string, userId: string, postModel: typeof PostModel, reportModel: typeof ReportModel) => Promise<{
    success: boolean;
    message: string;
} | void>;
