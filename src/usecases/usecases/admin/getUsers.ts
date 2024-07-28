import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
import { Next } from "../../../framework/types/serverPackageType";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const getUsers = async (
  adminRepository: IadminRepository,
  next: Next
) => {
  const users = await adminRepository.getUsers()
  return users
};
