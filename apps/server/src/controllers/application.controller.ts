import * as applicationService from "../services/application.service";
import * as opportunityService
from "../services/opportunity.service";
export const createApplication = async (
  req: any,
  res: any
) => {
  try {
    const application =
      await applicationService.createApplication(
        req.user.userId,
        req.body
      );

    res.status(201).json(application);

  } catch (error) {
    res.status(500).json({
      message: "Failed to create application"
    });
  }
};
export const getMyApplications = async (
  req: any,
  res: any
) => {
  try {

    const applications =
      await applicationService.getMyApplications(
        req.user.userId
      );

    res.json(applications);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applications"
    });
  }
};
export const getApplicationsForOpportunity = async (
  req: any,
  res: any
) => {
  try {

    const opportunity =
      await opportunityService.getOpportunityById(
        req.params.id
      );
console.log("Opportunity employerId:", opportunity?.employerId);
console.log("req.user:", req.user);
    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found"
      });
    }

    if (
      opportunity.employerId !==
      req.user.userId
    ) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    const applications =
      await applicationService.getApplicationsForOpportunity(
        req.params.id
      );

    res.json(applications);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applications"
    });
  }
};
export const updateApplicationStatus = async (
  req: any,
  res: any
) => {
  try {

    const application =
      await applicationService.getApplicationById(
        req.params.id
      );

    if (!application) {
      return res.status(404).json({
        message: "Application not found"
      });
    }
    if (
      application.opportunity.employerId !==
      req.user.userId
    ) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    const updatedApplication =
      await applicationService.updateApplicationStatus(
        req.params.id,
        req.body.status
      );

    res.json(updatedApplication);

  } catch (error) {
    res.status(500).json({
      message: "Failed to update application status"
    });
  }
};