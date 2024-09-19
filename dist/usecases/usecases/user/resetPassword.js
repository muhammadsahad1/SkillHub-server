import { ErrorHandler } from '../../middlewares/errorMiddleware';
export const resetPassword = async (password, token, userRepository, hashPassword, next) => {
    try {
        const hashedPassword = await hashPassword.createHash(password);
        const result = await userRepository.resetPasswordVerify(hashedPassword, token);
        if (result) {
            return {
                success: true,
                user: result,
                message: "reset password successfully"
            };
        }
    }
    catch (error) {
        return next(new ErrorHandler(400, "failed tp reset password"));
    }
};
