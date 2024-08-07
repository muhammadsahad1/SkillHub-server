// interfaces
import { IS3Operations } from "../../framework/service/s3Bucket";
import { IadminRepository } from "../interface/repositoryInterface/adminRepository";
import { IhashPassword } from "../interface/service/hashPassword";
import { Ijwt } from "../interface/service/jwt";
import { IsendEmail } from "../interface/service/sendEmail";
import { IadminUseCase } from "../interface/usecase/adminUseCase";
import { adminLogin, blockUser, getUsers } from "./admin/index";
import { Next } from "../../framework/types/serverPackageType";
// ================================= Admin user cases ================================= \\

export class AdminUseCase implements IadminUseCase {
  constructor(
    private adminRepostory: IadminRepository,
    private Jwt: Ijwt,
    private hashPassword: IhashPassword,
    private sendEmail: IsendEmail,
    private s3: IS3Operations
  ) {}

  // ===================================================================>
  async adminLogin(email: string, password: string, next: Next): Promise<any> {
    const result = await adminLogin(
      email,
      password,
      this.Jwt,
      this.hashPassword,
      this.adminRepostory,
      next
    );
    return result;
  }
  // ===================================================================>
  async getUsers(next: Next): Promise<any> {
    const result = await getUsers(this.adminRepostory, next);
    return result;
  }
  // ===================================================================>
  async blockUser(id: string): Promise<any> {
    const result = await blockUser(id, this.adminRepostory);
    return result;
  }
}
