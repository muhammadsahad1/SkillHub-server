import { VerificationRequestModal } from "../../model/VerificationRequest";
export declare const getVerificationRequests: (verificationRequestsModel: typeof VerificationRequestModal) => Promise<(import("mongoose").Document<unknown, {}, import("../../../../../commonEntities/entities/verificationRequest").IVerificationRequest> & import("../../../../../commonEntities/entities/verificationRequest").IVerificationRequest & Required<{
    _id: unknown;
}>)[] | undefined>;
