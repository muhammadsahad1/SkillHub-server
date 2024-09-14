export const findByEmailUpdatePicture = async (userModels, email, picture) => {
    try {
        console.log("Updating user with email:", email);
        console.log("New picture URL:", picture);
        const updatedUser = await userModels.findOneAndUpdate({ email: email }, {
            $set: {
                picture: picture,
            },
        }, { new: true });
        return updatedUser;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
};
