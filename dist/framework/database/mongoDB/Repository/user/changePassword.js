export const changePassword = async (userModels, userId, password) => {
    try {
        console.log("updting ");
        const updateUser = await userModels.findOneAndUpdate({ _id: userId }, {
            $set: {
                password: password,
            },
        });
        return updateUser;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined; // Handle error as needed
    }
};
