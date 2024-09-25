import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const changePrivacy = async (
  userId: string,
  isPrivacy: boolean,
  userRepository : IuserRepository,
  next: Next
) => {
  try {
    const result = await userRepository.changePrivacy(userId,isPrivacy)
    if(!result){
      return next(new ErrorHandler(400,'failed to changePrivacy'))
    }

    return {
      updatedPrivacySettings : result, 
      status : true
    }
  } catch (error :any) {
    return next(new ErrorHandler(500,"Internal Server Error"));
  }
};
