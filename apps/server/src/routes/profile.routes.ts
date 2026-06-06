import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import {
  updateUserProfile,
  getUserProfile,
} from "../controllers/profile.controller";

const router = Router();

router.get("/", protect, getUserProfile);
router.put("/", protect, updateUserProfile);

export default router;