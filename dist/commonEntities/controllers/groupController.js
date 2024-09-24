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
exports.GroupController = void 0;
const errorMiddleware_1 = require("../../usecases/middlewares/errorMiddleware");
//============================== Group Controller ================== \\
class GroupController {
    constructor(groupUseCase) {
        this.groupUseCase = groupUseCase;
    }
    createGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const groupData = req.body;
                const creatorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield this.groupUseCase.createGroup(groupData, creatorId, req.file, next);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    getGroups(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.groupUseCase.getGroups(next);
                if (result) {
                    res.status(200).json({
                        success: true,
                        result,
                    });
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    joinGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { groupId } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield this.groupUseCase.joinGroup(groupId, userId, next);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    getGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupId } = req.query;
                const result = yield this.groupUseCase.getGroup(groupId, next);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    sendMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { groupId, message } = req.body;
                const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield this.groupUseCase.sendMessage(senderId, groupId, message, next);
                if (!result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    messages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { groupId } = req.query;
                const result = yield this.groupUseCase.messages(groupId, next);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    updateOnlineStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Controo");
                const { groupId, userId, status } = req.body;
                const result = yield this.groupUseCase.updateOnlineStatus(groupId, userId, status, next);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
    leaveGroup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { groupId } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                const result = yield this.groupUseCase.leaveGroup(groupId, userId, next);
                if (result) {
                    res.status(200).json(result);
                }
            }
            catch (error) {
                return next(new errorMiddleware_1.ErrorHandler(error.status, error.message));
            }
        });
    }
}
exports.GroupController = GroupController;
