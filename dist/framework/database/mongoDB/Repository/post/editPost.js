export const editPost = async (caption, postId, postModels) => {
    try {
        const editedPost = await postModels.findByIdAndUpdate({ _id: postId }, {
            $set: {
                caption: caption,
            },
        }, { new: true });
        return {
            postId: editedPost?._id.toString(),
            caption: editedPost?.caption,
        };
    }
    catch (error) {
        console.error("Error delete post:", error);
        return undefined;
    }
};
