import { Iuser } from "../../../commonEntities/entities/user";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const getUser: (userId: string, userRepository: IuserRepository, next: Next) => Promise<void | Iuser>;
