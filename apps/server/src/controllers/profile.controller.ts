import { Request, Response } from "express";
import { updateProfile } from "../services/profile.service";
import { prisma } from "../utils/prisma";
export const updateUserProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const {
  bio,
  location,
  languages,
  accessibilityPreferences,
  preferredLanguage,
  communicationPreference,
  workPreference,
} = req.body;

   const result = await updateProfile(
  userId,
  bio,
  location,
  languages,
  accessibilityPreferences,
  preferredLanguage,
  communicationPreference,
  workPreference
);

    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
import { getProfile } from "../services/profile.service";

// Inside profile.controller.ts (Example)
export const getUserProfile = async (req: any, res: any) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId: req.user.userId }
    });
    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};