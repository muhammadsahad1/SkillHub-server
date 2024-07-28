import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Next } from "../../../framework/types/serverPackageType";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { ErrorHandler } from '../../middlewares/errorMiddleware' ;

export const getProfileImage = async (
  userId: string,
  userRepository: IuserRepository,
  s3: IS3Operations,
  next: Next
): Promise<{
  success: boolean;
  imageUrls: { profileUrl: string; coverImageUrl: string };
  message?: string;
} | void> => {
  try {
    const imageUrls = await userRepository.fetchProfileImage(s3, userId);
    console.log("imageUrlsss =>",imageUrls)
    return {
      success: true,
      imageUrls : imageUrls,
      message: "fetch profile image successfully",
    };
  } catch (error) {
    return next(new ErrorHandler(400, "User is founded"));
  }
};
