export const editComment = async (postId, commentId, userId, updatedComment, postModels) => {
    try {
        const post = await postModels.findById(postId);
        if (post) {
            const comment = post.comments.find((c) => c._id.toString() === commentId && c.userId.toString() === userId);
            if (comment) {
                comment.comment = updatedComment;
                comment.created_at = new Date();
                await post.save();
                return comment;
            }
        }
    }
    catch (error) {
        console.error("Error delete post:", error);
        return undefined;
    }
};
