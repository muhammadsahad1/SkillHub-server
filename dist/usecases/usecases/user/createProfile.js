import { ErrorHandler } from '../../middlewares/errorMiddleware.js';
export const createProfile = async (user, file, userRepository, S3Operations, next) => {
    try {
        const updatedUser = await userRepository.createProfile(user, file, S3Operations);
        if (!updatedUser) {
            return next(new ErrorHandler(400, "Profile creation failed"));
        }
        return {
            success: true,
            user: updatedUser,
            message: "Profile created successfully."
        };
    }
    catch (error) {
    }
};
