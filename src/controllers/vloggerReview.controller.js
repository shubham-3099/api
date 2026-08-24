import prisma from "../lib/prisma.js";

export const createVloggerReview = async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const dishId = Number(req.params.dishId);

    const {
      vloggerId,
      title,
      thumbnailUrl,
    } = req.body;

    const vlogger = await prisma.vlogger.findUnique({
      where: {
        id: vloggerId,
      },
    });

    if (!vlogger) {
      return res.status(404).json({
        success: false,
        message: "Vlogger not found",
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

    const review = await prisma.vloggerReview.create({
      data: {
        vloggerId,
        dishId,
        title,
        thumbnailUrl,
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
      message: "Failed to create vlogger review",
    });
  }
};

export const getVloggerReviews = async (req, res) => {
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

    const reviews = await prisma.vloggerReview.findMany({
      where: {
        dishId,
      },
      include: {
        vlogger: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            status: true,
          },
        },
        videos: true,
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
      message: "Failed to fetch vlogger reviews",
    });
  }
};

export const getVloggerReviewById = async (req, res) => {
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

    const review = await prisma.vloggerReview.findFirst({
      where: {
        id: reviewId,
        dishId,
      },
      include: {
        vlogger: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            status: true,
          },
        },
        videos: true,
      },
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Vlogger review not found for this dish",
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
      message: "Failed to fetch vlogger review",
    });
  }
};

export const updateVloggerReview = async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const dishId = Number(req.params.dishId);
    const reviewId = Number(req.params.reviewId);

    const {
      title,
      thumbnailUrl,
      status,
    } = req.body;

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

    const existingReview = await prisma.vloggerReview.findFirst({
      where: {
        id: reviewId,
        dishId,
      },
    });

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Vlogger review not found for this dish",
      });
    }

    const data = {};

    if (title !== undefined) {
      data.title = title;
    }

    if (thumbnailUrl !== undefined) {
      data.thumbnailUrl = thumbnailUrl;
    }

    if (status !== undefined) {
      data.status = status;
    }

    const review = await prisma.vloggerReview.update({
      where: {
        id: reviewId,
      },
      data,
    });

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update vlogger review",
    });
  }
};

export const deleteVloggerReview = async (req, res) => {
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

    const existingReview = await prisma.vloggerReview.findFirst({
      where: {
        id: reviewId,
        dishId,
      },
    });

    if (!existingReview) {
      return res.status(404).json({
        success: false,
        message: "Vlogger review not found for this dish",
      });
    }

    await prisma.vloggerReview.delete({
      where: {
        id: reviewId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete vlogger review",
    });
  }
};