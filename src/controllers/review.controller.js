import prisma from "../lib/prisma.js";

export const createReview = async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const dishId = Number(req.params.dishId);

    const { userId, rating, comment } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const dish = await prisma.dish.findFirst({
      where: {
        id: dishId,
        restaurantId,
      },
    });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found for this restaurant",
      });
    }

    const existingReview = await prisma.userReview.findUnique({
      where: {
        userId_dishId: {
          userId,
          dishId,
        },
      },
    });

    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: "User has already reviewed this dish",
      });
    }

    const review = await prisma.userReview.create({
      data: {
        userId,
        dishId,
        rating,
        comment,
      },
    });

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create review",
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const dishId = Number(req.params.dishId);

    const dish = await prisma.dish.findFirst({
      where: {
        id: dishId,
        restaurantId,
      },
    });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found for this restaurant",
      });
    }

    const reviews = await prisma.userReview.findMany({
      where: {
        dishId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
    });
  }
};

export const getReviewById = async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const dishId = Number(req.params.dishId);
    const reviewId = Number(req.params.reviewId);

    const dish = await prisma.dish.findFirst({
      where: {
        id: dishId,
        restaurantId,
      },
    });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found for this restaurant",
      });
    }

    const review = await prisma.userReview.findFirst({
      where: {
        id: reviewId,
        dishId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found for this dish",
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch review",
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const dishId = Number(req.params.dishId);
    const reviewId = Number(req.params.reviewId);

    const dish = await prisma.dish.findFirst({
      where: {
        id: dishId,
        restaurantId,
      },
    });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found for this restaurant",
      });
    }

    const existingReview = await prisma.userReview.findFirst({
      where: {
        id: reviewId,
        dishId,
      },
    });

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found for this dish",
      });
    }

    await prisma.userReview.delete({
      where: {
        id: reviewId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete review",
    });
  }
};