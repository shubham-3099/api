export const authorizeUserOwnership = (req, res, next) => {
  const requestedUserId = Number(req.params.id);

  if (req.user.role === "ADMIN") {
    return next();
  }

  if (
    req.user.role === "USER" &&
    req.user.userId === requestedUserId
  ) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "You are not allowed to access this user",
  });
};