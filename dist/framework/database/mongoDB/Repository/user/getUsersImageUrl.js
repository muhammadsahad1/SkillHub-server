export const getUsersImageUrls = async (users, followings = [], s3) => {
    try {
        const followingIds = followings.map((id) => id.toString());
        const userWithImages = await Promise.all(users.map(async (user) => {
            const { _id: _id, name, bio, country, skill, profileImage: profileImage, coverImage: coverImage, } = user;
            let imageUrl = "";
            let coverImageUrl = "";
            if (profileImage) {
                imageUrl = await s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: profileImage,
                });
            }
            if (coverImage) {
                coverImageUrl = await s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: coverImage,
                });
            }
            let isFollowingBack = followingIds.includes(_id.toString());
            // returning the home page userSkillReleted data
            return {
                _id,
                name,
                country,
                bio,
                skill,
                imageUrl,
                coverImageUrl,
                isFollowingBack,
            };
        }));
        return userWithImages;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
};
