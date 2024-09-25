import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const deleteComment = async (
  postId : string,
  commentId : string,
  userRepository : IuserRepository,
  next :Next
) => {
  try {
    await userRepository.deleteComment(postId,commentId)

    return { success: true, message: "Comment deleted successfully" };

} catch (error) {
    return next(new ErrorHandler(500,"Internal Server Error"));
  }
}