import mongoose from "mongoose";
import { ErrorHandler } from "../../../../../usecases/middlewares/errorMiddleware";
import PostModel from "../../model/postModel";

export const postLike = async (
  userId: string,
  postId: string,
  postModels: typeof PostModel
) => {
  try {
    const post = await postModels.findById(postId);
    if (!post) {
      return { message: "Post not found" };
    }

    const userIdObject = new mongoose.Types.ObjectId(userId);
    // Check if the user has already liked the post
    const alreadyLiked = post.likes.some((id) => id.equals(userIdObject));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    if (alreadyLiked) {
      // Remove the user from the likes array
      post.likes?.pull(userIdObject);
    } else {
      // Add the user to the likes array
      post.likes?.push(userIdObject);
    }

    await post.save();

    return { message: alreadyLiked ? "Post unliked" : "Post liked" ,postId : postId , postUserId : post.userId};
  } catch (error : any) {
    throw new ErrorHandler(500, error.message);
  }
};
