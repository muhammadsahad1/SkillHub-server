export const getVerificationRequests = async (verificationRequestsModel) => {
    try {
        const result = await verificationRequestsModel.find({});
        return result;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined; // Handle error as needed
    }
};
