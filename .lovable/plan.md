# ReturnSense Firebase (Firestore) Schema Plan

## Scope
Replace localStorage auth and static mock data with Firebase Auth + Firestore. Preserve the current multi-role, multi-dashboard UX. Support multi-tenancy via workspaces.

## Collections

### 1. `users` (root-level)
One doc per Firebase Auth user. Doc ID = Firebase `uid`.
```ts
interface UserDoc {
  uid: string;
  fullName: string;
  email: string;
  role: "operations" | "quality" | "admin";
  workspaceId: string;       // FK → workspaces/{id}
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
}
```

### 2. `workspaces` (root-level)
One doc per company/tenant. All other collections are subcollections under a workspace.
```ts
interface WorkspaceDoc {
  name: string;
  plan: "starter" | "professional" | "enterprise";
  region: string;
  memberCount: number;
  ssoEnabled: boolean;
  createdAt: Timestamp;
  ownerId: string;           // uid of workspace creator
}
```

### 3. `workspaces/{workspaceId}/skus`
```ts
interface SkuDoc {
  sku: string;               // e.g. "AP-1023-BLK"
  name: string;
  returns: number;
  returnRate: number;        // percentage
  severity: "Critical" | "High" | "Medium" | "Low";
  category: string;          // "Apparel" | "Footwear" | ...
  savings: number;           // estimated recoverable savings ($)
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 4. `workspaces/{workspaceId}/actions`
Action center items — fixes recommended by the engine.
```ts
interface ActionDoc {
  skuId: string;             // reference to SKU doc ID
  issue: string;
  recommendedFix: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  savings: number;
  status: "Open" | "In Review" | "Resolved" | "Dismissed";
  assignedTo?: string;       // uid
  createdAt: Timestamp;
  resolvedAt?: Timestamp;
}
```

### 5. `workspaces/{workspaceId}/alerts`
Real-time alerts/notifications.
```ts
interface AlertDoc {
  level: "critical" | "warning" | "info";
  title: string;
  body: string;
  skuId?: string;
  read: boolean;
  createdAt: Timestamp;
}
```

### 6. `workspaces/{workspaceId}/fingerprints`
ML-detected failure patterns.
```ts
interface FingerprintDoc {
  fingerprintId: string;     // e.g. "FP-018"
  pattern: string;
  category: "Manufacturing" | "Material" | "Logistics" | "Content";
  confidence: number;        // 0.0–1.0
  affectedSkuIds: string[];
  createdAt: Timestamp;
}
```

### 7. `workspaces/{workspaceId}/feedback`
Individual customer feedback/return comments.
```ts
interface FeedbackDoc {
  customerName: string;
  skuId: string;
  text: string;
  sentiment: "positive" | "neutral" | "negative";
  keywords: string[];        // extracted NLP keywords
  sentimentScore: number;    // -1.0 to +1.0
  createdAt: Timestamp;
}
```

### 8. `workspaces/{workspaceId}/integrations`
Third-party connector configs.
```ts
interface IntegrationDoc {
  name: string;              // "Shopify", "Loop Returns", ...
  status: "Connected" | "Disconnected" | "Error";
  lastSyncAt?: Timestamp;
  health: "Healthy" | "Delayed" | "Error" | "—";
  config?: Record<string, unknown>; // API keys, store URL, etc.
}
```

### 9. `workspaces/{workspaceId}/investigations`
Quality team investigations.
```ts
interface InvestigationDoc {
  title: string;
  skuIds: string[];
  fingerprintId?: string;
  status: "Open" | "In Progress" | "Resolved";
  ownerId: string;           // uid
  timeline: { date: Timestamp; event: string }[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### 10. `workspaces/{workspaceId}/reports`
Generated/exported reports metadata.
```ts
interface ReportDoc {
  name: string;
  period: string;            // human-readable, e.g. "Nov 4 – Nov 10"
  type: "PDF" | "CSV";
  sizeBytes: number;
  downloadUrl?: string;      // Cloud Storage URL
  generatedBy: string;       // uid
  createdAt: Timestamp;
}
```

## Time-Series / Analytics Data

Return trends, sentiment trends, and usage analytics are **aggregate/time-series data** that Firestore handles poorly at scale. Two options:

**Option A (recommended for prototype):** Store recent aggregates directly in `WorkspaceDoc`:
```ts
interface WorkspaceDoc {
  // ...existing fields
  monthlyReturns: { month: string; returns: number; rate: number }[];
  weeklySentiment: { week: string; positive: number; neutral: number; negative: number }[];
}
```

**Option B (scale-ready):** Keep a `workspaces/{workspaceId}/metrics` subcollection with one doc per time grain (day/week/month), queryable by range.

## Why subcollections under workspace?

All business data lives under `workspaces/{id}` so Firestore security rules can enforce:
```
match /workspaces/{workspaceId}/{document=**} {
  allow read, write: if request.auth != null
    && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.workspaceId == workspaceId;
}
```
This gives true multi-tenancy — users only see their own workspace data.

## Migration Path from Mock Data

1. Keep `mockData.ts` as a seeding utility — write a one-time `seedWorkspace(workspaceId)` function that creates docs from the static arrays.
2. Replace `localStorage` auth with Firebase Auth (`firebase/auth`).
3. Replace `useAuth()` context with Firebase auth state listener.
4. Create a `useFirestore()` data layer that reads from the user's workspace subcollections.
5. Dashboard components consume live Firestore data via TanStack Query + custom hooks.

## What Stays Mocked

- Admin platform stats (`adminStats`, `usageOverTime`) — these are platform-level, not workspace-level. If you want real data here, add a top-level `platformMetrics` collection writable only by a server-side Cloud Function.
- Billing/subscription details — these should come from your payment provider (Stripe/Paddle), not Firestore.

## Implementation Priority

1. **P0 — Auth**: Replace localStorage with Firebase Auth + `users` collection.
2. **P1 — Workspace + SKUs**: Seed workspace and SKU data from mock arrays.
3. **P2 — Actions + Alerts**: Enable create/update on action center and dismiss/read alerts.
4. **P3 — Feedback + Fingerprints**: Customer feedback and failure fingerprint views.
5. **P4 — Integrations + Investigations**: Connector status and quality investigations.
