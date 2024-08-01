import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";


export const getUserDetails = async (
  userId :string,
  userRepository : IuserRepository,
  next : Next
) => {
  try {
    const user = await userRepository.getUserDetails(userId)
  
    if(!user){
      return next(new ErrorHandler(400,"User is not found"))
    }
    return user
  } catch (error) {
    return next(new ErrorHandler(400, "User is founded"));
  }
}