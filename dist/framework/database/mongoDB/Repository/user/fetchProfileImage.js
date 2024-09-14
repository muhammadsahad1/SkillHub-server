export const fetchProfileImage = async (userModels, s3, userId) => {
    try {
        // fetching user's profileImage Name for fetch from S31bucket
        const findUser = await userModels.findById({ _id: userId });
        const followersCount = findUser?.followers?.length;
        const followingsCount = findUser?.following?.length;
        const profileImgName = findUser?.profileImage;
        const coverImageName = findUser?.coverImage;
        // here we got the IMAGE URL
        let imageUrl;
        let coverImageUrl;
        if (profileImgName) {
            imageUrl = await s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: profileImgName,
            });
        }
        if (coverImageName) {
            coverImageUrl = await s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: coverImageName,
            });
        }
        console.log("called fetchImage");
        return { imageUrl, coverImageUrl, followersCount, followingsCount };
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
};
