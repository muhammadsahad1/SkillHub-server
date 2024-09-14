import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const unFollow = async (toUnfollowId, fromFollowerId, userRepository, notification, next) => {
    try {
        console.log("ethiiiiiyeee");
        await userRepository.unFollow(toUnfollowId, fromFollowerId);
        await notification.removeNotification(toUnfollowId, "follow");
        return { success: true, message: "unFollowed successfull" };
    }
    catch (error) {
        return next(new ErrorHandler(400, "follow update failed"));
    }
};
