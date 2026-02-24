export type FeatureFlagState = "On" | "Off" | "Beta";

export type FeatureFlagRow = {
  key: string;
  module: string;
  defaultState: FeatureFlagState;
  environment: string;
  lastUpdated: string;
  updatedBy: string;
};

export const featureFlagsTable: FeatureFlagRow[] = [
  {
    key: "billing.v2-checkout",
    module: "Billing",
    defaultState: "On",
    environment: "Production",
    lastUpdated: "2026-02-09",
    updatedBy: "Admin Root",
  },
  {
    key: "entities.multi-territory",
    module: "Entities",
    defaultState: "Beta",
    environment: "Staging",
    lastUpdated: "2026-02-07",
    updatedBy: "Leo Tan",
  },
  {
    key: "staff.audit-log-v2",
    module: "Staff",
    defaultState: "Off",
    environment: "Production",
    lastUpdated: "2026-02-01",
    updatedBy: "Mark Evans",
  },
];

