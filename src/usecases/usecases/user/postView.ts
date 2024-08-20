import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const postView = async (
    postId : string,
    userRepository : IuserRepository,
    s3 : IS3Operations,
    next : Next
) => {
  try {
    const result = await userRepository.postView(postId);
    if (!result) {
        return next(new ErrorHandler(401, "Post does not exist"));
    }
    const postObject = result.toObject()
    const postImageUrl = await s3.getObjectUrl({
        bucket: process.env.C3_BUCKET_NAME!,
        key: result.imageName
    });
    console.log("URL =>", postImageUrl);

    // Combine the result with the image URL
    postObject.imageUrl = postImageUrl;

    return postObject;
  
  } catch (error : any) {

  }
};
