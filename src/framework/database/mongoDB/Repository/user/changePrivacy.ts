import userModel from "../../model/userModel.js";

export const changePrivacy = async (
  userId: string,
  isPrivacy: boolean,
  userModelS: typeof userModel
) => {
  try {
    console.log("status of privacy ==>", isPrivacy);

    const updatePrivacySettings = await userModelS.findOneAndUpdate(
      { _id: userId },
      { accountPrivacy: isPrivacy },
      { new: true }
    );

    console.log("updatedPrivacy", updatePrivacySettings);
    return updatePrivacySettings;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Error updating profile"); // Throwing the error to handle it appropriately in the caller function
  }
};
