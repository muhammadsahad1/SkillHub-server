export const resentOtp = async (otpGenerate, otpRepository, sendEmail, email, next) => {
    try {
        const otp = await otpGenerate.createOtp();
        await otpRepository.resendOtp(email, otp);
        await sendEmail.sentEmailVerification("user", email, otp);
    }
    catch (error) {
        throw error;
    }
};
