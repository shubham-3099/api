export const errorHandler = (error, req, res, next) => {
  console.error(error);

  // Prisma unique constraint violation
  if (error?.code === "P2002") {
    return res.status(409).json({
      success: false,
      message: "Resource already exists",
      fields: error.meta?.target ?? [],
    });
  }

  // Prisma record not found
  if (error?.code === "P2025") {
    return res.status(404).json({
      success: false,
      message: "Resource not found",
    });
  }

  // Unknown error
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};