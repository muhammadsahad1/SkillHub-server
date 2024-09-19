import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from "../../model/userModel";
export declare const getUsers: (userModels: typeof userModel) => Promise<Iuser[] | undefined>;
