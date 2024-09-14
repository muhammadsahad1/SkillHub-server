export const getMonthlyData = async (model) => {
    try {
        return model.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: { month: "$month", year: "$year" },
                    count: { $sum: 1 }, // Count the documents for each month/year
                },
            },
            {
                $sort: { "_id.month": 1, "_id.year": 1 },
            },
        ]);
    }
    catch (error) {
        throw new Error(`Error fetching monthly data: ${error.message}`);
    }
};
