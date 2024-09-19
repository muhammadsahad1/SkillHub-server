import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const editPost = async (
  caption: string,
  postId : string,
  userRepository: IuserRepository,
  next: Next
): Promise<any> => {
  try {
    const result = await userRepository.editPost(caption,postId)
    if(!result){
      return next(new ErrorHandler(400,"Post updating falied"))
    }

    return result

} catch (error) {
    return next(new ErrorHandler(500,"Internal Server Error"));
  }
};
