import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { getAllUsers, type Role, type StoredUser } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
export const Route = createFileRoute("/dashboard/admin/users")({ component: Page });
function Page() {
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [q, setQ] = useState(""); const [role, setRole] = useState<"all" | Role>("all");
  useEffect(() => { getAllUsers().then(setUsers).catch(() => setUsers([])); }, []);
  const rows = users.filter((u) =>
    (q ? (u.fullName.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase())) : true) &&
    (role === "all" ? true : u.role === role));
  return (
    <div>
      <PageHeader title="User management" subtitle={`${users.length} registered users`} />
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Input placeholder="Search by name or email" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
          <Select value={role} onValueChange={(v) => setRole(v as "all" | Role)}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem><SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="quality">Quality</SelectItem><SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 overflow-x-auto"><table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="py-2">ID</th><th>Name</th><th>Email</th><th>Role</th><th>Created</th>
          </tr></thead>
          <tbody>{rows.length === 0 ? (<tr><td colSpan={5} className="py-10 text-center text-muted-foreground">No users found.</td></tr>) : rows.map((u) => (
            <tr key={u.id} className="border-b last:border-0">
              <td className="py-2">{u.id}</td><td>{u.fullName}</td><td className="text-muted-foreground">{u.email}</td>
              <td><span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] capitalize">{u.role}</span></td>
              <td className="text-muted-foreground">{new Date(u.createdAt).toLocaleDateString()}</td>
            </tr>))}</tbody>
        </table></div>
      </Card>
    </div>
  );
}
