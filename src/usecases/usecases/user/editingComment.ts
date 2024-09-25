import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const editingComment = async (
  postId: string,
  commentId: string,
  userId: string,
  updatedComment: string,
  userRepository: IuserRepository,
  next: Next
) => {
  try {
    const result = await userRepository.editComment(
      postId,
      commentId,
      userId,
      updatedComment
    );

    if (!result) {
      return next(new ErrorHandler(400, "Comment editing falied"));
    }
    return {
      success : true,
      result
    }
  } catch (error) {
    return next(new ErrorHandler(400, "edit post failed"));
  }
};
