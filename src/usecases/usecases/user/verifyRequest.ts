import { VerifyRequest } from "../../../commonEntities/entities/verificationRequest.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const verifyRequest = async (
  userId: string,
  requestData: VerifyRequest,
  userRepository : IuserRepository,
  next : Next
) => {
  try {
    const result = await userRepository.verifyRequest(userId,requestData)
    if(!result){
      return next(new ErrorHandler(401,"failed to requesting"))
    }
    
    return result
  } catch (error) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};
