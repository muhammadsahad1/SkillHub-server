import { getMonthlyData } from "./getMonthlyData.js";
export const dashBoardData = async (postModel, groupModel, eventModel, usersModel) => {
    try {
        // Fetch counts for each model
        const postsCount = await postModel.countDocuments();
        const groupsCount = await groupModel.countDocuments();
        const eventsCount = await eventModel.countDocuments();
        const usersCount = await usersModel.countDocuments();
        // Fetch analytics data for each model
        const postData = await getMonthlyData(postModel);
        const groupData = await getMonthlyData(groupModel);
        const eventData = await getMonthlyData(eventModel);
        const userData = await getMonthlyData(usersModel);
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
};
