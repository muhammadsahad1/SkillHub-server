import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const unFollow = async (toUnfollowId, fromFollowerId, userRepository, next) => {
    try {
        await userRepository.unFollow(toUnfollowId, fromFollowerId);
        return { success: true, message: "unFollowed successfull" };
    }
    catch (error) {
        return next(new ErrorHandler(400, "follow update failed"));
    }
};
