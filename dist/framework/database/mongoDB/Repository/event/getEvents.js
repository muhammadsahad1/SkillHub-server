const EVENT_PER_PAGE = 3;
export const getEvents = async (pageNumber, eventModel, s3) => {
    try {
        const events = await eventModel
            .find({ approvalStatus: "Approved" })
            .skip((pageNumber - 1) * EVENT_PER_PAGE)
            .limit(EVENT_PER_PAGE)
            .sort({ createdAt: -1 })
            .exec();
        const eventsWithBannerImage = await Promise.all(events.map(async (event) => {
            const bannerImageUrl = await s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: event?.bannerName ? event?.bannerName : "",
            });
            return {
                ...event.toObject(),
                bannerImageUrl: bannerImageUrl,
            };
        }));
        return eventsWithBannerImage;
    }
    catch (error) {
        console.error(error);
        return [];
    }
};
