import PostModel from "../../model/postModel";

export const editPost = async (
  caption: string,
  postId: string,
  postModels: typeof PostModel
): Promise<{ postId: string | undefined; caption: string | undefined } | void> => {
  try {
    const editedPost = await postModels.findByIdAndUpdate(
      { _id: postId },
      {
        $set: {
          caption: caption,
        },
      },
      { new: true }
    );
    return {
      postId: editedPost?._id.toString(),
      caption: editedPost?.caption,
    };
  } catch (error) {
    console.error("Error delete post:", error);
  
  }
};
