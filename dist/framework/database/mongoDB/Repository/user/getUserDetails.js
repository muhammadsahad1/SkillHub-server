export const getUserDetails = async (userId, userModels) => {
    try {
        const users = await userModels
            .findById(userId).lean();
        // Populate following
        console.log("users ===>", users);
        if (!users) {
            return;
        }
        return users;
    }
    catch (error) { }
};
