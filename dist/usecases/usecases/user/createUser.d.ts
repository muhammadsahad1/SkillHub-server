import { IhashPassword } from "../../interface/service/hashPassword";
import { Iuser } from "../../../commonEntities/entities/user";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import { Ijwt } from "../../interface/service/jwt";
export declare const createUser: (email: string, otp: string, jwt: Ijwt, otpRepository: IotpRepository, userRepository: IuserRepository, hashPassword: IhashPassword, next: Next) => Promise<{
    success: boolean;
    user?: Iuser;
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
    message?: string;
} | void>;
