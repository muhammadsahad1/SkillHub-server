import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
export declare const changeEventsStatus: (requestId: string, action: "Pending" | "Approved" | "Rejected", adminRepository: IadminRepository, next: Next) => Promise<{
    success: boolean;
} | void>;
