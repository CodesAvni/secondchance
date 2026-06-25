import { Router } from "express";

import {
  createOpportunity,
  getAllOpportunities,
  getOpportunityById,
  updateOpportunity,deleteOpportunity
} from "../controllers/opportunity.controller";

import { protect }
from "../middleware/auth.middleware";
const router = Router();
router.post(
  "/",
  protect,
  createOpportunity
);

router.get(
  "/",
  getAllOpportunities
);

router.get(
  "/:id",
  getOpportunityById
);
router.put(
  "/:id",
  protect,
  updateOpportunity
);
router.delete(
  "/:id",
  protect,
  deleteOpportunity
);
export default router;