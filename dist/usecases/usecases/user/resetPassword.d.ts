import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Next } from "../../../framework/types/serverPackageType";
import { IhashPassword } from "../../interface/service/hashPassword";
export declare const resetPassword: (password: string, token: string, userRepository: IuserRepository, hashPassword: IhashPassword, next: Next) => Promise<void | {
    success: boolean;
    user: import("../../../commonEntities/entities/user").Iuser;
    message: string;
}>;
