import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const deletePost = async (postId, userRepository, next) => {
    try {
        await userRepository.deletePost(postId);
        return {
            success: true,
            message: "Post delete successfull",
            postId: postId,
        };
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
