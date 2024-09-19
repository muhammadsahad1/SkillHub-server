import { IReportRequest } from "../../../commonEntities/entities/reportRequests";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
export declare const getReports: (next: Next, adminRepository: IadminRepository, s3Operations: IS3Operations) => Promise<IReportRequest[] | void>;
