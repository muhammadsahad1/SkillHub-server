import { IElasticsearchService } from "../../../framework/service/elasticsearchService";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const searchUsers = async (
  query: string,
  elasticsearch: IElasticsearchService,
  s3: IS3Operations,
  next: Next
) => {
  try {
    
    const result = await elasticsearch.searchUsers(query, s3);

    if (!result || result.length === 0) {
      return { success: false, message: "No users found." };
    }

    return {
      success: true,
      result: result,
    };
  } catch (error) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};
