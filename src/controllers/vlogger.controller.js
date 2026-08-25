import prisma from "../lib/prisma.js";

export const createVlogger = async (req, res) => {
  const { name, email, avatarUrl, status } = req.body;

  const vlogger = await prisma.vlogger.create({
    data: {
      name,
      email,
      avatarUrl,
      status,
    },
  });

  res.status(201).json({
    success: true,
    data: vlogger,
  });
};

export const getVloggers = async (req, res) => {
  const vloggers = await prisma.vlogger.findMany();

  res.status(200).json({
    success: true,
    data: vloggers,
  });
};

export const getVloggerById = async (req, res) => {
  const id = Number(req.params.id);

  const vlogger = await prisma.vlogger.findUnique({
    where: {
      id,
    },
  });

  if (!vlogger) {
    return res.status(404).json({
      success: false,
      message: "Vlogger not found",
    });
  }

  res.status(200).json({
    success: true,
    data: vlogger,
  });
};

export const updateVlogger = async (req, res) => {
  const id = Number(req.params.id);
  const { name, email, avatarUrl, status } = req.body;

  const data = {};

  if (name !== undefined) data.name = name;
  if (email !== undefined) data.email = email;
  if (avatarUrl !== undefined) data.avatarUrl = avatarUrl;
  if (status !== undefined) data.status = status;

  const vlogger = await prisma.vlogger.update({
    where: {
      id,
    },
    data,
  });

  res.status(200).json({
    success: true,
    data: vlogger,
  });
};

export const deleteVlogger = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.vlogger.delete({
    where: {
      id,
    },
  });

  res.status(204).send();
};