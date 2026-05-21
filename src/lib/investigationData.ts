export type InvestigationStatus = "Open" | "In Review" | "Resolved";
export type Severity = "Critical" | "High" | "Medium" | "Low";

export interface DefectEvidence {
  description: string;
  frequency: number;
  severity: Severity;
  confidence: number; // 0-100
}

export interface RootCause {
  source: string;
  factors: string[];
  confidence: number;
}

export type OutcomeStatus = "Open" | "In Progress" | "Resolved";

export interface BusinessOutcome {
  revenueAtRisk: number;
  recoverableRevenue: number;
  unitsPrevented: number;
  projectedReductionFrom: number;
  projectedReductionTo: number;
  status: OutcomeStatus;
}

export interface InvestigationRecord {
  skuId: string;
  productName: string;
  category: string;
  severity: Severity;
  returnRate: number;
  status: InvestigationStatus;
  timeline: { date: string; event: string }[];
  details: { returns30d: number; recoverable: number };
  complaints: { name: string; text: string; sentiment: "negative" | "neutral" | "positive" }[];
  defects: DefectEvidence[];
  rootCause: RootCause;
  recommendations: string[];
  outcome: BusinessOutcome;
}

export const investigations: InvestigationRecord[] = [
  {
    skuId: "FW-8841-WHT",
    productName: "Court Sneaker v2",
    category: "Footwear",
    severity: "High",
    returnRate: 14.7,
    status: "Open",
    timeline: [
      { date: "Nov 02", event: "First complaint cluster detected" },
      { date: "Nov 04", event: "Failure fingerprint FP-018 matched" },
      { date: "Nov 06", event: "Quality team opened investigation" },
      { date: "Nov 09", event: "Supplier QA-44 notified" },
      { date: "Nov 12", event: "Batch hold placed on 4,200 units" },
    ],
    details: { returns30d: 388, recoverable: 31200 },
    complaints: [
      { name: "Diego R.", text: "Sole came apart after a few wears.", sentiment: "negative" },
      { name: "Priya M.", text: "Glue started peeling after 2 weeks.", sentiment: "negative" },
      { name: "Jordan K.", text: "Product feels defective near the toe.", sentiment: "negative" },
      { name: "Amelia S.", text: "Stitching unraveled within a month.", sentiment: "negative" },
    ],
    defects: [
      { description: "Sole separation after repeated use", frequency: 142, severity: "Critical", confidence: 94 },
      { description: "Adhesive peeling at edge seams", frequency: 98, severity: "High", confidence: 89 },
      { description: "Stitch stress failure near toe flex point", frequency: 61, severity: "High", confidence: 82 },
    ],
    rootCause: {
      source: "Supplier QA-44 manufacturing batch",
      factors: [
        "Weak adhesive curing",
        "Poor stitch reinforcement",
        "Batch inconsistency detected",
      ],
      confidence: 92,
    },
    recommendations: [
      "Hold affected inventory batch",
      "Notify supplier QA-44",
      "Trigger manual QC inspection",
      "Audit recent production batch",
      "Review supplier quality scorecard",
    ],
    outcome: {
      revenueAtRisk: 41000,
      recoverableRevenue: 31200,
      unitsPrevented: 4200,
      projectedReductionFrom: 14.7,
      projectedReductionTo: 8.9,
      status: "In Progress",
    },
  },
  {
    skuId: "AP-1023-BLK",
    productName: "Linen Oversized Shirt",
    category: "Apparel",
    severity: "Medium",
    returnRate: 11.2,
    status: "In Review",
    timeline: [
      { date: "Oct 28", event: "Size/fit complaints surfaced" },
      { date: "Nov 01", event: "Pattern matched: 'runs large'" },
      { date: "Nov 05", event: "Quality team opened investigation" },
      { date: "Nov 08", event: "Sizing chart audit requested" },
    ],
    details: { returns30d: 412, recoverable: 28400 },
    complaints: [
      { name: "Hannah B.", text: "Beautiful shirt but two sizes too large.", sentiment: "negative" },
      { name: "Marcus L.", text: "Sleeves are way longer than the chart.", sentiment: "negative" },
      { name: "Sofia P.", text: "Had to return — fits like a dress on me.", sentiment: "negative" },
    ],
    defects: [
      { description: "Garment measures 1.5 sizes above spec", frequency: 187, severity: "High", confidence: 91 },
      { description: "Sleeve length exceeds size chart by 3cm", frequency: 96, severity: "Medium", confidence: 84 },
      { description: "Shoulder seam drop inconsistent across runs", frequency: 44, severity: "Medium", confidence: 72 },
    ],
    rootCause: {
      source: "Pattern grading drift at cut-and-sew vendor",
      factors: [
        "Outdated size chart on PDP",
        "Pattern grading not aligned to spec",
        "QA sampling missed oversize runs",
      ],
      confidence: 87,
    },
    recommendations: [
      "Update size chart and PDP copy",
      "Regrade pattern to brand spec",
      "Add measurement QA gate per run",
      "Issue fit-advisor email to recent buyers",
    ],
    outcome: {
      revenueAtRisk: 28000,
      recoverableRevenue: 21500,
      unitsPrevented: 2100,
      projectedReductionFrom: 11.2,
      projectedReductionTo: 6.4,
      status: "In Progress",
    },
  },
  {
    skuId: "EL-2210-USB",
    productName: "USB-C Hub 7-in-1",
    category: "Electronics",
    severity: "High",
    returnRate: 12.4,
    status: "Open",
    timeline: [
      { date: "Nov 03", event: "HDMI port complaints clustered" },
      { date: "Nov 06", event: "Batch #221 flagged" },
      { date: "Nov 09", event: "Quality team opened investigation" },
    ],
    details: { returns30d: 274, recoverable: 18900 },
    complaints: [
      { name: "Sam K.", text: "HDMI port wiggles and disconnects.", sentiment: "negative" },
      { name: "Renee O.", text: "Stopped working after a week of use.", sentiment: "negative" },
      { name: "Lukas H.", text: "Port feels loose right out of the box.", sentiment: "negative" },
    ],
    defects: [
      { description: "HDMI port solder joint failure", frequency: 118, severity: "Critical", confidence: 93 },
      { description: "Intermittent power delivery drop", frequency: 67, severity: "High", confidence: 80 },
      { description: "Housing flex causes port misalignment", frequency: 35, severity: "Medium", confidence: 71 },
    ],
    rootCause: {
      source: "Reflow oven temperature drift on batch #221",
      factors: [
        "Cold solder joints on HDMI pins",
        "Housing tolerance out of spec",
        "Batch QC sample size too small",
      ],
      confidence: 88,
    },
    recommendations: [
      "Hold batch #221 inventory",
      "Reorder from validated batch",
      "Add 100% HDMI continuity test",
      "Tighten housing tolerance spec",
    ],
    outcome: {
      revenueAtRisk: 26500,
      recoverableRevenue: 18900,
      unitsPrevented: 1800,
      projectedReductionFrom: 12.4,
      projectedReductionTo: 5.6,
      status: "Open",
    },
  },
];

export function getInvestigation(skuId: string): InvestigationRecord | undefined {
  return investigations.find((i) => i.skuId === skuId);
}