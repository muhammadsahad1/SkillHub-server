import { DashboardData } from "../../../../../commonEntities/entities/dashBoardData";
import EventModel from "../../model/eventModel";
import { GroupModel } from "../../model/groupModel";
import PostModel from "../../model/postModel";
import userModel from "../../model/userModel";
export declare const dashBoardData: (postModel: typeof PostModel, groupModel: typeof GroupModel, eventModel: typeof EventModel, usersModel: typeof userModel) => Promise<DashboardData | void>;
