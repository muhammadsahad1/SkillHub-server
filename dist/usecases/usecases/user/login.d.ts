import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Ijwt } from "../../interface/service/jwt";
import { Next } from "../../../framework/types/serverPackageType";
import { IhashPassword } from "../../interface/service/hashPassword";
import { Iuser } from "../../../commonEntities/entities/user";
export declare const login: (userRepository: IuserRepository, jwt: Ijwt, hashedPassword: IhashPassword, email: string, password: string, picture: string | undefined, next: Next) => Promise<{
    fetchUser?: Iuser | void;
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
} | void>;
