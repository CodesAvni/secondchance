import {prisma} from "../utils/prisma";
export const createOpportunity = async (
  employerId: string,
  data: {
    title: string;
    description: string;
    remote?: boolean;
    pay?: number;
    location?: string;
    accessibilitySupport?: string;
  }
) => {
  return prisma.opportunity.create({
    data: {
      title: data.title,
      description: data.description,
      remote: data.remote,
      pay: data.pay,
      location: data.location,
      accessibilitySupport: data.accessibilitySupport,
      employerId
    }
  });
};
export const getAllOpportunities = async () => {
  return prisma.opportunity.findMany({
    include: {
      employer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};
export const getOpportunityById = async (
  id: string
) => {
  return prisma.opportunity.findUnique({
    where: { id },

    include: {
      employer: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    }
  });
};
export const updateOpportunity = async (
  id: string,
  data: any
) => {
  return prisma.opportunity.update({
    where: { id },
    data
  });
};
export const deleteOpportunity = async (
  id: string
) => {
  return prisma.opportunity.delete({
    where: { id }
  });
};