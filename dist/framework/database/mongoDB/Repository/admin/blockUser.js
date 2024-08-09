export const blockUser = async (id, userModels) => {
    try {
        const user = await userModels.findById(id);
        let blockStatus = !user?.blocked;
        const result = await userModels.findByIdAndUpdate(id, { blocked: blockStatus }, { new: true });
        return result;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
};
