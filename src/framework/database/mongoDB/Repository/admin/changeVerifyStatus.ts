import userModel from "../../model/userModel.js";
import { VerificationRequestModal } from "../../model/VerificationRequest.js";

export const changeVerifyStatus = async (
  requestId: string,
  status: "Pending" | "Approved" | "Rejected",
  userModal: typeof userModel,
  verifyRequstModal: typeof VerificationRequestModal
) => {
  try {
    const request = await verifyRequstModal.findById(requestId);
    if (!request) {
      throw new Error(`Verification request with ID ${requestId} not found`);
    }
    //  changing the status of request status
    request.status = status;
    await request.save();

    const userId = request.userId;
    // updating the user modal for proffesional account
    const user = await userModal.findByIdAndUpdate(userId).exec();
    if (!user) {
      throw new Error(`User with ID ${request.userId} not found`);
    }

    if (status === "Approved") {
      user.isProfessional = true;
      user.professionalBadge = true;
      user.verificationStatus = status;
      user.proofLink = request.proofLink;
    } else {
      user.verificationStatus = status;
    }
    // save the all update
    await user.save();

    return {
      success : true 
    }

  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; // Handle error as needed
  }
};
