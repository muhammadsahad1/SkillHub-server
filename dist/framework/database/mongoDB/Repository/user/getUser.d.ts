import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from '../../model/userModel';
export declare const getUser: (userModels: typeof userModel, userId: string) => Promise<Iuser | any>;
