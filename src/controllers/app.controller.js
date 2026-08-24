import prisma from "../lib/prisma.js";

export const getUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
        success: false,
        message: "Failed to fetch users",
        });
  }
}