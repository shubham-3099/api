import prisma from "../lib/prisma.js";

export const authorizeSubmissionOwnership = async (req, res, next) => {
  const submissionId = Number(req.params.submissionId);

  const submission = await prisma.vloggerSubmission.findUnique({
    where: {
      id: submissionId,
    },
    select: {
      id: true,
      vloggerId: true,
    },
  });

  if (!submission) {
    return res.status(404).json({
      success: false,
      message: "Vlogger submission not found",
    });
  }

  if (
    req.user.role !== "ADMIN" &&
    submission.vloggerId !== req.user.vloggerId
  ) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to access this submission",
    });
  }

  req.submission = submission;

  next();
};