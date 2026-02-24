export type StaffStatus = "Active" | "Inactive";

export type StaffRow = {
  id: string;
  name: string;
  role: string;
  status: StaffStatus;
  created: string;
  lastActive: string;
};

export const staffTable: StaffRow[] = [
  {
    id: "ST_10",
    name: "Admin Root",
    role: "SuperAdmin",
    status: "Active",
    created: "2025-09-01",
    lastActive: "2026-02-11",
  },
  {
    id: "ST_11",
    name: "Karen Lim",
    role: "Support",
    status: "Active",
    created: "2025-10-10",
    lastActive: "2026-02-10",
  },
  {
    id: "ST_12",
    name: "Leo Tan",
    role: "Ops",
    status: "Active",
    created: "2025-12-01",
    lastActive: "2026-02-11",
  },
];

