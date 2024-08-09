import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const followUp = async (toFollowingId, fromFollowerId, userRepository, next) => {
    try {
        await userRepository.followUp(toFollowingId, fromFollowerId);
    }
    catch (error) {
        return next(new ErrorHandler(400, "follow update failed"));
    }
};
