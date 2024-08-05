import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const deletePost = async (
  postId: string,
  userRepository: IuserRepository,
  next: Next
) => {
  try {
    await userRepository.deletePost(postId);

    return {
      success: true,
      message: "Post delete successfull",
    };
  } catch (error) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};
