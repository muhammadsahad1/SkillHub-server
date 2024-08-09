import { ErrorHandler } from "../../../../../usecases/middlewares/errorMiddleware";
import { IS3Operations } from "../../../../service/s3Bucket";
import { Next } from "../../../../types/serverPackageType";
import userModel from "../../model/userModel";

export const getCommentedUserImage = async (
  userId: string,
  s3: IS3Operations,
  userModels: typeof userModel,
  next: Next
) => {
  try {
    const user = await userModels.findById(userId);
    // checking the user
    if (!user) {
      return next(new ErrorHandler(404, "User not found"));
    }
    // checking the profileImage
    if (!user.profileImage) {
      return next(new ErrorHandler(404, "Profile image not found"));
    }
    // fetching the resigned Url of users for profileImage
    const userWithImage = await s3.getObjectUrl({
      bucket: process.env.C3_BUCKET_NAME,
      key: user.profileImage,
    });

    if (!userWithImage) {
      return next(new ErrorHandler(500, "Error retrieving image from S3")); // Handle case where image retrieval fails
    }

    return { userWithImage, userName: user.name };
    
  } catch (error) {
    console.error("Error delete post:", error);
    return undefined; // Handle error as needed
  }
};
