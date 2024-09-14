export const changeStatus = async (eventId, status, eventModel) => {
    try {
        await eventModel.findByIdAndUpdate(eventId, {
            eventStatus: status
        });
        return {
            success: true
        };
    }
    catch (error) {
        return {
            success: false
        };
    }
};
