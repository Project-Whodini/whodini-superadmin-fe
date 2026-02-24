export type TerritoryStatus = "Enabled" | "Disabled";

export type TerritoryRow = {
  code: string;
  name: string;
  currency: string;
  status: TerritoryStatus;
  entities: number;
  activeSubs: number;
};

export const territoriesTable: TerritoryRow[] = [
  {
    code: "US-EAST",
    name: "United States – East",
    currency: "USD",
    status: "Enabled",
    entities: 24,
    activeSubs: 18,
  },
  {
    code: "EU-WEST",
    name: "Europe – West",
    currency: "EUR",
    status: "Enabled",
    entities: 15,
    activeSubs: 11,
  },
  {
    code: "APAC",
    name: "Asia Pacific",
    currency: "USD",
    status: "Disabled",
    entities: 6,
    activeSubs: 0,
  },
];

export const billingRevenueByTerritoryTable = [
  {
    territory: "US-East",
    activeSubscriptions: 24,
    currentRevenue: 28400,
    previousRevenue: 26150,
    currency: "USD",
    status: "Enabled",
  },
  {
    territory: "EU-West",
    activeSubscriptions: 18,
    currentRevenue: 19600,
    previousRevenue: 18880,
    currency: "EUR",
    status: "Enabled",
  },
  {
    territory: "US-West",
    activeSubscriptions: 11,
    currentRevenue: 13250,
    previousRevenue: 12400,
    currency: "USD",
    status: "Enabled",
  },
  {
    territory: "APAC",
    activeSubscriptions: 7,
    currentRevenue: 7700,
    previousRevenue: 8050,
    currency: "USD",
    status: "Disabled",
  },
  {
    territory: "LATAM",
    activeSubscriptions: 5,
    currentRevenue: 5100,
    previousRevenue: 4720,
    currency: "USD",
    status: "Enabled",
  },
];

