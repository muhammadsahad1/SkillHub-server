import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from "../../model/userModel";
export declare const changePassword: (userModels: typeof userModel, userId: string, password: string) => Promise<Iuser | null | void>;
