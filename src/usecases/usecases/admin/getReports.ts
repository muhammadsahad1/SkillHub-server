import { IReportRequest } from "../../../commonEntities/entities/reportRequests.js";
import { IS3Operations } from "../../../framework/service/s3Bucket.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const getReports = async (
  next: Next,
  adminRepository: IadminRepository,
  s3Operations: IS3Operations
): Promise<IReportRequest[] | void> => {
  try {
      
    const result = await adminRepository.getReports(s3Operations);
    if (!result) {
      return next(new ErrorHandler(401, "get Reports failed"));
    }
    return result;
  } catch (error) {
    return next(new ErrorHandler(500, "Internal server error"));
  }
};
