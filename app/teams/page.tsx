import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { teamOrderStatusLabel } from "@/lib/status";

export const dynamic = "force-dynamic";

export default async function TeamsPage() {
  const teams = await prisma.team.findMany({
    include: { players: true, deliveries: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">Internal dashboard</div>
          <h1>Teams</h1>
          <p className="muted">Manage team orders from intake through prompt creation, song review, and delivery.</p>
        </div>
        <Link className="button" href="/teams/new">
          Add Team
        </Link>
      </div>

      <div className="table">
        <div className="row header">
          <span>Team</span>
          <span>Age / Sport</span>
          <span>Status</span>
          <span>Players</span>
          <span>Open</span>
        </div>
        {teams.map((team) => (
          <div className="row" key={team.id}>
            <div>
              <strong>{team.teamName}</strong>
              <div className="muted">{team.organizationName || "No organization listed"}</div>
            </div>
            <span>
              {team.ageGroup} {team.sport}
            </span>
            <span className="badge">{teamOrderStatusLabel(team.orderStatus)}</span>
            <span>{team.players.length}</span>
            <Link className="button secondary" href={`/teams/${team.id}`}>
              View
            </Link>
          </div>
        ))}
        {teams.length === 0 ? <div className="card">No teams yet.</div> : null}
      </div>
    </main>
  );
}
