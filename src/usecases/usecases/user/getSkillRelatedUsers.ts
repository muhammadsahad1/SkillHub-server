import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Next } from "../../../framework/types/serverPackageType";
import { ErrorHandler } from "../../middlewares/errorMiddleware";
import { IS3Operations } from "../../../framework/service/s3Bucket";

export const getSkillRelatedUsers = async (
  userId : string,
  skill : string ,
  userRepository : IuserRepository,
  s3 : IS3Operations,
  next : Next
) => {
  const result = await userRepository.getSkillRelatedUserss(userId,skill,s3)
  
  if(!result) {
    return next(new ErrorHandler(401,"fetching skill related users failed"))
  }

  return {
    success : true,
    userDetails : result
  }
}