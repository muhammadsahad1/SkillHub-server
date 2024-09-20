import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const othersFollowings = async (userId, currentUserId, userRepository, s3, next) => {
    try {

        const result = await userRepository.othersFollowings(userId, currentUserId, s3);
        if (!result) {
            return next(new ErrorHandler(401, "Getting other followings failed"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(400, "Followings is not found"));
    }
};
