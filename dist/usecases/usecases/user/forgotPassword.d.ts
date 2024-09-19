import { Iuser } from "../../../commonEntities/entities/user";
import { IsendEmail } from "../../interface/service/sendEmail";
import { Next } from "../../../framework/types/serverPackageType";
import { Ijwt } from "../../interface/service/jwt";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const forgotPassword: (jwt: Ijwt, userRepository: IuserRepository, sendEmail: IsendEmail, email: string, next: Next) => Promise<void | {
    success: boolean;
    token: string;
    user: Iuser;
    message: string;
}>;
