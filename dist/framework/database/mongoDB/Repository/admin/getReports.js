export const getReports = async (reportModel, postModel, s3Operations) => {
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
      reports.map(async (repo) => {
        const post = repo.postId;
        const reportedBy = repo.reportedBy;
        let postImageUrl = undefined;
        // If imageName exists, fetch the S3 URL
        if (post && post.imageName) {
          console.log("post ==> name", post);
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
