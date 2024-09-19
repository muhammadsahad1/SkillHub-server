import { IElasticsearchService } from "../../../framework/service/elasticsearchService";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
export declare const searchUsers: (query: string, elasticsearch: IElasticsearchService, s3: IS3Operations, next: Next) => Promise<{
    success: boolean;
    message?: string;
    result: any[];
} | void>;
