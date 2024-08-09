export const changePrivacy = async (userId, isPrivacy, privacyModal) => {
    try {
        const updatePrivacySettings = await privacyModal
            .findOneAndUpdate({ userId }, { isProfilePublic: isPrivacy }, { new: true, upsert: true })
            .exec();
        console.log("updatedPrivcy", updatePrivacySettings);
        return updatePrivacySettings;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined; // Handle error as needed
    }
};
