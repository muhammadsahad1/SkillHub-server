import { IS3Operations } from "../../../../service/s3Bucket";
import PostModel from "../../model/postModel";

export const fetchMyPosts = async (
  userId: string,
  s3: IS3Operations,
  postModels: typeof PostModel
) => {
  const posts = await postModels.find({ userId });

  const postWithUrls = await Promise.all(
    posts.map(async (post) => {
      const imageName = post.imageName;
      
      // returing with postImageUrl
      const postImageUrl = await s3.getObjectUrl({
        bucket: process.env.C3_BUCKET_NAME,
        key: imageName,
      });

      return {
        ...post.toObject(),
        imageUrl: postImageUrl,
      };
    })
  );
  return postWithUrls;
};
