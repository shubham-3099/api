export const requirePendingSubmission = (req, res, next) => {
  if (req.submission.status !== "PENDING") {
    return res.status(400).json({
      success: false,
      message: "Only pending submissions can be modified",
    });
  }

  next();
};