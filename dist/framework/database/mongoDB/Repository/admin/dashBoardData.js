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
exports.dashBoardData = void 0;
const getMonthlyData_js_1 = require("./getMonthlyData.js");
const dashBoardData = (postModel, groupModel, eventModel, usersModel) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch counts for each model
        const postsCount = yield postModel.countDocuments();
        const groupsCount = yield groupModel.countDocuments();
        const eventsCount = yield eventModel.countDocuments();
        const usersCount = yield usersModel.countDocuments();
        // Fetch analytics data for each model
        const postData = yield (0, getMonthlyData_js_1.getMonthlyData)(postModel);
        const groupData = yield (0, getMonthlyData_js_1.getMonthlyData)(groupModel);
        const eventData = yield (0, getMonthlyData_js_1.getMonthlyData)(eventModel);
        const userData = yield (0, getMonthlyData_js_1.getMonthlyData)(usersModel);
        console.log("postDat ==>", postData);
        console.log("groupData ==>", groupData);
        console.log("eventData ==>", eventData);
        console.log("userData ==>", userData);
        // Return both counts and analytics data
        return {
            success: true,
            message: "Dashboard data fetched successfully",
            postsCount,
            groupsCount,
            eventsCount,
            usersCount,
            analyticsData: {
                postData,
                groupData,
                eventData,
                userData,
            },
        };
    }
    catch (error) {
        console.error("Error fetching dashboard data:", error.message);
        throw new Error(`Error fetching dashboard data: ${error.message}`);
    }
});
exports.dashBoardData = dashBoardData;
