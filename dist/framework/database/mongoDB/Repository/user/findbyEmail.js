export const findByEmail = async (userModels, email) => {
    try {
        const user = await userModels.findOne({ email: email });
        if (user) {
            return user;
        }
        else {
            return;
        }
    }
    catch (error) {
        console.error("Error finding user by email:", error);
        return undefined;
    }
};
