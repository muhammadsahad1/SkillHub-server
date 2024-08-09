import { ErrorHandler } from '../../middlewares/errorMiddleware';
export const forgotPassword = async (jwt, userRepository, sendEmail, email, next) => {
    try {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            return { message: "User not found", success: false };
        }
        // forgotToken generating FN
        const resetPassToken = await jwt.forgotPasswordToken(user?.id, user.email);
        // passing the user email and resetToken for update
        const fetechedUser = await userRepository.findOneUpdateResetToken(email, resetPassToken);
        if (!fetechedUser) {
            return next(new ErrorHandler(404, "Updateing found error"));
        }
        await sendEmail.sentResetLinkVerification(fetechedUser.name, fetechedUser.email, resetPassToken);
        return {
            success: true,
            token: resetPassToken,
            user: fetechedUser,
            message: "Resetpassord link has been sended",
        };
    }
    catch (error) {
    }
};
