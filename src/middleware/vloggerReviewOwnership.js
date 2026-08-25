import prisma from "../lib/prisma.js";

export const authorizeVloggerReviewOwnership = async (req, res, next) => {
  const restaurantId = Number(req.params.restaurantId);
  const dishId = Number(req.params.dishId);
  const reviewId = Number(req.params.reviewId);

  const review = await prisma.vloggerReview.findFirst({
    where: {
      id: reviewId,
      dishId,
      dish: {
        restaurantId,
      },
    },
    select: {
      id: true,
      vloggerId: true,
      dishId: true,
    },
  });

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Vlogger review not found",
    });
  }

  if (
    req.user.role !== "ADMIN" &&
    review.vloggerId !== req.user.vloggerId
  ) {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to access this review",
    });
  }

  req.vloggerReview = review;

  next();
};