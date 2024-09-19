import { NotificationModel } from "../../model/notification";
import PostModel from "../../model/postModel";
import ReportModel from "../../model/reportRequest";
export declare const reportAction: (reportId: string, status: string, reportModel: typeof ReportModel, postModel: typeof PostModel, notificationModel: typeof NotificationModel) => Promise<{
    success: boolean;
    message: string;
} | void>;
