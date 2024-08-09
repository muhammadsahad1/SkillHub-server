export const getUsers = async (userModels) => {
    try {
        const users = await userModels.find({ role: { $ne: "admin" } });
        return users;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined; // Handle error as needed
    }
};
