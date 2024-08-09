import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const uploadPostandRetriveUrl = async (
  userId: string,
  file: Express.Multer.File,
  caption: string,
  type: string,
  S3Operations: IS3Operations,
  userRepository: IuserRepository
) => {
  try {
    console.log("vannoo ?sdfdsf");
    
    const result = await userRepository.uploadPostRetriveImageUrl (
      userId,
      file,
      caption,
      type,
      S3Operations
    );
    console.log("result ====> useCasill =>", result);
    
    if (!result) {
      return {
        success: false,
        message: "Post upload failed",
        post: null
      };
    }

    return {
      success: true,
      message: "Post created successfully",
      post: result
    };

  } catch (error) {
    console.error("Error in uploadPostandRetriveUrl:", error);
    return {
      success: false,
      message: "Internal Server Error",
      post: null
    };
  }
};