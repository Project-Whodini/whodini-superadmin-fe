export type InvoiceStatus = "Paid" | "Pending" | "Overdue";

export type InvoiceRow = {
  invoiceId: string;
  entity: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  issuedDate: string;
  dueDate: string;
  territory: string;
  refundedAmount: number;
};

export const billingRecentInvoicesTable: InvoiceRow[] = [
  {
    invoiceId: "INV-12011",
    entity: "Northwind Studio",
    amount: 890,
    currency: "USD",
    status: "Paid",
    issuedDate: "2026-02-08",
    dueDate: "2026-02-16",
    territory: "US-East",
    refundedAmount: 0,
  },
  {
    invoiceId: "INV-12012",
    entity: "Globex Europe",
    amount: 720,
    currency: "EUR",
    status: "Pending",
    issuedDate: "2026-02-09",
    dueDate: "2026-02-18",
    territory: "EU-West",
    refundedAmount: 0,
  },
  {
    invoiceId: "INV-12013",
    entity: "Community Hub LA",
    amount: 290,
    currency: "USD",
    status: "Overdue",
    issuedDate: "2026-01-30",
    dueDate: "2026-02-07",
    territory: "US-West",
    refundedAmount: 0,
  },
  {
    invoiceId: "INV-12014",
    entity: "Atlas Retail",
    amount: 1600,
    currency: "USD",
    status: "Paid",
    issuedDate: "2026-02-10",
    dueDate: "2026-02-20",
    territory: "US-East",
    refundedAmount: 150,
  },
  {
    invoiceId: "INV-12015",
    entity: "Zenith Medical",
    amount: 740,
    currency: "USD",
    status: "Paid",
    issuedDate: "2026-02-11",
    dueDate: "2026-02-19",
    territory: "EU-West",
    refundedAmount: 0,
  },
  {
    invoiceId: "INV-12016",
    entity: "Helios Labs",
    amount: 420,
    currency: "USD",
    status: "Pending",
    issuedDate: "2026-02-06",
    dueDate: "2026-02-15",
    territory: "APAC",
    refundedAmount: 0,
  },
];

