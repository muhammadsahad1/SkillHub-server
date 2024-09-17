import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const userSignup = async (jwt, otpRepository, userRepostory, otpGenerate, hashPassword, user, sendEmail, next) => {
    try {
        const existUser = await userRepostory.findByEmail(user.email);
        if (existUser) {
            console.log("user already exists");
            return next(new ErrorHandler(400, "User already exists"));
        }
        const userInOtp = await otpRepository.findOtp(user.email);
        if (userInOtp) {
            await sendEmail.sentEmailVerification(user.name, user.email, userInOtp.otp);
        }
        else {
            const createdOtp = await otpGenerate.createOtp();
            const responseCreateOtp = await otpRepository.createOtp(user.name, user.email, user.password, createdOtp);
            await sendEmail.sentEmailVerification(user.name, user.email, createdOtp);
            const password = await hashPassword.createHash(user.password);
            user.password = password;
            return { success: true, message: "otp send" };
        }
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Error"));
    }
};
