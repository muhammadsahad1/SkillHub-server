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
exports.AdminUseCase = void 0;
const index_js_1 = require("./admin/index.js");
// ================================= Admin user cases ================================= \\
class AdminUseCase {
    constructor(adminRepostory, Jwt, hashPassword, sendEmail, s3, io) {
        this.adminRepostory = adminRepostory;
        this.Jwt = Jwt;
        this.hashPassword = hashPassword;
        this.sendEmail = sendEmail;
        this.s3 = s3;
        this.io = io;
    }
    // ===================================================================>
    adminLogin(email, password, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.adminLogin)(email, password, this.Jwt, this.hashPassword, this.adminRepostory, next);
            return result;
        });
    }
    // ===================================================================>
    getUsers(next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.getUsers)(this.adminRepostory, next);
            return result;
        });
    }
    // ===================================================================>
    getVerificationRequests(next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.getVerificationRequests)(this.adminRepostory, next);
            return result;
        });
    }
    changeVerifyStatus(requesId, status, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.changeVerifyStatus)(requesId, status, this.adminRepostory, this.io, next);
            return result;
        });
    }
    // ===================================================================>
    getEvents(next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getEvents)(next, this.adminRepostory);
        });
    }
    // ===================================================================>
    changeEventStatus(requestId, action, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.changeEventsStatus)(requestId, action, this.adminRepostory, next);
        });
    }
    // ===================================================================>
    blockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, index_js_1.blockUser)(id, this.adminRepostory);
            return result;
        });
    }
    // ===================================================================>
    getReports(next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getReports)(next, this.adminRepostory, this.s3);
        });
    }
    reportAction(reportId, status, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.reportAction)(reportId, status, this.adminRepostory, next);
        });
    }
    dashBoardData(next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.dashBoardData)(this.adminRepostory, next);
        });
    }
}
exports.AdminUseCase = AdminUseCase;
