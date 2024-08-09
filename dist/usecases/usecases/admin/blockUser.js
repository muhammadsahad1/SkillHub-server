export const blockUser = async (id, adminRepository) => {
    const user = await adminRepository.blockUser(id);
    if (user.blocked === true) {
        return {
            success: true,
            status: "blocked",
            message: "Blocked user successfully",
        };
    }
    else {
        return {
            success: true,
            status: "unBlocked",
            message: "Unblocked user successfully",
        };
    }
};
