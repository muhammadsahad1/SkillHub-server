export const createUser = async (newUser, userModels) => {
    try {
        const user = await userModels.create(newUser);
        return user;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
};
