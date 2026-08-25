import prisma from "../lib/prisma.js";

export const createUser = async (req, res) => {
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
};

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json({
    success: true,
    data: users,
  });
};

export const getUserById = async (req, res) => {
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
};

export const updateUser = async (req, res) => {
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
};

export const deleteUser = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.user.delete({
    where: {
      id,
    },
  });

  res.status(204).send();
};