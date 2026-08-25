import prisma from "../lib/prisma.js";

export const createVloggerReview = async (req, res) => {
  const restaurantId = Number(req.params.restaurantId);
  const dishId = Number(req.params.dishId);

  const {
    title,
    thumbnailUrl,
  } = req.body;

  const vloggerId = req.user.vloggerId;

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
      status: "APPROVED",
    },
  });

  res.status(201).json({
    success: true,
    data: review,
  });
};

export const getVloggerReviews = async (req, res) => {
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
};

export const getVloggerReviewById = async (req, res) => {
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
};

export const updateVloggerReview = async (req, res) => {
  const reviewId = Number(req.params.reviewId);

  const { title, thumbnailUrl } = req.body;

  const data = {};

  if (title !== undefined) {
    data.title = title;
  }

  if (thumbnailUrl !== undefined) {
    data.thumbnailUrl = thumbnailUrl;
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
};

export const deleteVloggerReview = async (req, res) => {
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
};