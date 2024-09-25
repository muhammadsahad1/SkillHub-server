import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Next } from "../../../framework/types/serverPackageType.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
import { IS3Operations } from "../../../framework/service/s3Bucket.js";
import { IUserWithImages } from "../../../commonEntities/entities/user.js";

export const getSkillRelatedUsers = async (
  userId: string,
  skill: string,
  userRepository: IuserRepository,
  s3: IS3Operations,
  next: Next
): Promise<{
  success: boolean;
  userDetails: IUserWithImages[] | undefined;
} | void> => {
  console.log("casil ketiiiiiiii");
  const result = await userRepository.getSkillRelatedUsers(userId, skill, s3);

  console.log("result after repo ==>", result);

  if (!result) {
    return next(new ErrorHandler(401, "fetching skill related users failed"));
  }

  return {
    success: true,
    userDetails: result,
  };
};
