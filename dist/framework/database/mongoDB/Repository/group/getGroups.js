export const getGroups = async (groupModel, s3Operations) => {
    try {
        const groups = await groupModel.find({});
        const groupsWithImageUrl = await Promise.all(groups.map(async (grp) => {
            const groupImageName = grp?.groupImage;
            let groupImageUrl = "";
            if (groupImageName) {
                groupImageUrl = await s3Operations.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: groupImageName,
                });
            }
            return {
                ...grp.toObject(),
                groupImageUrl,
            };
        }));
        console.log("groups =>", groupsWithImageUrl);
        return groupsWithImageUrl;
    }
    catch (error) {
        console.error("Error fetching groups:", error);
        return undefined;
    }
};
