import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const changePrivacy: (userId: string, isPrivacy: boolean, userRepository: IuserRepository, next: Next) => Promise<void | {
    updatedPrivacySettings: any;
    status: boolean;
}>;
