import EventModel from "../../model/eventModel";
import { GroupModel } from "../../model/groupModel";
import PostModel from "../../model/postModel";
import userModel from "../../model/userModel";
export declare const getMonthlyData: (model: typeof PostModel | typeof userModel | typeof EventModel | typeof GroupModel) => Promise<any[]>;
