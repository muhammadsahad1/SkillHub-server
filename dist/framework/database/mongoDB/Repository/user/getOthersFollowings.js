export const getOthersFollowings = async (userId, userModels) => {
    try {
        const user = await userModels.findById(userId);
        // Check if user exists
        if (!user) {
            throw new Error("User not found");
        }
        console.log("Followings ===>", user.following);
        return user.following;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
};
