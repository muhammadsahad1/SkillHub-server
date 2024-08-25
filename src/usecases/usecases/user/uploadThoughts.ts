import { Ipost } from "../../../commonEntities/entities/post";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const uploadThoughts = async (
  userId: string,
  thoughts: string,
  userRepository: IuserRepository,
  next : Next
) => {
  try {
    console.log("userId =>",userId);
    
    const result = await userRepository.uploadThoughts(userId,thoughts)
    console.log("result==>",result)
    if(!result) {
      return next(new ErrorHandler(401,"Thoughts posting failed"))
    }
    console.log("result after upload the thoughts post ==>",result)
    return result
  } catch (error) {

  }
};
