import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const editPost = async (caption, postId, userRepository, next) => {
    try {
        const result = await userRepository.editPost(caption, postId);
        if (!result) {
            return next(new ErrorHandler(400, "Post updating falied"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
