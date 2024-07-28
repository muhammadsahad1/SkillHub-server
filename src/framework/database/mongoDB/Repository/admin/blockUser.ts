import userModel from "../../model/userModel";

export const blockUser = async (id: string, userModels: typeof userModel) => {
  try {
    const user = await userModels.findById(id)
    let blockStatus = !user?.blocked


    const result = await userModels.findByIdAndUpdate(
      id,
      { blocked: blockStatus},
      { new: true }
    );
    return result;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
