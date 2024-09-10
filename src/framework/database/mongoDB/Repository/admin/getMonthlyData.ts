import EventModel from "../../model/eventModel";
import { GroupModel } from "../../model/groupModel";
import PostModel from "../../model/postModel";
import userModel from "../../model/userModel";
export const getMonthlyData = async (
  model:
    | typeof PostModel
    | typeof userModel
    | typeof EventModel
    | typeof GroupModel
) => {
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
  } catch (error : any) {
    throw new Error(`Error fetching monthly data: ${error.message}`);
  }
};
