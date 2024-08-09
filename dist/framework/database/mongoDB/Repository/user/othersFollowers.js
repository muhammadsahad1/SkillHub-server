// Define the function to fetch followers
export const getOthersFollowers = async (userId, userModel) => {
    try {
        const user = await userModel.findById(userId);
        // Find the user by ID
        console.log("user =====>", user?.followers);
        // Check if user exists
        if (!user) {
            throw new Error("User not found");
        }
        const followers = user.followers;
        await userModel.find();
        return followers;
    }
    catch (error) {
        console.error("Error fetching followers:", error);
        throw new Error("Unable to fetch followers");
    }
};
