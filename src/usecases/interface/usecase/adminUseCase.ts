import { IToken } from "../service/jwt";
import { Next } from "../../../framework/types/serverPackageType";

// ================================> AdminUseCase Interface
export interface IadminUseCase {
  adminLogin(email: string, password: string, next: Next): Promise<any>;
  getUsers(next: Next): Promise<any>;
  blockUser(id: string): Promise<any>;
}
