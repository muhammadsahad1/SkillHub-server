import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const addComment = async (postId, userId, comment, userRepository, s3, io, next) => {
    try {
        const retriveComment = await userRepository.addComment(postId, userId, comment, s3, next);
        console.log("retrivecmt =>", retriveComment);
        if (!retriveComment) {
            return next(new ErrorHandler(400, "Post is not found"));
        }
        // emiting the comment notification event with socket 
        io.to(`user-${retriveComment.userId}`).emit("notification", {
            retriveComment,
        });
        return {
            success: true,
            message: "Comment added successfully",
            comment: retriveComment,
        };
    }
    catch (error) { }
};
