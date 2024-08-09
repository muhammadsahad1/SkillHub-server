import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const getUserDetails = async (userId, userRepository, next) => {
    try {
        const user = await userRepository.getUserDetails(userId);
        if (!user) {
            return next(new ErrorHandler(400, "User is not found"));
        }
        return user;
    }
    catch (error) {
        return next(new ErrorHandler(400, "User is founded"));
    }
};
