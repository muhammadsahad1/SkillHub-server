import otpModel from "../model/otpModel";
export class OtpRepository {
    // creating opt document for particular time (1m) 
    async createOtp(username, email, userPassword, otp) {
        try {
            const resultOtp = await otpModel.create({ username, email, userPassword, otp });
            resultOtp.save();
            console.log("created OTP ==>", resultOtp);
            return resultOtp;
        }
        catch (error) {
            throw error;
        }
    }
    async findOtp(email) {
        try {
            const fetchOtp = await otpModel.findOne({ email });
            console.log("fetchOtp ===>", fetchOtp);
            return fetchOtp;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    findAndDeleteUser(email) {
    }
    resendOtp(email, otp) {
    }
}
