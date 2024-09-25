import mongoose, { mongo } from "mongoose";
import { NotificationModel } from "../../model/notification.js";
import PostModel from "../../model/postModel.js";
import ReportModel from "../../model/reportRequest.js";

export const reportAction = async (
  reportId: string,
  status: string,
  reportModel: typeof ReportModel,
  postModel: typeof PostModel,
  notificationModel: typeof NotificationModel
): Promise<{ success: boolean; message: string } | void> => {
  try {
    console.log("status ==>", status, "reportId ", reportId);

    // Find the report by reportId
    const report = await reportModel.findById(reportId);
    if (!report) {
      return {
        success: false,
        message: "Report not found",
      };
    }

    // Find the related post by postId in the report
    const post = await postModel.findById(report.postId);
    const userId = post?.userId;

    let notifyMessage = "";
    if (status === "Delete") {
      await postModel.findByIdAndDelete(report.postId);
      notifyMessage = "Your post has been deleted due to a report violation.";
      await reportModel.findByIdAndDelete(reportId);
    } else {
      // Otherwise, just send a warning notification
      notifyMessage =
        "Your post has received a warning due to a report violation.";
    }
    const sendId = new mongoose.Types.ObjectId();
    const receiverID = new mongoose.Types.ObjectId(userId);

    // Create the notification object
    const noti = {
      senderId: sendId,
      receiverId: receiverID, // The user who created the post
      message: notifyMessage,
      type: "ReportAction", // The type of notification
      link: "", // You can add a link to the related report/post if needed
      read: false,
    };

    // Create and save the notification in the database
    const notification = await notificationModel.create(noti);
    const result = await notification.save();
    console.log("re ==>", result);

    // Return success with the created notification
    return {
      success: true,
      message: "Report action successful",
    };
  } catch (error) {
    // Handle any errors
    console.error("Error in report action:", error);
    return {
      success: false,
      message: "Report action failed",
    };
  }
};
