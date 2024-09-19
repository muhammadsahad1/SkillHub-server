import { Server } from "socket.io";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const changeVerifyStatus = async (
  requestId: string,
  status: "Pending" | "Approved" | "Rejected",
  adminRepostory: IadminRepository,
  io : Server,
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
