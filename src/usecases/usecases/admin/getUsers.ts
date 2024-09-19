import { IadminRepository } from "../../interface/repositoryInterface/adminRepository.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const getUsers = async (
  adminRepository: IadminRepository,
  next: Next
) => {
  const users = await adminRepository.getUsers()
  return users
};
