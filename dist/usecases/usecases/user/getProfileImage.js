import { ErrorHandler } from '../../middlewares/errorMiddleware';
export const getProfileImage = async (userId, userRepository, s3, next) => {
    try {
        const ImageUrls = await userRepository.fetchProfileImage(s3, userId);
        return {
            success: true,
            imageUrls: ImageUrls,
            message: "fetch profile image successfully",
        };
    }
    catch (error) {
        return next(new ErrorHandler(400, "User is founded"));
    }
};
