import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const editingComment = async (postId, commentId, userId, updatedComment, userRepository, next) => {
    try {
        const result = await userRepository.editComment(postId, commentId, userId, updatedComment);
        if (!result) {
            return next(new ErrorHandler(400, "Comment editing falied"));
        }
        return {
            success: true,
            result
        };
    }
    catch (error) {
        return next(new ErrorHandler(400, "edit post failed"));
    }
};
