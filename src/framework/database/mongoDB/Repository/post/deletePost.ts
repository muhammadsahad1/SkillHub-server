import PostModel from "../../model/postModel.js";

export const deletePost = async (
  postId : string,
  postModels : typeof PostModel
)=> {
  try {
  
    await postModels.deleteOne({_id : postId})

  } catch (error) {
    console.error("Error delete post:", error);
    return undefined; // Handle error as needed
  }


}