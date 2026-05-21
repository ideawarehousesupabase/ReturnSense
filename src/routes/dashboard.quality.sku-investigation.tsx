import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/quality/sku-investigation")({
  component: () => <Outlet />,
});