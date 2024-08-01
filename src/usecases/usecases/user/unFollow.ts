import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const unFollow = async (
  toUnfollowId: string,
  fromFollowerId: string,
  userRepository: IuserRepository,
  next: Next
) => {
  try {
    await userRepository.unFollow(toUnfollowId, fromFollowerId);

    return {success : true , message : "unFollowed successfull"}
    
  } catch (error) {
    return next(new ErrorHandler(400, "follow update failed"));
  }
};
