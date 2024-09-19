import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from "../../model/userModel";
export declare const createUser: (newUser: Iuser, userModels: typeof userModel) => Promise<Iuser | void>;
