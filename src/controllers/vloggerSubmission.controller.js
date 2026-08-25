import prisma from "../lib/prisma.js";

export const createVloggerSubmission = async (req, res) => {
  try {
    const {
      vloggerId,
      platformId,
      restaurantName,
      address,
      city,
      dishName,
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

    const platform = await prisma.vloggerPlatform.findUnique({
      where: {
        id: platformId,
      },
    });

    if (!platform) {
      return res.status(404).json({
        success: false,
        message: "Vlogger platform not found",
      });
    }

    if (platform.vloggerId !== vloggerId) {
      return res.status(400).json({
        success: false,
        message: "Platform does not belong to this vlogger",
      });
    }

    const submission = await prisma.vloggerSubmission.create({
      data: {
        vloggerId,
        platformId,
        restaurantName,
        address,
        city,
        dishName,
        title,
        thumbnailUrl,
      },
    });

    res.status(201).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create vlogger submission",
    });
  }
};

export const getVloggerSubmissions = async (req, res) => {
  try {
    const submissions = await prisma.vloggerSubmission.findMany({
      include: {
        vlogger: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            status: true,
          },
        },
        platform: true,
        videos: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vlogger submissions",
    });
  }
};

export const getVloggerSubmissionById = async (req, res) => {
  try {
    const submissionId = Number(req.params.submissionId);

    const submission = await prisma.vloggerSubmission.findUnique({
      where: {
        id: submissionId,
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
        platform: true,
        videos: true,
      },
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Vlogger submission not found",
      });
    }

    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vlogger submission",
    });
  }
};

export const updateVloggerSubmission = async (req, res) => {
  try {
    const submissionId = Number(req.params.submissionId);

    const {
      restaurantName,
      address,
      city,
      dishName,
      title,
      thumbnailUrl,
    } = req.body;

    const existingSubmission =
      await prisma.vloggerSubmission.findUnique({
        where: {
          id: submissionId,
        },
      });

    if (!existingSubmission) {
      return res.status(404).json({
        success: false,
        message: "Vlogger submission not found",
      });
    }

    const data = {};

    if (restaurantName !== undefined) {
      data.restaurantName = restaurantName;
    }

    if (address !== undefined) {
      data.address = address;
    }

    if (city !== undefined) {
      data.city = city;
    }

    if (dishName !== undefined) {
      data.dishName = dishName;
    }

    if (title !== undefined) {
      data.title = title;
    }

    if (thumbnailUrl !== undefined) {
      data.thumbnailUrl = thumbnailUrl;
    }

    const submission = await prisma.vloggerSubmission.update({
      where: {
        id: submissionId,
      },
      data,
    });

    res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update vlogger submission",
    });
  }
};

export const deleteVloggerSubmission = async (req, res) => {
  try {
    const submissionId = Number(req.params.submissionId);

    const existingSubmission =
      await prisma.vloggerSubmission.findUnique({
        where: {
          id: submissionId,
        },
      });

    if (!existingSubmission) {
      return res.status(404).json({
        success: false,
        message: "Vlogger submission not found",
      });
    }

    await prisma.vloggerSubmission.delete({
      where: {
        id: submissionId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete vlogger submission",
    });
  }
};

export const approveVloggerSubmission = async (req, res) => {
  try {
    const submissionId = Number(req.params.submissionId);

    const submission = await prisma.vloggerSubmission.findUnique({
      where: {
        id: submissionId,
      },
      include: {
        videos: true,
        platform: true,
      },
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Vlogger submission not found",
      });
    }

    if (submission.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Only pending submissions can be approved",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Find existing restaurant
      let restaurant = await tx.restaurant.findFirst({
        where: {
          name: submission.restaurantName,
          address: submission.address,
          city: submission.city,
        },
      });

      // 2. Create restaurant if it doesn't exist
      if (!restaurant) {
        restaurant = await tx.restaurant.create({
          data: {
            name: submission.restaurantName,
            address: submission.address,
            city: submission.city,
          },
        });
      }

      // 3. Find existing dish
      let dish = await tx.dish.findUnique({
        where: {
          restaurantId_name: {
            restaurantId: restaurant.id,
            name: submission.dishName,
          },
        },
      });

      // 4. Create dish if it doesn't exist
      if (!dish) {
        dish = await tx.dish.create({
          data: {
            name: submission.dishName,
            restaurantId: restaurant.id,
          },
        });
      }

      // 5. Create VloggerReview
      const review = await tx.vloggerReview.create({
        data: {
          dishId: dish.id,
          vloggerId: submission.vloggerId,
          title: submission.title,
          thumbnailUrl: submission.thumbnailUrl,
          status: "APPROVED",
        },
      });

      // 6. Copy submission videos to VloggerReviewVideo
      if (submission.videos.length > 0) {
        await tx.vloggerReviewVideo.createMany({
          data: submission.videos.map((video) => ({
            reviewId: review.id,
            platform: video.platform,
            videoUrl: video.videoUrl,
          })),
        });
      }

      // 7. Mark submission as approved
      const updatedSubmission = await tx.vloggerSubmission.update({
        where: {
          id: submissionId,
        },
        data: {
          status: "APPROVED",
        },
      });

      return {
        restaurant,
        dish,
        review,
        submission: updatedSubmission,
      };
    });

    res.status(200).json({
      success: true,
      message: "Vlogger submission approved successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to approve vlogger submission",
    });
  }
};

export const rejectVloggerSubmission = async (req, res) => {
  try {
    const submissionId = Number(req.params.submissionId);

    const submission = await prisma.vloggerSubmission.findUnique({
      where: {
        id: submissionId,
      },
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Vlogger submission not found",
      });
    }

    if (submission.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Only pending submissions can be rejected",
      });
    }

    const updatedSubmission = await prisma.vloggerSubmission.update({
      where: {
        id: submissionId,
      },
      data: {
        status: "REJECTED",
      },
    });

    res.status(200).json({
      success: true,
      message: "Vlogger submission rejected successfully",
      data: updatedSubmission,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to reject vlogger submission",
    });
  }
};