import { Next, Req, Res } from "../../framework/types/serverPackageType";
import { IadminUseCase } from "../../usecases/interface/usecase/adminUseCase";
import {
  accessTokenOption,
  refreshTokenOption,
  roleOptions,
} from "../../framework/webServer/middleware/jwt";
// ===================================== User Controller ================================= //

export class AdminController {
  constructor(private adminUseCase: IadminUseCase) {}
// ======================================================>
  async adminLogin(req: Req, res: Res, next: Next) {
    const result = await this.adminUseCase.adminLogin(
      req.body.email,
      req.body.password,
      next
    );
    console.log("result ==>",result)
    res.cookie(
      "admin_access_token",
      result.tokens?.accessToken,
      accessTokenOption
    );
    res.cookie(
      "admin_refresh_token",
      result.tokens?.refreshToken,
      refreshTokenOption
    );
    res.cookie("role", "admin", roleOptions);
    if (result) {
      res.status(200).json(result);
    }
  }
  // ======================================================>
  async getUsers(req: Req, res: Res, next: Next){
    const result = await this.adminUseCase.getUsers(next)
    res.status(200).json(result)
    
  } 

  // ======================================================>
  async blockUser(req: Req, res: Res, next: Next){
    console.log("block controller vann")
    const result = await this.adminUseCase.blockUser(req.body.id)
    res.status(200).json(result)
      
    }
  
}
