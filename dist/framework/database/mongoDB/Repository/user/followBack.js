export const followBack = async (fromFollowingId, toFollowId, userModels) => {
    try {
        console.log("from followingID ==>", fromFollowingId, "toFollowId ==>", toFollowId);
        await userModels.findByIdAndUpdate(fromFollowingId, { $push: {
                following: toFollowId
            } });
    }
    catch (error) {
        console.error("Error finding user by email:", error);
        return undefined;
    }
};
