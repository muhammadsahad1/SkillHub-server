import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
// Creating user after user submits the OTP
export const createUser = async (email, otp, jwt, otpRepository, userRepository, hashPassword, next) => {
    try {
        // Fetch OTP
        const fetchedOtp = await otpRepository.findOtp(email);
        console.log("fetchedOTP", fetchedOtp);
        if (!fetchedOtp) {
            return next(new ErrorHandler(404, "OTP not found for the given email"));
        }
        // Check if provided OTP matches the stored OTP
        if (fetchedOtp.otp !== otp) {
            return next(new ErrorHandler(400, "Invalid OTP"));
        }
        // Hash the password from the OTP entry
        const hashedPassword = await hashPassword.createHash(fetchedOtp.userPassword);
        const user = {
            name: fetchedOtp.username,
            email: fetchedOtp.email,
            password: hashedPassword,
        };
        // Save user to the user collection DB
        const newUser = await userRepository.createUser(user);
        const tokens = await jwt.createAccessAndRefreshToken(newUser.id);
        console.log("tokens ===>", tokens);
        if (newUser) {
            return {
                success: true,
                user: newUser,
                tokens: tokens,
                message: "successfully created user",
            };
        }
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
