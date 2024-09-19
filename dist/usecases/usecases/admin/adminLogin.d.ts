import { IhashPassword } from "../../interface/service/hashPassword";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { Ijwt } from "../../interface/service/jwt";
import { Next } from "../../../framework/types/serverPackageType";
export declare const adminLogin: (email: string, password: string, jwt: Ijwt, hashedPassword: IhashPassword, adminRepository: IadminRepository, next: Next) => Promise<void | {
    success: boolean;
    tokens: import("../../interface/service/jwt").IToken;
    message: string;
    admin: {
        _id: string | undefined;
        email: string | undefined;
    };
}>;
