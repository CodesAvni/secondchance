import * as opportunityService from "../services/opportunity.service";
export const createOpportunity = async (
  req: any,
  res: any
) => {
  try {
    console.log("req.user =", req.user);
    const opportunity =
      await opportunityService.createOpportunity(
        req.user.userId,
        req.body
      );

    res.status(201).json(opportunity);

  } catch (error) {
    res.status(500).json({
      message: "Failed to create opportunity"
    });
  }
};
export const getAllOpportunities = async (
  req: any,
  res: any
) => {
  try {
    const opportunities =
      await opportunityService.getAllOpportunities();

    res.json(opportunities);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch opportunities"
    });
  }
};
export const getOpportunityById = async (
  req: any,
  res: any
) => {
  try {
    const opportunity =
      await opportunityService.getOpportunityById(
        req.params.id
      );

    if (!opportunity) {
      return res.status(404).json({
        message: "Opportunity not found"
      });
    }

    res.json(opportunity);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch opportunity"
    });
  }
};
export const updateOpportunity = async (
  req: any,
  res: any
) => {
  try {
    const opportunity =
      await opportunityService.getOpportunityById(
        req.params.id
      );

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

    const updatedOpportunity =
      await opportunityService.updateOpportunity(
        req.params.id,
        req.body
      );

    res.json(updatedOpportunity);

  } catch (error) {
    res.status(500).json({
      message: "Failed to update opportunity"
    });
  }
};
export const deleteOpportunity = async (
  req: any,
  res: any
) => {
  try {
    const opportunity =
      await opportunityService.getOpportunityById(
        req.params.id
      );

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

    await opportunityService.deleteOpportunity(
      req.params.id
    );

    res.json({
      message: "Opportunity deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete opportunity"
    });
  }
};