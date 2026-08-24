import express from "express";
import userRoutes from "./routes/user.routes.js";
import vloggerRoutes from "./routes/vlogger.routes.js";
import vloggerPlatformRoutes from "./routes/vlogger-platform.routes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/vloggers", vloggerRoutes);
app.use("/api/vloggers", vloggerPlatformRoutes);
app.use("/api/restaurants", restaurantRoutes);

export default app;