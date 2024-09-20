import { Iuser } from "../../../commonEntities/entities/user.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { ErrorHandler } from '../../middlewares/errorMiddleware.js' ;

export const getUser = async(
  userId : string,
  userRepository : IuserRepository,
  next : Next
) => {
  try {
    const user = await userRepository.getUser(userId)
    if(!user){
      return next(new ErrorHandler(400,"User is not found"))
    }
    return user
  } catch (error) {
    
  }
}