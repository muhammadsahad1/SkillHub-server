import { DashboardData } from "../../../commonEntities/entities/dashBoardData";
import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
export declare const dashBoardData: (adminRepository: IadminRepository, next: Next) => Promise<DashboardData | void>;
