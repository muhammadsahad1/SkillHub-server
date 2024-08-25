
import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

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
