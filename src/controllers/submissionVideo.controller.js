import prisma from "../lib/prisma.js";

export const createSubmissionVideo = async (req, res) => {
  try {
    const submissionId = Number(req.params.submissionId);

    const { platform, videoUrl } = req.body;

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

    const existingVideo = await prisma.submissionVideo.findUnique({
      where: {
        submissionId_platform: {
          submissionId,
          platform,
        },
      },
    });

    if (existingVideo) {
      return res.status(409).json({
        success: false,
        message: "Video for this platform already exists for this submission",
      });
    }

    const video = await prisma.submissionVideo.create({
      data: {
        submissionId,
        platform,
        videoUrl,
      },
    });

    res.status(201).json({
      success: true,
      data: video,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create submission video",
    });
  }
};

export const getSubmissionVideos = async (req, res) => {
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

    const videos = await prisma.submissionVideo.findMany({
      where: {
        submissionId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch submission videos",
    });
  }
};

export const getSubmissionVideoById = async (req, res) => {
  try {
    const submissionId = Number(req.params.submissionId);
    const videoId = Number(req.params.videoId);

    const video = await prisma.submissionVideo.findFirst({
      where: {
        id: videoId,
        submissionId,
      },
    });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Submission video not found",
      });
    }

    res.status(200).json({
      success: true,
      data: video,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch submission video",
    });
  }
};

export const updateSubmissionVideo = async (req, res) => {
  try {
    const submissionId = Number(req.params.submissionId);
    const videoId = Number(req.params.videoId);

    const { platform, videoUrl } = req.body;

    const existingVideo = await prisma.submissionVideo.findFirst({
      where: {
        id: videoId,
        submissionId,
      },
    });

    if (!existingVideo) {
      return res.status(404).json({
        success: false,
        message: "Submission video not found",
      });
    }

    const data = {};

    if (platform !== undefined) {
      data.platform = platform;
    }

    if (videoUrl !== undefined) {
      data.videoUrl = videoUrl;
    }

    const video = await prisma.submissionVideo.update({
      where: {
        id: videoId,
      },
      data,
    });

    res.status(200).json({
      success: true,
      data: video,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update submission video",
    });
  }
};

export const deleteSubmissionVideo = async (req, res) => {
  try {
    const submissionId = Number(req.params.submissionId);
    const videoId = Number(req.params.videoId);

    const existingVideo = await prisma.submissionVideo.findFirst({
      where: {
        id: videoId,
        submissionId,
      },
    });

    if (!existingVideo) {
      return res.status(404).json({
        success: false,
        message: "Submission video not found",
      });
    }

    await prisma.submissionVideo.delete({
      where: {
        id: videoId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete submission video",
    });
  }
};