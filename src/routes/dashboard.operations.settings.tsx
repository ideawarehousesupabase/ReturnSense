import { createFileRoute } from "@tanstack/react-router";
import { ProfileSettings } from "@/components/site/ProfileSettings";
export const Route = createFileRoute("/dashboard/operations/settings")({ component: () => <ProfileSettings /> });
