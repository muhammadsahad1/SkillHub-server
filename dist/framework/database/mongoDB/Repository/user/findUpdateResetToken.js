// updating user for attaching resetToken
export const findUpdateResetToken = async (userModels, email, resetToken) => {
    try {
        const userAttachResetLink = await userModels.findOneAndUpdate({ email: email }, { $set: { resetPasswordToken: resetToken } }, { new: true });
        return userAttachResetLink;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
};
