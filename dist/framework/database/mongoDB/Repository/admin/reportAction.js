"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportAction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reportAction = (reportId, status, reportModel, postModel, notificationModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("status ==>", status, "reportId ", reportId);
        // Find the report by reportId
        const report = yield reportModel.findById(reportId);
        if (!report) {
            return {
                success: false,
                message: "Report not found",
            };
        }
        // Find the related post by postId in the report
        const post = yield postModel.findById(report.postId);
        const userId = post === null || post === void 0 ? void 0 : post.userId;
        let notifyMessage = "";
        if (status === "Delete") {
            yield postModel.findByIdAndDelete(report.postId);
            notifyMessage = "Your post has been deleted due to a report violation.";
            yield reportModel.findByIdAndDelete(reportId);
        }
        else {
            // Otherwise, just send a warning notification
            notifyMessage =
                "Your post has received a warning due to a report violation.";
        }
        const sendId = new mongoose_1.default.Types.ObjectId();
        const receiverID = new mongoose_1.default.Types.ObjectId(userId);
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
        const notification = yield notificationModel.create(noti);
        const result = yield notification.save();
        console.log("re ==>", result);
        // Return success with the created notification
        return {
            success: true,
            message: "Report action successful",
        };
    }
    catch (error) {
        // Handle any errors
        console.error("Error in report action:", error);
        return {
            success: false,
            message: "Report action failed",
        };
    }
});
exports.reportAction = reportAction;
