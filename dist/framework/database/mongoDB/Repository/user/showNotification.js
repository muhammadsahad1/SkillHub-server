export const showNotification = async (userId, isShowNotification, userModels) => {
    try {
        console.log("status ==>", isShowNotification);
        const updatedUser = await userModels.findByIdAndUpdate(userId, { $set: { showNotification: isShowNotification } }, { new: true } // Ensure the new option is set to true
        );
        console.log("updatedUser ===>", updatedUser?.showNotification);
        return updatedUser?.showNotification;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
};
