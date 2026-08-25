import prisma from "../lib/prisma.js";

export const requireVerifiedVlogger = async (req, res, next) => {
  if (req.user?.role !== "VLOGGER") {
    return res.status(403).json({
      success: false,
      message: "Vlogger access required",
    });
  }

  const vlogger = await prisma.vlogger.findUnique({
    where: {
      id: req.user.vloggerId,
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!vlogger) {
    return res.status(404).json({
      success: false,
      message: "Vlogger profile not found",
    });
  }

  if (vlogger.status !== "VERIFIED") {
    return res.status(403).json({
      success: false,
      message: "Vlogger account is not verified",
    });
  }

  req.vlogger = vlogger;

  next();
};