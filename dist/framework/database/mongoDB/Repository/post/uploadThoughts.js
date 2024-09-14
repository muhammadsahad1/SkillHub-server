export const uploadThoughts = async (userId, thoughts, postModal) => {
    const newPostDetails = {
        userId: userId,
        type: "thoughts",
        caption: thoughts
    };
    const newPost = await postModal.create(newPostDetails);
    console.log("newPOst -==>", newPost);
    return {
        success: true,
        thoughtPost: newPost
    };
};
