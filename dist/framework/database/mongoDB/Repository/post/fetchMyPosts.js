export const fetchMyPosts = async (userId, s3, postModels) => {
    const posts = await postModels.find({ userId });
    const postWithUrls = await Promise.all(posts.map(async (post) => {
        const imageName = post.imageName;
        // returing with postImageUrl
        const postImageUrl = imageName ? await s3.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: imageName,
        }) : null;
        return {
            ...post.toObject(),
            imageUrl: postImageUrl,
        };
    }));
    return postWithUrls;
};
