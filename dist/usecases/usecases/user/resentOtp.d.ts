import { IotpGenerate } from "../../interface/service/otpGenerate";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import { IsendEmail } from "../../interface/service/sendEmail";
import { Next } from "../../../framework/types/serverPackageType";
export declare const resentOtp: (otpGenerate: IotpGenerate, otpRepository: IotpRepository, sendEmail: IsendEmail, email: string, next: Next) => Promise<void>;
