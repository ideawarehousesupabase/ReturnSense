export const kpis = {
  totalReturns: 18432,
  returnRate: 7.8,
  revenueLoss: 1284500,
  recoverableSavings: 412300,
  flaggedIssues: 47,
  defectTrendDelta: -12.4,
  investigationsOpen: 23,
};

export const returnTrend = [
  { month: "Jan", returns: 1240, rate: 6.4 },
  { month: "Feb", returns: 1380, rate: 6.9 },
  { month: "Mar", returns: 1520, rate: 7.1 },
  { month: "Apr", returns: 1410, rate: 6.8 },
  { month: "May", returns: 1680, rate: 7.5 },
  { month: "Jun", returns: 1820, rate: 7.9 },
  { month: "Jul", returns: 2010, rate: 8.4 },
  { month: "Aug", returns: 1940, rate: 8.1 },
  { month: "Sep", returns: 1760, rate: 7.6 },
  { month: "Oct", returns: 1650, rate: 7.3 },
  { month: "Nov", returns: 1490, rate: 6.9 },
  { month: "Dec", returns: 1532, rate: 7.0 },
];

export const categoryBreakdown = [
  { name: "Apparel", value: 38 },
  { name: "Footwear", value: 22 },
  { name: "Electronics", value: 17 },
  { name: "Home", value: 13 },
  { name: "Beauty", value: 10 },
];

export const issueDistribution = [
  { issue: "Size/Fit", count: 4120 },
  { issue: "Defect", count: 2980 },
  { issue: "Not as described", count: 2310 },
  { issue: "Damaged", count: 1840 },
  { issue: "Wrong item", count: 980 },
  { issue: "Late delivery", count: 612 },
];

export const topSkus = [
  { sku: "AP-1023-BLK", name: "Linen Oversized Shirt", returns: 412, rate: 18.2, severity: "High", savings: 28400 },
  { sku: "FW-8841-WHT", name: "Court Sneaker v2", returns: 388, rate: 14.7, severity: "High", savings: 31200 },
  { sku: "EL-2210-USB", name: "USB-C Hub 7-in-1", returns: 274, rate: 12.4, severity: "Medium", savings: 18900 },
  { sku: "AP-5532-NVY", name: "Wool Blend Coat", returns: 251, rate: 11.8, severity: "Medium", savings: 22100 },
  { sku: "HM-3320-CER", name: "Stoneware Mug Set", returns: 198, rate: 9.6, severity: "Low", savings: 7400 },
  { sku: "BE-1198-SER", name: "Vitamin C Serum 30ml", returns: 176, rate: 8.9, severity: "Low", savings: 5800 },
];

export const actionCenter = [
  { sku: "AP-1023-BLK", issue: "Runs 1.5 sizes large", fix: "Update size chart + product copy", severity: "High", savings: 28400, status: "Open" },
  { sku: "FW-8841-WHT", issue: "Sole separation after 3 weeks", fix: "Notify supplier QA-44", severity: "Critical", savings: 31200, status: "In Review" },
  { sku: "EL-2210-USB", issue: "HDMI port loose on batch #221", fix: "Hold batch, reorder", severity: "High", savings: 18900, status: "Open" },
  { sku: "AP-5532-NVY", issue: "Lining tears at pocket seam", fix: "Reinforce stitch pattern", severity: "Medium", savings: 22100, status: "Resolved" },
  { sku: "HM-3320-CER", issue: "Arrives chipped in 11% of orders", fix: "Upgrade packaging foam", severity: "Medium", savings: 7400, status: "Open" },
];

export const alerts = [
  { id: 1, level: "critical", title: "Spike on FW-8841-WHT", body: "Returns up 64% week over week. Likely manufacturing batch.", time: "2h ago" },
  { id: 2, level: "warning", title: "New complaint cluster: 'zipper'", body: "27 new mentions across 4 SKUs in Apparel.", time: "5h ago" },
  { id: 3, level: "warning", title: "Loop Returns sync delayed", body: "Last successful sync 1h 42m ago.", time: "1h ago" },
  { id: 4, level: "info", title: "Weekly digest ready", body: "Action center generated 12 new recommendations.", time: "Yesterday" },
];

