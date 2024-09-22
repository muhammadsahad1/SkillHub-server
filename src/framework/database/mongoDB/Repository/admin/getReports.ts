import { IReportRequest } from "../../../../../commonEntities/entities/reportRequests.js";
import { IS3Operations } from "../../../../service/s3Bucket.js";
import PostModel from "../../model/postModel.js";
import ReportModel, { IReport } from "../../model/reportRequest.js";

export const getReports = async (
  reportModel: typeof ReportModel,
  postModel: typeof PostModel,
  s3Operations: IS3Operations
): Promise<IReportRequest[] | void | any> => {
  try {
    // Fetch reports and populate postId and reportedBy
    const reports = await reportModel
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

    const reportPostDetails = await Promise.all(
      reports.map(async (repo: IReport) => {
        console.log("repoo ==>", repo);
        const post = repo.postId as any;
        const reportedBy = repo.reportedBy as any;
        let postImageUrl: string | undefined = undefined;

        // If imageName exists, fetch the S3 URL
        if (post && post.imageName) {

          postImageUrl = await s3Operations.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME, // Make sure this environment variable is set
            key: post.imageName,
          });
        } else {
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
      })
    );
    console.log("reportPostDetails =>", reportPostDetails);
    return reportPostDetails;
  } catch (error) {
    console.error("Error fetching reports:", error);
    return undefined;
  }
};
