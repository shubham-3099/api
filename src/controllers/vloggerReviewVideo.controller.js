import prisma from "../lib/prisma.js";

export const createVloggerReviewVideo = async (req, res) => {
    const restaurantId = Number(req.params.restaurantId);
    const dishId = Number(req.params.dishId);
    const reviewId = Number(req.params.reviewId);

    const { platform, videoUrl } = req.body;

    const review = await prisma.vloggerReview.findFirst({
      where: {
        id: reviewId,
        dishId,
        dish: {
          restaurantId,
        },
      },
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Vlogger review not found for this dish",
      });
    }

    const video = await prisma.vloggerReviewVideo.create({
      data: {
        reviewId,
        platform,
        videoUrl,
      },
    });

    res.status(201).json({
      success: true,
      data: video,
    });
};

export const getVloggerReviewVideos = async (req, res) => {
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
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Vlogger review not found for this dish",
      });
    }

    const videos = await prisma.vloggerReviewVideo.findMany({
      where: {
        reviewId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: videos,
    });
};

export const getVloggerReviewVideoById = async (req, res) => {
    const restaurantId = Number(req.params.restaurantId);
    const dishId = Number(req.params.dishId);
    const reviewId = Number(req.params.reviewId);
    const videoId = Number(req.params.videoId);

    const review = await prisma.vloggerReview.findFirst({
      where: {
        id: reviewId,
        dishId,
        dish: {
          restaurantId,
        },
      },
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Vlogger review not found for this dish",
      });
    }

    const video = await prisma.vloggerReviewVideo.findFirst({
      where: {
        id: videoId,
        reviewId,
      },
    });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found for this review",
      });
    }

    res.status(200).json({
      success: true,
      data: video,
    });
};

export const updateVloggerReviewVideo = async (req, res) => {
    const restaurantId = Number(req.params.restaurantId);
    const dishId = Number(req.params.dishId);
    const reviewId = Number(req.params.reviewId);
    const videoId = Number(req.params.videoId);

    const { platform, videoUrl } = req.body;

    const review = await prisma.vloggerReview.findFirst({
      where: {
        id: reviewId,
        dishId,
        dish: {
          restaurantId,
        },
      },
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Vlogger review not found for this dish",
      });
    }

    const existingVideo = await prisma.vloggerReviewVideo.findFirst({
      where: {
        id: videoId,
        reviewId,
      },
    });

    if (!existingVideo) {
      return res.status(404).json({
        success: false,
        message: "Video not found for this review",
      });
    }

    const data = {};

    if (platform !== undefined) {
      data.platform = platform;
    }

    if (videoUrl !== undefined) {
      data.videoUrl = videoUrl;
    }

    const video = await prisma.vloggerReviewVideo.update({
      where: {
        id: videoId,
      },
      data,
    });

    res.status(200).json({
      success: true,
      data: video,
    });
};

export const deleteVloggerReviewVideo = async (req, res) => {
    const restaurantId = Number(req.params.restaurantId);
    const dishId = Number(req.params.dishId);
    const reviewId = Number(req.params.reviewId);
    const videoId = Number(req.params.videoId);

    const review = await prisma.vloggerReview.findFirst({
      where: {
        id: reviewId,
        dishId,
        dish: {
          restaurantId,
        },
      },
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Vlogger review not found for this dish",
      });
    }

    const existingVideo = await prisma.vloggerReviewVideo.findFirst({
      where: {
        id: videoId,
        reviewId,
      },
    });

    if (!existingVideo) {
      return res.status(404).json({
        success: false,
        message: "Video not found for this review",
      });
    }

    await prisma.vloggerReviewVideo.delete({
      where: {
        id: videoId,
      },
    });

    res.status(204).send();
};