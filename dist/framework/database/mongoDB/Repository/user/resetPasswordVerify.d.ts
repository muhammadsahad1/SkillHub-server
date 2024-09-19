import userModel from "../../model/userModel";
import { Iuser } from "../../../../../commonEntities/entities/user";
export declare const resetPasswordVerify: (userModels: typeof userModel, password: string, token: string) => Promise<Iuser | null | void>;
