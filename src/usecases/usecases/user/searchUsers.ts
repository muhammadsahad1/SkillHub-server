import { Iuser } from "../../../commonEntities/entities/user.js";
import { IElasticsearchService } from "../../../framework/service/elasticsearchService.js";
import { IS3Operations } from "../../../framework/service/s3Bucket.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const searchUsers = async (
  query: string,
  elasticsearch: IElasticsearchService,
  s3: IS3Operations,
  next: Next
): Promise<{ success: boolean; message?: string; result: any[] } | void> => {
  try {
    const result = await elasticsearch.searchUsers(query, s3);

    if (!result || result.length === 0) {
      return next(new ErrorHandler(401, "data not found"));
    }

    return {
      success: true,
      result: result,
    };
  } catch (error) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};
