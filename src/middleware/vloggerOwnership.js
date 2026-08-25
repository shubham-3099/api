export const authorizeVloggerOwnership = (req, res, next) => {
  const requestedVloggerId = Number(req.params.vloggerId);

  if (
    req.user.role === "VLOGGER" &&
    req.user.vloggerId === requestedVloggerId
  ) {
    return next();
  }

  if (req.user.role === "ADMIN") {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "You are not allowed to access this vlogger",
  });
};