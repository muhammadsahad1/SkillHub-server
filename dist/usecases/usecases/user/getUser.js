import { ErrorHandler } from '../../middlewares/errorMiddleware.js';
export const getUser = async (userId, userRepository, next) => {
    try {
        const user = await userRepository.getUser(userId);
        if (!user) {
            return next(new ErrorHandler(400, "User is not found"));
        }
        return user;
    }
    catch (error) {
    }
};
