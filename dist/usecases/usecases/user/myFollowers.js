import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const myFollowers = async (userId, s3, userRepository, next) => {
    try {
        const followers = await userRepository.myFollowers(userId, s3);
        if (!followers) {
            return next(new ErrorHandler(400, "User is not found"));
        }
        return followers;
    }
    catch (error) {
        return next(new ErrorHandler(400, "User is not found"));
    }
};
