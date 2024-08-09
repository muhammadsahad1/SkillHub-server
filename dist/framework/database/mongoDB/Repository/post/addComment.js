export const addComment = async (postId, userId, comment, postModels) => {
    try {
        const newComment = {
            userId,
            comment: comment,
            createdAt: new Date(), // Record the creation time of the comment
        };
        const post = await postModels.findByIdAndUpdate(postId, {
            $push: { comments: newComment },
        }, { new: true });
        return post?.comments;
    }
    catch (error) {
        console.error("Error delete post:", error);
        return undefined;
    }
};
