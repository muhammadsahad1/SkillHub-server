export const getUser = async (userModels, userId) => {
    try {
        const user = await userModels.findById({ _id: userId });
        console.log("getUser ===>", user);
        return user;
    }
    catch (error) {
    }
};
