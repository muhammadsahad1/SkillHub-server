import PostModel from "../../model/postModel";
import ReportModel from "../../model/reportRequest";

export const reportPost = async (
  postId: string,
  reason: string,
  userId: string,
  postModel: typeof PostModel,
  reportModel: typeof ReportModel
) : Promise<{success : boolean , message : string} | void> => {
  try {
    const result = await reportModel.create({
      postId: postId,
      reportedBy: userId,
      reason: reason,
    });
    console.log("new report =>", result);
    await result.save();

    return {
      success: true,
      message: "successfully created the report request",
    };
  } catch (error) {
    return {
      success: false,
      message: "successfully failed to create the report request",
    };
  }
};
