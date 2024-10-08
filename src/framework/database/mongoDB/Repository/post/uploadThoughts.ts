import { Ipost } from "../../../../../commonEntities/entities/post.js";
import PostModel from "../../model/postModel.js";

export const uploadThoughts = async (
  userId: string,
  thoughts: string,
  postModal: typeof PostModel
):Promise<{success : boolean, thoughtPost : Ipost} | void> => {

  const newPostDetails = {
    userId : userId,
    type : "thoughts",
    caption : thoughts
  }

  const newPost = await postModal.create(newPostDetails)
  console.log("newPOst -==>",newPost);
  
  return {
    success : true,
    thoughtPost : newPost
  }
};
