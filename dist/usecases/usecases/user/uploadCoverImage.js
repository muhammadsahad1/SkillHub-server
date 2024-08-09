import { ErrorHandler } from '../../middlewares/errorMiddleware';
export const coverImageUpload = async (userId, file, s3, userRepository, next) => {
    try {
        const result = await userRepository.uploadeCoverImage(userId, file, s3);
        if (!result) {
            return next(new ErrorHandler(400, "Cover image update failed"));
        }
        console.log("updaed User ==>", result);
        return result;
        return result;
    }
    catch (error) {
    }
};
