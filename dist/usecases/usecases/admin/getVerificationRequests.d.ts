import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
export declare const getVerificationRequests: (adminRepostory: IadminRepository, next: Next) => Promise<void | import("../../../commonEntities/entities/verificationRequest").IVerificationRequest[]>;
