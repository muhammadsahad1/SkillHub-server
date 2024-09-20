import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const getUserDetails = async (userId, s3, userRepository, next) => {
    try {
        const user = await userRepository.getUserDetails(userId);
        const profileImageUrl = await s3.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: user.profileImage
        });
        if (!user) {
            return next(new ErrorHandler(400, "User is not found"));
        }
        const userWithImage = {
            ...user,
            profileImageUrl: profileImageUrl
        };
        return userWithImage;
    }
    catch (error) {
        return next(new ErrorHandler(400, "User is founded"));
    }
};
