import prisma from "../lib/prisma.js";

export const createVloggerPlatform = async (req, res) => {
  try {
    const vloggerId = Number(req.params.vloggerId);
    const { platform, profileUrl } = req.body;

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

    const vloggerPlatform = await prisma.vloggerPlatform.create({
      data: {
        vloggerId,
        platform,
        profileUrl,
      },
    });

    res.status(201).json({
      success: true,
      data: vloggerPlatform,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create vlogger platform",
    });
  }
};

export const getVloggerPlatforms = async (req, res) => {
  try {
    const vloggerId = Number(req.params.vloggerId);

    const platforms = await prisma.vloggerPlatform.findMany({
      where: {
        vloggerId,
      },
    });

    res.status(200).json({
      success: true,
      data: platforms,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch platforms",
    });
  }
};

export const getVloggerPlatformById = async (req, res) => {
  try {
    const vloggerId = Number(req.params.vloggerId);
    const platformId = Number(req.params.platformId);

    const platform = await prisma.vloggerPlatform.findFirst({
      where: {
        id: platformId,
        vloggerId,
      },
    });

    if (!platform) {
      return res.status(404).json({
        success: false,
        message: "Platform not found for this vlogger",
      });
    }

    res.status(200).json({
      success: true,
      data: platform,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch platform",
    });
  }
};

export const updateVloggerPlatform = async (req, res) => {
  try {
    const vloggerId = Number(req.params.vloggerId);
    const platformId = Number(req.params.platformId);
    const { platform, profileUrl } = req.body;

    const data = {};

    if (platform !== undefined) data.platform = platform;
    if (profileUrl !== undefined) data.profileUrl = profileUrl;

    const existingPlatform = await prisma.vloggerPlatform.findFirst({
      where: {
        id: platformId,
        vloggerId,
      },
    });

    if (!existingPlatform) {
      return res.status(404).json({
        success: false,
        message: "Platform not found for this vlogger",
      });
    }

    const updatedPlatform = await prisma.vloggerPlatform.update({
      where: {
        id: platformId,
      },
      data,
    });

    res.status(200).json({
      success: true,
      data: updatedPlatform,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update platform",
    });
  }
};

export const deleteVloggerPlatform = async (req, res) => {
  try {
    const vloggerId = Number(req.params.vloggerId);
    const platformId = Number(req.params.platformId);

    const existingPlatform = await prisma.vloggerPlatform.findFirst({
      where: {
        id: platformId,
        vloggerId,
      },
    });

    if (!existingPlatform) {
      return res.status(404).json({
        success: false,
        message: "Platform not found for this vlogger",
      });
    }

    await prisma.vloggerPlatform.delete({
      where: {
        id: platformId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete platform",
    });
  }
};