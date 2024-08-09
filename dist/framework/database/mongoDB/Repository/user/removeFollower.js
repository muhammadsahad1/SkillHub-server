export const removeFollower = async (fromRemoverId, toRemoveId, userModels) => {
    try {
        await userModels.findByIdAndUpdate(toRemoveId, {
            $pull: { following: fromRemoverId },
        });
        await userModels.findByIdAndUpdate(fromRemoverId, {
            $pull: { followers: toRemoveId },
        });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined;
    }
};
