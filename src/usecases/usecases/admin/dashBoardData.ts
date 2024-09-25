import { DashboardData } from "../../../commonEntities/entities/dashBoardData.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const dashBoardData = async (
  adminRepository: IadminRepository,
  next: Next
): Promise<DashboardData | void> => {
  try {
    const result = await adminRepository.dashBoardData();
    console.log("res ==>", result);
    if (!result) {
      return next(new ErrorHandler(401, "data not fount"));
    }
    return result;
  } catch (error: any) {
    throw new Error("error in dashboardata");
  }
};
