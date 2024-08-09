import mongoose from "mongoose";
export const myFollowers = async (userId, userModels) => {
    try {
        const user = await userModels.findById(userId).lean();
        const followers = user?.followers.filter((id) => mongoose.Types.ObjectId.isValid(id));
        const followersUsers = await userModels.find({ _id: { $in: followers } });
        // returning followerUsers and followingback userId
        return {
            followersUsers,
            following: user?.following,
        };
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
};
