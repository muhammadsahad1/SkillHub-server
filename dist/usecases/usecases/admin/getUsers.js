export const getUsers = async (adminRepository, next) => {
    const users = await adminRepository.getUsers();
    return users;
};
