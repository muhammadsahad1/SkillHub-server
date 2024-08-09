export const fetchPosts = async (userSkill, s3, userModels, postModels) => {
    try {
        const users = await userModels
            .find({ skill: userSkill })
            .select("_id profileImage name")
            .exec();
        const usersIds = users.map((user) => user._id);
        const userPosts = await postModels.find({ userId: { $in: usersIds } });
        const postsWithPostUrl = await Promise.all(userPosts.map(async (post) => {
            const user = users.find((u) => u._id.toString() === post.userId.toString());
            if (!user)
                return null;
            const userImageUrl = await s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: user.profileImage,
            });
            const postImageUrl = await s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: post.imageName,
            });
            return {
                ...post.toObject(),
                userImageUrl,
                postImageUrl,
                userName: user?.name
            };
        }));
        return {
            success: true,
            message: "Posts fetched successfully",
            posts: postsWithPostUrl.filter((post) => post !== null),
        };
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return {
            success: false,
            message: "Error fetching posts",
            posts: [],
        };
    }
};
