import PostModel from "../../model/postModel.js";

export const postView  = async (
  postId : string ,
  postModel : typeof PostModel
) => {
  try {
    const post = postModel.findById(postId)
    if(!post){
      throw new Error("post not found")
    }
    return post
  } catch (error) {
    console.error("Error fetching the others posts:", error);
    return undefined; // Handle error as needed
  }
}