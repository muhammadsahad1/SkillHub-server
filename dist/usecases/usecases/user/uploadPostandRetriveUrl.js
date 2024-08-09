import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const uploadPostandRetriveUrl = async (userId, file, caption, type, S3Operations, userRepository, next) => {
    try {
        const result = await userRepository.uploadPostRetriveImageUrl(userId, file, caption, type, S3Operations);
        console.log("result ====> useCasill =>", result);
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
    }
    catch (error) {
        next(new ErrorHandler(500, "Internal Server Error"));
        return { success: false, message: "Post created successfully completed" };
    }
};
