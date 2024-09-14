export const postView = async (postId, postModel) => {
    try {
        const post = postModel.findById(postId);
        if (!post) {
            throw new Error("post not found");
        }
        return post;
    }
    catch (error) {
        console.error("Error fetching the others posts:", error);
        return undefined; // Handle error as needed
    }
};
