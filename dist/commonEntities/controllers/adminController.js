"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const jwt_1 = require("../../framework/webServer/middleware/jwt");
const errorMiddleware_1 = require("../../usecases/middlewares/errorMiddleware");
// ===================================== User Controller ================================= //
class AdminController {
    constructor(adminUseCase) {
        this.adminUseCase = adminUseCase;
    }
    // ======================================================>
    adminLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const result = yield this.adminUseCase.adminLogin(req.body.email, req.body.password, next);
            console.log("admin loging called");
            console.log("ress =>", result);
            res.cookie("admin_access_token", (_a = result.tokens) === null || _a === void 0 ? void 0 : _a.accessToken, jwt_1.accessTokenOption);
            res.cookie("admin_refresh_token", (_b = result.tokens) === null || _b === void 0 ? void 0 : _b.refreshToken, jwt_1.refreshTokenOption);
            res.cookie("role", "admin", jwt_1.roleOptions);
            if (result) {
                res.status(200).json(result);
            }
        });
    }
    // ======================================================>
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUseCase.getUsers(next);
            res.status(200).json(result);
        });
    }
    // ======================================================>
    blockUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUseCase.blockUser(req.body.id);
            res.status(200).json(result);
        });
    }
    // ======================================================>
    getVerificationRequests(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUseCase.getVerificationRequests(next);
            res.status(200).json(result);
        });
    }
    // ======================================================>
    changeVerifyStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { reqId, status } = req.body;
            const result = yield this.adminUseCase.changeVerifyStatus(reqId, status, next);
            res.status(200).json(result);
        });
    }
    // ======================================================>
    getEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUseCase.getEvents(next);
            res.status(200).json(result);
        });
    }
    // ======================================================>
    changeEventStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { requestId, action } = req.body;
            const result = yield this.adminUseCase.changeEventStatus(requestId, action, next);
            res.status(200).json(result);
        });
    }
    // ======================================================>
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("admin_access_token", jwt_1.accessTokenOption);
                // res.clearCookie("admin_refresh_token", refreshTokenOption);
                res.clearCookie("role", jwt_1.roleOptions);
                res.status(200).json({ message: "admin logout successfull" });
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ======================================================>
    getReports(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminUseCase.getReports(next);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    // ======================================================>
    reportAction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { reportId, status } = req.body;
                const result = yield this.adminUseCase.reportAction(reportId, status, next);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) { }
        });
    }
    // ======================================================>
    dasboardData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUseCase.dashBoardData(next);
            if (result) {
                res.status(200).json(result);
            }
        });
    }
}
exports.AdminController = AdminController;
