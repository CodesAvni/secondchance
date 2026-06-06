import express from "express";
import authRoutes from "./routes/auth.routes";
import { protect } from "./middleware/auth.middleware";
import profileRoutes from "./routes/profile.routes";
const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.get("/", (_req, res) => {
  res.send("SecondChance API Running");
});
app.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route works",
    user: (req as any).user,
  });
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});