import { StimType, StimWeights } from "../types/stimuli";

export const STIM_TYPES: StimType[] = [
  "Zoning",
  "Property Assessments",
  "Population Growth",
  "Planning",
  "New Developments",
  "Macro-Economic",
  "Litigation",
  "Infrastructure",
  "Incentives",
];

export const STIM_INFLUENCES: StimWeights = {
  Infrastructure: {
    weight: 0.95,
    rationale:
      "The backbone of emerging markets — transportation, utilities, broadband, and civic investments drive accessibility, desirability, and private capital inflow.",
  },
  "New Developments": {
    weight: 0.92,
    rationale:
      "Active or recent approvals indicate institutional confidence, policy alignment, and impending private capital deployment — among the strongest real-time indicators of market emergence.",
  },
  "Population Growth": {
    weight: 0.9,
    rationale:
      "Population inflow, job creation, and household formation directly drive absorption, rents, and price pressure.",
  },
  Zoning: {
    weight: 0.82,
    rationale:
      "Determines buildable density, permitted uses, and flexibility — core to value unlocking. Favorable or adaptive zoning often precedes development booms.",
  },
  Incentives: {
    weight: 0.75,
    rationale:
      "PILOTs, abatements, or tax credits catalyze risk-taking and project feasibility, especially in transitional areas.",
  },
  Planning: {
    weight: 0.68,
    rationale:
      "Long-term master plans, TOD overlays, and redevelopment zones signal institutional alignment but take time to materialize.",
  },
  "Macro-Economic": {
    weight: 0.6,
    rationale:
      "Interest rates, inflation, and national capital flows set the environment, but local effects can vary. Acts as a 'wind or drag,' not a sole determinant.",
  },
  "Property Assessments": {
    weight: 0.45,
    rationale:
      "Reflect lagging indicators of market maturity and fiscal stress; can influence developer behavior but less predictive of emergence.",
  },
  Litigation: {
    weight: 0.3,
    rationale:
      "Legal disputes, zoning challenges, or environmental lawsuits slow projects, but are typically friction factors, not value drivers.",
  },
};
