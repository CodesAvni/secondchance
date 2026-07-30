import {prisma} from "../utils/prisma";
import { ApplicationStatus } from "@prisma/client";
export const createApplication = async (
  applicantId: string,
  data: any
) => {


  const existingApplication =
    await prisma.application.findFirst({
      where: {
        applicantId,
        opportunityId: data.opportunityId
      }
    });


  if (existingApplication) {
    throw new Error(
      "Already applied to this opportunity"
    );
  }

  return prisma.application.create({
    data: {
      applicantId,
      opportunityId: data.opportunityId,
      audioIntroUrl: data.audioIntroUrl
    }
  });
};
export const getMyApplications = async (
  applicantId: string
) => {
  return prisma.application.findMany({
    where: {
      applicantId
    },
    include: {
      opportunity: true
    }
  });
};
export const getApplicationsForOpportunity = async (
  opportunityId: string
) => {
  return prisma.application.findMany({
    where: {
      opportunityId
    },
    include: {
      applicant: true
    }
  });
};
export const updateApplicationStatus = async (
  applicationId: string,
  status: ApplicationStatus
) => {
  return prisma.application.update({
    where: {
      id: applicationId
    },
    data: {
      status
    }
  });
};
export const getApplicationById = async (
  applicationId: string
) => {
  return prisma.application.findUnique({
    where: {
      id: applicationId
    },
    include: {
      opportunity: true
    }
  });
};