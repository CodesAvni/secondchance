import { Request, Response } from "express";
import {
  createSkill,
  getAllSkills,
  addSkillToUser,
  removeSkillFromUser,
  getUserSkills,
} from "../services/skill.service";
export const createNewSkill = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, category } = req.body;

    const skill = await createSkill(
      name,
      category
    );

    res.status(201).json(skill);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const getSkills = async (
  req: Request,
  res: Response
) => {
  try {
    const skills = await getAllSkills();

    res.json(skills);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const addUserSkill = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const {
      skillId,
      experienceLevel,
    } = req.body;

    const result =
      await addSkillToUser(
        userId,
        skillId,
        experienceLevel
      );

    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const deleteUserSkill = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const skillId = String(req.params.skillId);

    await removeSkillFromUser(
      userId,
      skillId
    );

    res.json({
      message: "Skill removed successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export const getCurrentUserSkills = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.userId;

    const skills =
      await getUserSkills(userId);

    res.json(skills);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};