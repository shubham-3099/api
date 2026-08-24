import prisma from "../lib/prisma.js";

export const createDish = async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const { name } = req.body;

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id: restaurantId,
      },
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    const existingDish = await prisma.dish.findUnique({
      where: {
        restaurantId_name: {
          restaurantId,
          name,
        },
      },
    });

    if (existingDish) {
      return res.status(409).json({
        success: false,
        message: "Dish already exists in this restaurant",
      });
    }

    const dish = await prisma.dish.create({
      data: {
        name,
        restaurantId,
      },
    });

    res.status(201).json({
      success: true,
      data: dish,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create dish",
    });
  }
};

export const getDishes = async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);

    const dishes = await prisma.dish.findMany({
      where: {
        restaurantId,
      },
    });

    res.status(200).json({
      success: true,
      data: dishes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dishes",
    });
  }
};

export const getDishById = async (req, res) => {
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

    res.status(200).json({
      success: true,
      data: dish,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dish",
    });
  }
};

export const updateDish = async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const dishId = Number(req.params.dishId);
    const { name } = req.body;

    const existingDish = await prisma.dish.findFirst({
      where: {
        id: dishId,
        restaurantId,
      },
    });

    if (!existingDish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found for this restaurant",
      });
    }

    const data = {};

    if (name !== undefined) {
      data.name = name;
    }

    const dish = await prisma.dish.update({
      where: {
        id: dishId,
      },
      data,
    });

    res.status(200).json({
      success: true,
      data: dish,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update dish",
    });
  }
};

export const deleteDish = async (req, res) => {
  try {
    const restaurantId = Number(req.params.restaurantId);
    const dishId = Number(req.params.dishId);

    const existingDish = await prisma.dish.findFirst({
      where: {
        id: dishId,
        restaurantId,
      },
    });

    if (!existingDish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found for this restaurant",
      });
    }

    await prisma.dish.delete({
      where: {
        id: dishId,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete dish",
    });
  }
};