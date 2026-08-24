import prisma from "./lib/prisma.js";

async function testDatabase() {
  try {
    await prisma.$connect();

    console.log("Database connected successfully");

    const result = await prisma.restaurant.count();

    console.log("Restaurant count:", result);
  } catch (error) {
    console.error("Database connection failed:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();