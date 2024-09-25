import { IadminRepository } from "../../interface/repositoryInterface/adminRepository.js";

export const blockUser = async (
  id: string,
  adminRepository: IadminRepository
) => {
  const user = await adminRepository.blockUser(id);

  if (user.blocked === true) {
    return {
      success: true,
      status: "blocked",
      message: "Blocked user successfully",
    };
  } else {
    return {
      success: true,
      status: "unBlocked",
      message: "Unblocked user successfully",
    };
  }
};
