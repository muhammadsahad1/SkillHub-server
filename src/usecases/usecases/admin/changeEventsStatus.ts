import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const changeEventsStatus = async (
  requestId: string,
  action : "Pending" | "Approved" | "Rejected",
  adminRepository: IadminRepository,
  next : Next
): Promise<{ success: boolean; } | void> => {
  try {
    const result = await adminRepository.changeEventStatus(requestId,action)
    if(!result) {
      return next(new ErrorHandler(401,"Change event status failed"))
    }
    return result 
  } catch (error) {}
};
