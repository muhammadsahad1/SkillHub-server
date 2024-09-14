import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const changePrivacy = async (userId, isPrivacy, userRepository, next) => {
    try {
        const result = await userRepository.changePrivacy(userId, isPrivacy);
        if (!result) {
            return next(new ErrorHandler(400, 'failed to changePrivacy'));
        }
        return {
            updatedPrivacySettings: result,
            status: true
        };
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
