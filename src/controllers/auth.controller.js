import bcrypt from "bcrypt";

import prisma from "../lib/prisma.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingAccount = await prisma.account.findUnique({
    where: {
      email,
    },
  });

  if (existingAccount) {
    return res.status(409).json({
      success: false,
      message: "Email already registered",
    });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const account = await prisma.account.create({
    data: {
      email,
      passwordHash,
      role: "USER",

      user: {
        create: {
          name,
        },
      },
    },

    include: {
      user: true,
    },
  });

  const token = generateToken({
    accountId: account.id,
    userId: account.user.id,
    role: account.role,
  });

  res.status(201).json({
    success: true,
    data: {
      user: account.user,
      token,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const account = await prisma.account.findUnique({
    where: {
      email,
    },

    include: {
      user: true,
      vlogger: true,
    },
  });

  if (!account) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  const passwordMatches = await bcrypt.compare(
    password,
    account.passwordHash
  );

  if (!passwordMatches) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

    const tokenPayload = {
        accountId: account.id,
        role: account.role,
    };

    if (account.user) {
    tokenPayload.userId = account.user.id;
    }

    if (account.vlogger) {
    tokenPayload.vloggerId = account.vlogger.id;
    }

    const token = generateToken(tokenPayload);

  res.status(200).json({
    success: true,
    data: {
      token,
      role: account.role,
      user: account.user,
      vlogger: account.vlogger,
    },
  });
};