export const getEvents = async (eventModel, userModels) => {
  try {
    const result = await eventModel.find({}).sort({ createdAt: -1 });
    if (!result) {
      return [];
    }
    // retriving the userName with events
    const userNameWithEvent = await Promise.all(
      result.map(async (event) => {
        const user = await userModels.findById(event.createdBy).select("name");
        return {
          ...event.toObject(),
          userName: user?.name,
        };
      })
    );
    console.log("result ===>", userNameWithEvent);
    return userNameWithEvent;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
