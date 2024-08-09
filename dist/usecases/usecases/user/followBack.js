import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const followBack = async (fromFollowingId, toFollowId, userRepository, next) => {
    try {
        await userRepository.followBack(fromFollowingId, toFollowId);
        return { success: true, message: "follow back successfully" };
    }
    catch (error) {
        next(new ErrorHandler(500, "Internal Server Error"));
        return { success: false, message: "Failed to follow back" };
    }
};
