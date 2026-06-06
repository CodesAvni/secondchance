import { prisma } from "../utils/prisma";

export const updateProfile = async (
  userId: string,
  bio: string,
  location: string,
  languages: string[],
  accessibilityPreferences: string[]
) => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      bio,
      location,
      languages,
      accessibilityPreferences,
      onboardingCompleted: true,
    },
  });

  return user;
};

export const getProfile = async (
  userId: string
) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};