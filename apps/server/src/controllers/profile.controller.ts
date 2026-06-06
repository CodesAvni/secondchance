import { Request, Response } from "express";
import { updateProfile } from "../services/profile.service";

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
    } = req.body;

    const result = await updateProfile(
      userId,
      bio,
      location,
      languages,
      accessibilityPreferences
    );

    res.json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
import { getProfile } from "../services/profile.service";

export const getUserProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const user = await getProfile(userId);

    res.json(user);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};