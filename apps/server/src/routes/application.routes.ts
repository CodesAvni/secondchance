import { Router } from "express";
import { protect } from "../middleware/auth.middleware";

import {
  createApplication,
  getMyApplications,
  getApplicationsForOpportunity,
  updateApplicationStatus
} from "../controllers/application.controller";
const router = Router();

router.post(
  "/",
  protect,
  createApplication
);
router.get(
  "/me",
  protect,
  getMyApplications
);
router.get(
  "/opportunity/:id",
  protect,
  getApplicationsForOpportunity
);
router.patch(
  "/:id/status",
  protect,
  updateApplicationStatus
);
export default router;