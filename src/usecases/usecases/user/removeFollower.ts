import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const removeFollower = async (
  fromRemoverId: string,
  toRemoveId: string,
  userRepository: IuserRepository,
  next: Next
): Promise<{ success: boolean, message: string }> => {  
  try {

    await userRepository.removeFollower(fromRemoverId, toRemoveId);
    return { success: true, message: "Removed follower successfully" };
  } catch (error) {
    next(new ErrorHandler(400, "User is not found"));
    return { success: false, message: "Failed to remove follower" }; 
  }
};

