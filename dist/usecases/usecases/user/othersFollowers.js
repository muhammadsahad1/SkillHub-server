import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const othersFollowers = async (userId, currentUserId, userRepository, s3, next) => {
    try {
        const result = await userRepository.othersFollowers(userId, currentUserId, s3);
        if (!result) {
            return next(new ErrorHandler(401, "Getting other followers failed"));
        }
        console.log("res ===============>", result);
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(400, "User is not found"));
    }
};
