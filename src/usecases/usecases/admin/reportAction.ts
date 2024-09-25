import { Next } from "../../../framework/types/serverPackageType.js";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const reportAction = async (
  reportId: string,
  status: string,
  adminRepository: IadminRepository,
  next: Next
): Promise<{ success: boolean; message: string } | void> => {
  try {
    const result = await adminRepository.reportAction(reportId, status);
    if (!result) {
      return next(new ErrorHandler(401, "report action failed"));
    }

    return result;
  } catch (error) {
    console.log("error =>", error);
  }
};
