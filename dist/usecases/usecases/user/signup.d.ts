import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Ijwt } from "../../interface/service/jwt";
import { Iuser } from "../../../commonEntities/entities/user";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import { IotpGenerate } from "../../interface/service/otpGenerate";
import { Next } from "../../../framework/types/serverPackageType";
import { IsendEmail } from "../../interface/service/sendEmail";
import { IhashPassword } from "../../interface/service/hashPassword";
export declare const userSignup: (jwt: Ijwt, otpRepository: IotpRepository, userRepostory: IuserRepository, otpGenerate: IotpGenerate, hashPassword: IhashPassword, user: Iuser, sendEmail: IsendEmail, next: Next) => Promise<string | void | {
    success: boolean;
    message: string;
}>;
