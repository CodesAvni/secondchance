import cors from "cors";
import express from "express";
import authRoutes from "./routes/auth.routes";
import { protect } from "./middleware/auth.middleware";
import profileRoutes from "./routes/profile.routes";
import skillRoutes from "./routes/skill.routes";
import opportunityRoutes
from "./routes/opportunity.routes";
import applicationRoutes from "./routes/application.routes";
import path from "path";
import aiRoutes from "./routes/ai.routes";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/skills", skillRoutes);
app.use(
  "/opportunities",
  opportunityRoutes
);
app.use("/applications", applicationRoutes);
app.use(
"/uploads",
express.static(
path.join(__dirname,"../uploads")
)

);
app.use("/ai", aiRoutes);
app.get("/", (_req, res) => {
  res.send("SecondChance API Running");
});
app.get("/me", protect, (req, res) => {
  res.json({
    message: "Protected route works",
    user: (req as any).user,
  });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});