import { ErrorHandler } from "../../../../../usecases/middlewares/errorMiddleware.js";
import PostModel from "../../model/postModel.js";
import userModel from "../../model/userModel.js";

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
) : Promise<any> => {
  try {
    const user = await userModelS.findById(userId).select("name");

    if (!user) {
      return new ErrorHandler(404, "user not found");
    }

    const newComment: Comment = {
      userId,
      comment: comment,
      userName: user.name,
      createdAt: new Date(),
    };

    const post = await postModels.findByIdAndUpdate(
      postId,
      {
        $push: { comments: newComment },
      },
      { new: true }
    );
    console.log("commenPOst =", post);

    return {
      comments: post?.comments,
      postOwnerId: post?.userId,
    };
  } catch (error) {
    console.error("Error delete post:", error);
    return undefined;
  }
};
