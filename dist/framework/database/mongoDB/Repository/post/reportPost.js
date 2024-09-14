export const reportPost = async (postId, reason, userId, postModel, reportModel) => {
    try {
        const result = await reportModel.create({
            postId: postId,
            reportedBy: userId,
            reason: reason,
        });
        console.log("new report =>", result);
        await result.save();
        return {
            success: true,
            message: "successfully created the report request",
        };
    }
    catch (error) {
        return {
            success: false,
            message: "successfully failed to create the report request",
        };
    }
};
