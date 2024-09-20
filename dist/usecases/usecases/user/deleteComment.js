import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const deleteComment = async (postId, commentId, userRepository, next) => {
    try {
        await userRepository.deleteComment(postId, commentId);
        return { success: true, message: "Comment deleted successfully" };
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
