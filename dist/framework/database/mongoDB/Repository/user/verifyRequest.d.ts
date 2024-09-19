import { VerifyRequest } from "../../../../../commonEntities/entities/verificationRequest";
import userModel from "../../model/userModel";
import { VerificationRequestModal } from "../../model/VerificationRequest";
export declare const verifyRequest: (userId: string, requestData: VerifyRequest, verificationRequestModal: typeof VerificationRequestModal, userModels: typeof userModel) => Promise<{
    success: boolean;
    message: string;
} | {
    success: boolean;
    message?: undefined;
} | undefined>;
