import { VerifyRequest } from "../../../commonEntities/entities/verificationRequest";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const verifyRequest: (userId: string, requestData: VerifyRequest, userRepository: IuserRepository, next: Next) => Promise<void | {
    success: boolean;
}>;
