export const deleteComment = async (postId, commentId, postModel) => {
    try {
        const result = await postModel.findByIdAndUpdate(postId, {
            $pull: {
                comments: { _id: commentId },
            },
        }, { new: true });
        console.log("after deletion ==>", result);
    }
    catch (error) {
        console.error("Error delete post:", error);
        return undefined; // Handle error as needed
    }
};
