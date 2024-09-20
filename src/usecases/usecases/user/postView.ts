import { IS3Operations } from "../../../framework/service/s3Bucket.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const postView = async (
  postId: string,
  userRepository: IuserRepository,
  s3: IS3Operations,
  next: Next
) => {
  try {
    const result = await userRepository.postView(postId);
    if (!result) {
      return next(new ErrorHandler(401, "Post does not exist"));
    }
    const postObject = result.toObject();
    const postImageUrl = result.imageName
      ? await s3.getObjectUrl({
          bucket: process.env.C3_BUCKET_NAME!,
          key: result.imageName,
        })
      : null;
    console.log("URL =>", postImageUrl);

    // Combine the result with the image URL
    postObject.imageUrl = postImageUrl;

    return postObject;
  } catch (error: any) {}
};
