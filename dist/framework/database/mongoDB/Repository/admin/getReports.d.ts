import { IReportRequest } from "../../../../../commonEntities/entities/reportRequests";
import { IS3Operations } from "../../../../service/s3Bucket";
import PostModel from "../../model/postModel";
import ReportModel from "../../model/reportRequest";
export declare const getReports: (reportModel: typeof ReportModel, postModel: typeof PostModel, s3Operations: IS3Operations) => Promise<IReportRequest[] | void | any>;
