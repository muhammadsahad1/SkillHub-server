import userModel from "../../model/userModel";
import { Iuser } from "../../../../../commonEntities/entities/user";
export declare const findByEmail: (userModels: typeof userModel, email: string) => Promise<Iuser | void>;
