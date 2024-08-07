import { ErrorHandler } from "../../../../../usecases/middlewares/errorMiddleware";
import PostModel from "../../model/postModel";
import userModel from "../../model/userModel";

interface Comment {
  userId: string;
  comment: string;
  userName: string;
  createdAt?: Date; // Optional field to record when the comment was created
}

export const addComment = async (
  postId: string,
  userId: string,
  comment: string,
  postModels: typeof PostModel,
  userModelS: typeof userModel
) => {
  try {
    
    const user = await userModelS.findById(userId).select('name')

    if(!user){
      return (new ErrorHandler(404, "user not found"))
    }

    const newComment: Comment = {
      userId,
      comment: comment,
      userName : user.name,
      createdAt: new Date(), 
    };

    const post = await postModels.findByIdAndUpdate(
      postId,
      {
        $push: { comments: newComment },
      },
      { new: true }
    );

    return post?.comments;
    
  } catch (error) {
    console.error("Error delete post:", error);
    return undefined;
  }
};
