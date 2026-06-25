import { Router } from "express";
import {
  createNewSkill,
  getSkills,
  addUserSkill,
  deleteUserSkill,
  getCurrentUserSkills,
} from "../controllers/skill.controller";
import { protect } from "../middleware/auth.middleware";
const router = Router();

router.post("/", createNewSkill);
router.get("/", getSkills);
router.post(
  "/user",
  protect,
  addUserSkill
);
router.get(
  "/user",
  protect,
  getCurrentUserSkills
);
router.delete(
  "/user/:skillId",
  protect,
  deleteUserSkill
);

export default router;