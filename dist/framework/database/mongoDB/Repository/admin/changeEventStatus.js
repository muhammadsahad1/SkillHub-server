export const changeEventStatus = async (requestId, status, eventModel) => {
    try {
        console.log(requestId);
        const event = await eventModel.findById(requestId);
        if (!event) {
            throw new Error("event is not founded");
        }
        event.approvalStatus = status;
        await event.save();
        return {
            success: true,
        };
    }
    catch (error) {
        console.log("error ->", error);
        return undefined;
    }
};
