import { DashboardData } from "../../../commonEntities/entities/dashBoardData";
import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

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
