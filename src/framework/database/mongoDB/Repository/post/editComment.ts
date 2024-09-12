import mongoose from "mongoose";
import PostModel from "../../model/postModel";
import { IComment, Ipost } from "../../../../../commonEntities/entities/post";

export const editComment = async (
  postId: string,
  commentId: string,
  userId: string,
  updatedComment: string,
  postModels: typeof PostModel
): Promise<IComment | void> => {
  try {
    const post = await postModels.findById(postId);

    if (post) {
      const comment = post.comments.find(
        (c) => c._id.toString() === commentId && c.userId.toString() === userId
      );

      if (comment) {
        comment.comment = updatedComment;
        comment.created_at = new Date();
        await post.save();
        return comment;
      }
    }
  } catch (error) {
    console.error("Error delete post:", error);
    return undefined;
  }
};
