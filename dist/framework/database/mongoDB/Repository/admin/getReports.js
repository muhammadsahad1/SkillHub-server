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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReports = void 0;
const getReports = (reportModel, postModel, s3Operations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch reports and populate postId and reportedBy
        const reports = yield reportModel
            .find({})
            .populate({
            path: "postId",
            select: "caption imageName type",
        })
            .populate({
            path: "reportedBy",
            select: "name email _id",
        })
            .sort({ createdAt: -1 });
        const reportPostDetails = yield Promise.all(reports.map((repo) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("repoo ==>", repo);
            const post = repo.postId;
            const reportedBy = repo.reportedBy;
            let postImageUrl = undefined;
            // If imageName exists, fetch the S3 URL
            if (post && post.imageName) {
                postImageUrl = yield s3Operations.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME, // Make sure this environment variable is set
                    key: post.imageName,
                });
            }
            else {
                console.log("post else =>", post);
            }
            // Return the report details with the fetched image URL
            return {
                _id: repo._id.toString(),
                postId: post._id.toString(),
                userId: reportedBy._id.toString(),
                postCaption: post.caption,
                reportReason: repo.reason,
                postType: post.type,
                reportStatus: repo.status,
                created_at: repo.createdAt,
                postImageUrl: postImageUrl, // Include the S3 image URL
            };
        })));
        console.log("reportPostDetails =>", reportPostDetails);
        return reportPostDetails;
    }
    catch (error) {
        console.error("Error fetching reports:", error);
        return undefined;
    }
});
exports.getReports = getReports;
