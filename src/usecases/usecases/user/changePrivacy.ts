import { Next } from "../../../framework/types/serverPackageType";
import { IprivacyRepository } from "../../interface/repositoryInterface/privacyRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const changePrivacy = async (
  userId: string,
  isPrivacy: boolean,
  privacyRepository : IprivacyRepository,
  next: Next
) => {
  try {
    const result = await privacyRepository.changePrivacy(userId,isPrivacy)
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
