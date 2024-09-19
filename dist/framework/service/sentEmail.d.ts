import { IsendEmail } from "../../usecases/interface/service/sendEmail";
export declare class SendEmail implements IsendEmail {
    constructor();
    sentEmailVerification(name: string, email: string, verificationCode: string): Promise<any>;
    sentResetLinkVerification(name: string, email: string, resetToken: string): Promise<any>;
}
