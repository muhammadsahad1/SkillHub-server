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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const jwt_1 = require("../../framework/webServer/middleware/jwt");
const errorMiddleware_1 = require("../../usecases/middlewares/errorMiddleware");
const httpStatus_1 = __importDefault(require("../status/httpStatus"));
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
                res.status(httpStatus_1.default.OK).json(result);
            }
            else {
                res.status(httpStatus_1.default.UNAUTHORIZED).json({ message: "Login failed" });
            }
        });
    }
    // ======================================================>
    getUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUseCase.getUsers(next);
            res.status(httpStatus_1.default.OK).json(result);
        });
    }
    // ======================================================>
    blockUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUseCase.blockUser(req.body.id);
            if (result) {
                res.status(httpStatus_1.default.OK).json(result);
            }
            else {
                res.status(httpStatus_1.default.BAD_REQUEST).json({ message: "User not found" });
            }
        });
    }
    // ======================================================>
    getVerificationRequests(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUseCase.getVerificationRequests(next);
            res.status(httpStatus_1.default.OK).json(result);
        });
    }
    // ======================================================>
    changeVerifyStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { reqId, status } = req.body;
            const result = yield this.adminUseCase.changeVerifyStatus(reqId, status, next);
            if (result) {
                res.status(httpStatus_1.default.OK).json(result);
            }
            else {
                res
                    .status(httpStatus_1.default.BAD_REQUEST)
                    .json({ message: "Invalid request ID" });
            }
        });
    }
    // ======================================================>
    getEvents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUseCase.getEvents(next);
            res.status(httpStatus_1.default.OK).json(result);
        });
    }
    // ======================================================>
    changeEventStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { requestId, action } = req.body;
            const result = yield this.adminUseCase.changeEventStatus(requestId, action, next);
            if (result) {
                res.status(httpStatus_1.default.OK).json(result);
            }
            else {
                res.status(httpStatus_1.default.BAD_REQUEST).json({ message: "Invalid event ID" });
            }
        });
    }
    // ======================================================>
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("admin_access_token", jwt_1.accessTokenOption);
                res.clearCookie("role", jwt_1.roleOptions);
                res.status(httpStatus_1.default.OK).json({ message: "Admin logout successful" });
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
            }
        });
    }
    // ======================================================>
    getReports(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.adminUseCase.getReports(next);
                if (result) {
                    res.status(httpStatus_1.default.OK).json(result);
                }
                else {
                    res.status(httpStatus_1.default.NO_CONTENT).json({ message: "No reports found" });
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(httpStatus_1.default.INTERNAL_SERVER_ERROR, error.message));
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
                    res.status(httpStatus_1.default.OK).json(result);
                }
                else {
                    res
                        .status(httpStatus_1.default.BAD_REQUEST)
                        .json({ message: "Invalid report ID" });
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(httpStatus_1.default.INTERNAL_SERVER_ERROR, "Report action failed"));
            }
        });
    }
    // ======================================================>
    dasboardData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.adminUseCase.dashBoardData(next);
            if (result) {
                res.status(httpStatus_1.default.OK).json(result);
            }
            else {
                res
                    .status(httpStatus_1.default.NO_CONTENT)
                    .json({ message: "No dashboard data available" });
            }
        });
    }
}
exports.AdminController = AdminController;
