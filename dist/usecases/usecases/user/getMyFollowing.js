import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const getMyFollowings = async (userId, userRepository, s3, next) => {
    try {
        const myFollowings = await userRepository.getMyFollowing(userId, s3);
        if (!myFollowings) {
            return next(new ErrorHandler(401, "This user don't have followings"));
        }
        return myFollowings;
    }
    catch (error) {
        return next(new ErrorHandler(400, "User is founded"));
    }
};
