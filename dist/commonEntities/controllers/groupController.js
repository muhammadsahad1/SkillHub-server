import { ErrorHandler } from "../../usecases/middlewares/errorMiddleware";
//============================== Group Controller ================== \\
export class GroupController {
    groupUseCase;
    constructor(groupUseCase) {
        this.groupUseCase = groupUseCase;
    }
    async createGroup(req, res, next) {
        try {
            const groupData = req.body;
            const creatorId = req.user?.id;
            const result = await this.groupUseCase.createGroup(groupData, creatorId, req.file, next);
            if (result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    async getGroups(req, res, next) {
        try {
            const result = await this.groupUseCase.getGroups(next);
            if (result) {
                res.status(200).json({
                    success: true,
                    result,
                });
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    async joinGroup(req, res, next) {
        try {
            const { groupId } = req.body;
            const userId = req.user?.id;
            const result = await this.groupUseCase.joinGroup(groupId, userId, next);
            if (result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    async getGroup(req, res, next) {
        try {
            const { groupId } = req.query;
            const result = await this.groupUseCase.getGroup(groupId, next);
            if (result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    async sendMessage(req, res, next) {
        try {
            const { groupId, message } = req.body;
            const senderId = req.user?.id;
            const result = await this.groupUseCase.sendMessage(senderId, groupId, message, next);
            if (!result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    async messages(req, res, next) {
        try {
            const { groupId } = req.query;
            const result = await this.groupUseCase.messages(groupId, next);
            if (result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    async updateOnlineStatus(req, res, next) {
        try {
            console.log("Controo");
            const { groupId, userId, status } = req.body;
            const result = await this.groupUseCase.updateOnlineStatus(groupId, userId, status, next);
            if (result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
    async leaveGroup(req, res, next) {
        try {
            const { groupId } = req.body;
            const userId = req.user?.id;
            const result = await this.groupUseCase.leaveGroup(groupId, userId, next);
            if (result) {
                res.status(200).json(result);
            }
        }
        catch (error) {
            return next(new ErrorHandler(error.status, error.message));
        }
    }
}
