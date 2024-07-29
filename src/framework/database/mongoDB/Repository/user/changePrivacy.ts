import PrivacyModal from "../../model/privacyModel";
import { IprivacySettings } from "../../../../../commonEntities/entities/user";

export const changePrivacy = async (
  userId: string,
  isPrivacy: boolean,
  privacyModal: typeof PrivacyModal
):Promise<IprivacySettings | undefined> => {
  try {
    const updatePrivacySettings = await privacyModal
      .findOneAndUpdate(
        { userId },
        { isProfilePublic: isPrivacy },
        { new: true, upsert: true }
      )
      .exec();
    console.log("updatedPrivcy", updatePrivacySettings);
    return updatePrivacySettings;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; // Handle error as needed
  }
};
