import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const othersFollowings = async (userId, currentUserId, userRepository, s3, next) => {
    try {
        console.log("useIDDDDDDDDDDDDDd ===>", userId);
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
