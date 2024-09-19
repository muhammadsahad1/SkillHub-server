import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
export declare const reportAction: (reportId: string, status: string, adminRepository: IadminRepository, next: Next) => Promise<{
    success: boolean;
    message: string;
} | void>;
