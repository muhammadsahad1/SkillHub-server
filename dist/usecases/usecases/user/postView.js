import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const postView = async (postId, userRepository, s3, next) => {
    try {
        const result = await userRepository.postView(postId);
        if (!result) {
            return next(new ErrorHandler(401, "Post does not exist"));
        }
        const postObject = result.toObject();
        const postImageUrl = result.imageName
            ? await s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: result.imageName,
            })
            : null;
        console.log("URL =>", postImageUrl);
        // Combine the result with the image URL
        postObject.imageUrl = postImageUrl;
        return postObject;
    }
    catch (error) { }
};
