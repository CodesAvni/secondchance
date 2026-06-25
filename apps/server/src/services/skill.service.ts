import { prisma } from "../utils/prisma";

export const createSkill = async (
  name: string,
  category: string
) => {
  const skill = await prisma.skill.create({
    data: {
      name,
      category,
    },
  });

  return skill;
};

export const getAllSkills = async () => {
  return await prisma.skill.findMany({
    orderBy: {
      name: "asc",
    },
  });
};
export const addSkillToUser = async (
  userId: string,
  skillId: string,
  experienceLevel: any
) => {
  return await prisma.userSkill.create({
    data: {
      userId,
      skillId,
      experienceLevel,
    },
  });
};
export const removeSkillFromUser = async (
  userId: string,
  skillId: string
) => {
  return await prisma.userSkill.delete({
    where: {
      userId_skillId: {
        userId,
        skillId,
      },
    },
  });
};
export const getUserSkills = async (
  userId: string
) => {
  return await prisma.userSkill.findMany({
    where: {
      userId,
    },
    include: {
      skill: true,
    },
  });
};