import { Iotp } from "../../../../commonEntities/entities/otp";
import { IotpRepository } from "../../../../usecases/interface/repositoryInterface/otpRepository";
export declare class OtpRepository implements IotpRepository {
    resendOtp(email: string, otp: string): Promise<void>;
    createOtp(username: string, email: string, userPassword: string, otp: string): Promise<Iotp>;
    findOtp(email: string): Promise<Iotp | null>;
}
