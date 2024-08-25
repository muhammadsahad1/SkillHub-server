import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const changeVerifyStatus = async (
  requestId: string,
  status: "Pending" | "Approved" | "Rejected",
  adminRepostory: IadminRepository,
  next : Next
) => {
  try {
    const result = await adminRepostory.changeVerifyStatus(requestId, status);
    if(!result){
      return next(new ErrorHandler(401,"updating the status failed"))
    }
    return result
  } catch (error) {
    console.log("error =>",error)
  }
};
