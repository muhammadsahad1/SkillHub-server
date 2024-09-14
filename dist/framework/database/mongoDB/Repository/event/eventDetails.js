export const eventDetails = async (eventId, eventModel, s3Operations) => {
    try {
        const event = await eventModel.findById(eventId);
        if (!event) {
            return null; // Return null if the event does not exist
        }
        // retrive the bannerImageUrl
        const bannerImageUrl = await s3Operations.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: event?.bannerName,
        });
        if (!bannerImageUrl) {
            return null;
        }
        const eventDetails = {
            ...event?.toObject(),
            bannerImageUrl,
        };
        console.log("eveDetails =>", eventDetails);
        return eventDetails;
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
};
