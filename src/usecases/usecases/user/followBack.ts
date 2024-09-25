import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const followBack = async (
  fromFollowingId: string,
  toFollowId: string,
  userRepository: IuserRepository,
  next: Next
) : Promise <{ success: boolean, message:string }>=> {
  try {
    await userRepository.followBack(fromFollowingId, toFollowId);

    return { success: true, message: "follow back successfully" };
  } catch (error) {
     next(new ErrorHandler(500,"Internal Server Error"));
     return { success: false, message: "Failed to follow back" }
  }
};
