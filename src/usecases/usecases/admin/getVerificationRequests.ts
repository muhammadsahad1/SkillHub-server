
import { Next } from "../../../framework/types/serverPackageType.js";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const getVerificationRequests = async (
  adminRepostory: IadminRepository,
  next: Next
) => {
  try {
    const result = await adminRepostory.getVerificationRequests()
    if(!result){
      return next(new ErrorHandler(401,"requests not found"))
    }
    return result 
  } catch (error) {
    
  }
};
