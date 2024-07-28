import { Iuser } from "../../../commonEntities/entities/user";

export interface IadminRepository {
  adminLogin(email: string): Promise<Iuser | void>;
  getUsers(): Promise<Iuser[] | undefined>;
  blockUser(id : string) : Promise<any>;
}
