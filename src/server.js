import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});