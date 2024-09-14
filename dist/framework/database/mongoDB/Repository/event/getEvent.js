export const getEvent = async (eventId, eventModel) => {
    try {
        const event = await eventModel.findById(eventId);
        return event || null;
    }
    catch (error) {
        console.log(error);
    }
};
