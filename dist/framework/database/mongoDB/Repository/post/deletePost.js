export const deletePost = async (postId, postModels) => {
    try {
        await postModels.deleteOne({ _id: postId });
    }
    catch (error) {
        console.error("Error delete post:", error);
        return undefined; // Handle error as needed
    }
};
