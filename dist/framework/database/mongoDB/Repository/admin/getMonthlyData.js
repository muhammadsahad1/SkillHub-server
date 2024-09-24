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
exports.getMonthlyData = void 0;
const getMonthlyData = (model) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return model.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: { month: "$month", year: "$year" },
                    count: { $sum: 1 }, // Count the documents for each month/year
                },
            },
            {
                $sort: { "_id.month": 1, "_id.year": 1 },
            },
        ]);
    }
    catch (error) {
        throw new Error(`Error fetching monthly data: ${error.message}`);
    }
});
exports.getMonthlyData = getMonthlyData;
