import mongoose from "mongoose";
import PostModel from "../../model/postModel";

export const editComment = async (
  postId: string,
  commentId: string,
  userId: string,
  updatedComment: string,
  postModels: typeof PostModel
) => {
  try {

    const post = await postModels.findById(postId)

    if(post){
      const comment = post.comments.find((c) => c._id.toString() === commentId && c.userId.toString() === userId)

      if(comment){
        comment.comment = updatedComment
        comment.created_at = new Date()
        await post.save()
        return comment
      }
      console.log("CommentUpdatedd =>", comment);
    }
    //   {
    //     _id: new mongoose.Types.ObjectId(postId),
    //     "comments._id": new mongoose.Types.ObjectId(commentId),
    //     "comments.userId": new mongoose.Types.ObjectId(userId),
    //   },
    //   {
    //     $set: {
    //       "comments.$.comment": updatedComment,
    //       "comments.$.created_at": new Date(),
    //     },
    //   },
    //   { new: true }
    // );


  } catch (error) {
    console.error("Error delete post:", error);
    return undefined;
  }
};
