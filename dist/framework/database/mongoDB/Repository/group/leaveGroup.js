export const leaveGroup = async (groupId, userId, groupModel) => {
    try {
        const group = await groupModel.findById(groupId);
        if (!group) {
            return {
                success: false,
                message: "group not found",
            };
        }
        await group.updateOne({
            $pull: {
                members: {
                    userId: userId,
                },
            },
        });
        return {
            success: true,
            message: "leave group successfull",
        };
    }
    catch (error) {
        return {
            success: false,
            message: "error in leave group",
        };
    }
};
