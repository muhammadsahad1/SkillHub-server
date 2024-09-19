import userModel from "../../model/userModel";
import { VerificationRequestModal } from "../../model/VerificationRequest";
export declare const changeVerifyStatus: (requestId: string, status: "Pending" | "Approved" | "Rejected", userModal: typeof userModel, verifyRequstModal: typeof VerificationRequestModal) => Promise<{
    success: boolean;
} | undefined>;