export const failureFingerprints = [
  { id: "FP-018", pattern: "Stitch failure at stress points", confidence: 0.92, skus: 14, category: "Manufacturing" },
  { id: "FP-027", pattern: "Adhesive degrades < 30 days", confidence: 0.88, skus: 6, category: "Material" },
  { id: "FP-041", pattern: "Color fade after first wash", confidence: 0.81, skus: 9, category: "Material" },
  { id: "FP-052", pattern: "Packaging crush damage", confidence: 0.76, skus: 22, category: "Logistics" },
  { id: "FP-066", pattern: "Mis-spec dimension on listing", confidence: 0.71, skus: 11, category: "Content" },
];

export const sentimentTrend = [
  { week: "W1", positive: 62, neutral: 24, negative: 14 },
  { week: "W2", positive: 58, neutral: 26, negative: 16 },
  { week: "W3", positive: 54, neutral: 28, negative: 18 },
  { week: "W4", positive: 51, neutral: 28, negative: 21 },
  { week: "W5", positive: 49, neutral: 29, negative: 22 },
  { week: "W6", positive: 53, neutral: 28, negative: 19 },
];

export const complaintClusters = [
  { keyword: "too small", mentions: 412, sentiment: -0.6 },
  { keyword: "broken", mentions: 287, sentiment: -0.82 },
  { keyword: "color different", mentions: 219, sentiment: -0.4 },
  { keyword: "not as pictured", mentions: 198, sentiment: -0.55 },
  { keyword: "smells bad", mentions: 142, sentiment: -0.71 },
  { keyword: "great quality", mentions: 388, sentiment: 0.78 },
];

export const customerComments = [
  { name: "Hannah B.", sku: "AP-1023-BLK", text: "Beautiful shirt but two sizes too large. Returned.", sentiment: "negative" },
  { name: "Diego R.", sku: "FW-8841-WHT", text: "Sole came apart after a few wears. Disappointed.", sentiment: "negative" },
  { name: "Yuki T.", sku: "BE-1198-SER", text: "Skin feels amazing. Will reorder.", sentiment: "positive" },
  { name: "Sam K.", sku: "EL-2210-USB", text: "HDMI wiggles. Otherwise good build.", sentiment: "neutral" },
];

export const integrations = [
  { name: "Shopify", status: "Connected", lastSync: "12 minutes ago", health: "Healthy" },
  { name: "Loop Returns", status: "Connected", lastSync: "1h 42m ago", health: "Delayed" },
  { name: "Gorgias", status: "Connected", lastSync: "8 minutes ago", health: "Healthy" },
  { name: "Klaviyo", status: "Disconnected", lastSync: "—", health: "—" },
  { name: "NetSuite", status: "Connected", lastSync: "31 minutes ago", health: "Healthy" },
];

export const reports = [
  { name: "Weekly Returns Digest", period: "Nov 4 – Nov 10", size: "1.2 MB", type: "PDF" },
  { name: "SKU Risk Report", period: "October 2025", size: "684 KB", type: "PDF" },
  { name: "Action Center Export", period: "Q4 2025", size: "212 KB", type: "CSV" },
  { name: "Customer Sentiment", period: "October 2025", size: "498 KB", type: "PDF" },
];

export const usageOverTime = [
  { day: "Mon", api: 12400, dash: 320 },
  { day: "Tue", api: 13800, dash: 411 },
  { day: "Wed", api: 12950, dash: 388 },
  { day: "Thu", api: 15210, dash: 442 },
  { day: "Fri", api: 16380, dash: 501 },
  { day: "Sat", api: 8240, dash: 188 },
  { day: "Sun", api: 7120, dash: 144 },
];

export const adminStats = {
  totalUsers: 1284,
  totalAccounts: 86,
  activeDashboards: 412,
  subscriptions: 81,
  uptime: 99.98,
};

export const investigationTimeline = [
  { date: "Nov 02", event: "First complaint cluster detected" },
  { date: "Nov 04", event: "Failure fingerprint FP-018 matched" },
  { date: "Nov 06", event: "Quality team opened investigation" },
  { date: "Nov 09", event: "Supplier QA-44 notified" },
  { date: "Nov 12", event: "Batch hold placed on 4,200 units" },
];
