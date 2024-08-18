import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Next } from "../../../framework/types/serverPackageType";
import { ErrorHandler } from "../../middlewares/errorMiddleware";
import { Server } from "socket.io";

export const followUp = async (
  toFollowingId: string,
  fromFollowerId: string,
  userRepository: IuserRepository,
  next: Next
) => {
  try {
    await userRepository.followUp(toFollowingId, fromFollowerId);
  } catch (error) {
    return next(new ErrorHandler(400, "follow update failed"));
  } 
};
