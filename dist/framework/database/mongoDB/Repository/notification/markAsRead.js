export const markAsRead = async (notificationId, notificationModel) => {
    try {
        const notify = await notificationModel.findByIdAndUpdate(notificationId, {
            read: true,
        }, { new: true });
        await notificationModel.findByIdAndDelete(notify?._id);
        console.log("notiyyyy ====>", notify);
    }
    catch (error) {
        console.error("Error in create conversation:", error);
    }
};