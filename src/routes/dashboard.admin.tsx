import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/site/DashboardLayout";
export const Route = createFileRoute("/dashboard/admin")({ component: () => <DashboardLayout role="admin" /> });
