import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const removeFollower = async (fromRemoverId, toRemoveId, userRepository, next) => {
    try {
        await userRepository.removeFollower(fromRemoverId, toRemoveId);
        return { success: true, message: "Removed follower successfully" };
    }
    catch (error) {
        next(new ErrorHandler(400, "User is not found"));
        return { success: false, message: "Failed to remove follower" };
    }
};
