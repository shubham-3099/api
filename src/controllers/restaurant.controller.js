import prisma from "../lib/prisma.js";

export const createRestaurant = async (req, res) => {
  const { name, address, city, latitude, longitude } = req.body;

  const restaurant = await prisma.restaurant.create({
    data: {
      name,
      address,
      city,
      latitude,
      longitude,
    },
  });

  res.status(201).json({
    success: true,
    data: restaurant,
  });
};

export const getRestaurants = async (req, res) => {
  const restaurants = await prisma.restaurant.findMany();

  res.status(200).json({
    success: true,
    data: restaurants,
  });
};

export const getRestaurantById = async (req, res) => {
  const id = Number(req.params.id);

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id,
    },
  });

  if (!restaurant) {
    return res.status(404).json({
      success: false,
      message: "Restaurant not found",
    });
  }

  res.status(200).json({
    success: true,
    data: restaurant,
  });
};

export const updateRestaurant = async (req, res) => {
  const id = Number(req.params.id);
  const { name, address, city, latitude, longitude } = req.body;

  const data = {};

  if (name !== undefined) data.name = name;
  if (address !== undefined) data.address = address;
  if (city !== undefined) data.city = city;
  if (latitude !== undefined) data.latitude = latitude;
  if (longitude !== undefined) data.longitude = longitude;

  const restaurant = await prisma.restaurant.update({
    where: {
      id,
    },
    data,
  });

  res.status(200).json({
    success: true,
    data: restaurant,
  });
};

export const deleteRestaurant = async (req, res) => {
  const id = Number(req.params.id);

  await prisma.restaurant.delete({
    where: {
      id,
    },
  });

  res.status(204).send();
};