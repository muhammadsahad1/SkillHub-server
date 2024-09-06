import { NotificationModel } from "../../model/notification";
import PostModel from "../../model/postModel";
import ReportModel from "../../model/reportRequest";

export const reportAction = async (
  reportId: string,
  status: string,
  reportModel: typeof ReportModel,
  postModel : typeof PostModel,
  notificationModel : typeof NotificationModel,

): Promise<{ success: boolean; message: string; } | void> => {
  try {

    const report = await reportModel.findById(reportId)

    if(!report){
      return {
        success : false , message : "Report not found"
      }
    }

  } catch (error) {}
};
