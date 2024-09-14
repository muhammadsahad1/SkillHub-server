import { ErrorHandler } from "../../../../../usecases/middlewares/errorMiddleware";
export const addComment = async (postId, userId, comment, postModels, userModelS) => {
    try {
        const user = await userModelS.findById(userId).select("name");
        if (!user) {
            return new ErrorHandler(404, "user not found");
        }
        const newComment = {
            userId,
            comment: comment,
            userName: user.name,
            createdAt: new Date(),
        };
        const post = await postModels.findByIdAndUpdate(postId, {
            $push: { comments: newComment },
        }, { new: true });
        console.log("commenPOst =", post);
        return {
            comments: post?.comments,
            postOwnerId: post?.userId,
        };
    }
    catch (error) {
        console.error("Error delete post:", error);
        return undefined;
    }
};
