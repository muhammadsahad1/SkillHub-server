export const findByEmailUpdatePicture = async (userModels, email, picture) => {
    try {
        console.log("Updating user with email:", email);
        console.log("New picture URL:", picture);
        const updatedUser = await userModels.findOneAndUpdate({ email: email }, {
            $set: {
                picture: picture,
            },
        }, { new: true });
        console.log("google kazhinj updated", updatedUser);
        return updatedUser;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
};
