import { IhashPassword } from "../../interface/service/hashPassword";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const changePassword: (userId: string, currentPassword: string, newPassword: string, hashPassword: IhashPassword, userRepository: IuserRepository, next: Next) => Promise<{
    success: boolean;
    message: string;
} | any>;
