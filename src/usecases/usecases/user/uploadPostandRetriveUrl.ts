import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const uploadPostandRetriveUrl = async (
  userId: string,
  file: Express.Multer.File,
  caption: string,
  type : string,
  S3Operations: IS3Operations,
  userRepository: IuserRepository,
  next: Next
) => {
  try {
    const result = await userRepository.uploadPostRetriveImageUrl(
      userId,
      file,
      caption,
      type,
      S3Operations
    );
    console.log("result in useCaes mini fun ===>", result);

    if (!result) {
      return next(new ErrorHandler(401, "Post upload failed"));
    }

    // returning the all the details after created post
    return {
      success: true,
      message: "Post created successfully completed",
      post: result
    };

  } catch (error) {
    next(new ErrorHandler(500, "Internal Server Error"));
    return { success: false, message: "Post created successfully completed" };
  }
};
