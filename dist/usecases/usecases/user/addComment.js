import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const addComment = async (postId, userId, comment, userRepository, s3, next) => {
    try {
        const retriveComment = await userRepository.addComment(postId, userId, comment, s3);
        if (!retriveComment) {
            return next(new ErrorHandler(400, "Post is not found"));
        }
        return {
            success: true,
            message: "Comment added successfully",
            comment: retriveComment
        };
    }
    catch (error) { }
};
