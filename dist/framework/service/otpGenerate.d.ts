import { IotpGenerate } from "../../usecases/interface/service/otpGenerate";
export declare class OtpGenerate implements IotpGenerate {
    createOtp(): Promise<string>;
}
