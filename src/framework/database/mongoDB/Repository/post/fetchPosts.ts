import { IS3Operations } from "../../../../service/s3Bucket";
import PostModel from "../../model/postModel";
import userModel from "../../model/userModel";
import { User } from "aws-sdk/clients/budgets"; // Assuming this is the correct import

export const fetchPosts = async (
  userSkill: string,
  s3: IS3Operations,
  userModels: typeof userModel,
  postModels: typeof PostModel
) => {
  try {
    const users: User[] = await userModels
      .find({ skill: userSkill })
      .select("_id profileImage name isProfessional")
      .exec();
    const usersIds = users.map((user) => user?._id);
    const userPosts = await postModels.find({ userId: { $in: usersIds } });

    const postsWithPostUrl = await Promise.all(
      userPosts.map(async (post) => {
        const user = users.find(
          (u) => u?._id.toString() === post.userId.toString()
        );
        if (!user) return null;

        const userImageUrl = user?.profileImage
          ? await s3.getObjectUrl({
              bucket: process.env.C3_BUCKET_NAME,
              key: user?.profileImage,
            })
          : null;

        const postImageUrl = post.imageName
          ? await s3.getObjectUrl({
              bucket: process.env.C3_BUCKET_NAME,
              key: post.imageName,
            })
          : null;

        const commentedUserProfileUrls = await Promise.all(
          post?.comments.map(async (comment: any) => {
            const userImageName = await userModels.findById(comment.userId);
            if (!userImageName) return null;

            const commentedUserProfileUrl = await s3.getObjectUrl({
              bucket: process.env.C3_BUCKET_NAME,
              key: userImageName.profileImage,
            });

            return {
              ...comment.toObject(),
              commentedUserProfileUrl,
            
            };
          })
        );
        return {
          ...post.toObject(),
          userImageUrl,
          postImageUrl,
          userName: user?.name || "",
          isProfessional :user?.isProfessional ? true : false,
          comments: commentedUserProfileUrls.filter(
            (comment: any) => comment !== null
          ),
        };
      })
    );

    return {
      success: true,
      message: "Posts fetched successfully",
      posts: postsWithPostUrl.filter((post) => post !== null),
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      success: false,
      message: "Error fetching posts",
      posts: [],
    };
  }
};
