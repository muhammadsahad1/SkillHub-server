import { accessTokenOption, refreshTokenOption, roleOptions, } from "../../framework/webServer/middleware/jwt";
import { ErrorHandler } from "../../usecases/middlewares/errorMiddleware";
// ===================================== User Controller ================================= //
export class AdminController {
    adminUseCase;
    constructor(adminUseCase) {
        this.adminUseCase = adminUseCase;
    }
    // ======================================================>
    async adminLogin(req, res, next) {
        const result = await this.adminUseCase.adminLogin(req.body.email, req.body.password, next);
        res.cookie("admin_access_token", result.tokens?.accessToken, accessTokenOption);
        res.cookie("admin_refresh_token", result.tokens?.refreshToken, refreshTokenOption);
        res.cookie("role", "admin", roleOptions);
        console.log("result ===>", result);
        if (result) {
            res.status(200).json(result);
        }
    }
    // ======================================================>
    async getUsers(req, res, next) {
        const result = await this.adminUseCase.getUsers(next);
        res.status(200).json(result);
    }
    // ======================================================>
    async blockUser(req, res, next) {
        console.log("block controller vann");
        const result = await this.adminUseCase.blockUser(req.body.id);
        res.status(200).json(result);
    }
    async logout(req, res, next) {
        try {
            res.clearCookie('admin_access_token', accessTokenOption);
            res.clearCookie("admin_refresh_token", refreshTokenOption);
            res.clearCookie("role", roleOptions);
            res.status(200).json({ message: "admin logout successfull" });
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
}
