import { VerificationRequestModal } from "../../model/VerificationRequest.js";

export const getVerificationRequests = async (
  verificationRequestsModel: typeof VerificationRequestModal
) => {
  try {
    const result = await verificationRequestsModel
      .find({})
      .sort({ createdAt: -1 });
    return result;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; // Handle error as needed
  }
};
