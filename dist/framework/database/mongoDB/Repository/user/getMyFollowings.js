import mongoose from "mongoose";
export const getMyFollowing = async (userId, userModels, s3) => {
    try {
        const user = await userModels.findById(userId).lean();
        if (!user) {
            return "user is not found";
        }
        const followings = user?.following.filter(id => mongoose.Types.ObjectId.isValid(id));
        const followingsUsers = await userModels.find({ _id: { $in: followings } });
        return followingsUsers;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
};
