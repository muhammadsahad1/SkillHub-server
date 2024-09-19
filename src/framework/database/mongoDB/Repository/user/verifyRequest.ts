import { VerifyRequest } from "../../../../../commonEntities/entities/verificationRequest";
import userModel from "../../model/userModel";
import { VerificationRequestModal } from "../../model/VerificationRequest";

export const verifyRequest = async (
  userId: string,
  requestData: VerifyRequest,
  verificationRequestModal: typeof VerificationRequestModal,
  userModels: typeof userModel
) => {
  try {
    const user = await userModels.findById(userId)
    const email = user?.email
    if(user?.isRequested){
      return {
        success : false ,
        message : "You already requested"
      }
    }
    const { fullName, profession, company, website, proofLink } =
      requestData?.formData ;
    // creating the newObject for newRequest
    const newRequest = {
      userId,
      email,
      fullName,
      profession,
      company,
      website,
      proofLink,
    };

    const verificationRequest = await verificationRequestModal.create(
      newRequest
    );
    await userModels.findByIdAndUpdate(userId, {
      isRequested: true,
    });
    
    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};