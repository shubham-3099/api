import prisma from "../lib/prisma.js";

export const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

export const getUsers = async (req, res) => {
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
};

export const getUserById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { name, email } = req.body;

    const data = {};

    if (name !== undefined) {
      data.name = name;
    }

    if (email !== undefined) {
      data.email = email;
    }

    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update user",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
};