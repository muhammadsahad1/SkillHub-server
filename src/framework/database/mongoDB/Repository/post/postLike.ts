import mongoose from "mongoose";
import { ErrorHandler } from "../../../../../usecases/middlewares/errorMiddleware";
import PostModel from "../../model/postModel";

export const postLike = async (
  userId: string,
  postId: string,
  postModels: typeof PostModel
): Promise<{
  message: string;
  postId: string | undefined;
  postUserId: string | undefined;
}> => {
  try {

    const userIdObject = new mongoose.Types.ObjectId(userId);
    // Check if the post exists
    const post = await postModels.findById(postId).lean();
    if (!post) {
      return {
        message: "Post not found",
        postId: undefined,
        postUserId: undefined,
      };
    }

    const likesArray = post.likes as unknown as mongoose.Types.ObjectId[];

    const alreadyLiked = likesArray.some((id) => id.equals(userIdObject));

    if (alreadyLiked) {
      // Remove the user from the likes array
      await postModels.findByIdAndUpdate(
        postId,
        { $pull: { likes: userIdObject } },
        { new: true }
      );
    } else {

      // Add the user to the likes array
      await postModels.findByIdAndUpdate(
        postId,
        { $push: { likes: userIdObject } },
        { new: true }
      );
    }

    return {
      message: alreadyLiked ? "Post unliked" : "Post liked",
      postId: postId,
      postUserId: post.userId ? post.userId.toString() : undefined, // Convert ObjectId to string if it exists
    };
  } catch (error: any) {
    throw new ErrorHandler(500, error.message);
  }
};
