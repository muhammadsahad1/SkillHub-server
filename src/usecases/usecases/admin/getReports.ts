import { IReportRequest } from "../../../commonEntities/entities/reportRequests";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

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
