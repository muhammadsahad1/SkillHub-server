import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const addComment = async (
  postId: string,
  userId: string,
  comment: string,
  userRepository: IuserRepository,
  s3 : IS3Operations,
  next: Next
) => {
  try {
    const retriveComment = await userRepository.addComment(
      postId,
      userId,
      comment,
      s3
    );
    
    
    if (!retriveComment) {
      return next(new ErrorHandler(400, "Post is not found"));
    }

    return {
      success: true,
      message: "Comment added successfully",
      comment : retriveComment 
    };

  } catch (error) {}
};
