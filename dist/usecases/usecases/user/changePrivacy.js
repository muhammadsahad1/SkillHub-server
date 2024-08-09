import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const changePrivacy = async (userId, isPrivacy, privacyRepository, next) => {
    try {
        const result = await privacyRepository.changePrivacy(userId, isPrivacy);
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
