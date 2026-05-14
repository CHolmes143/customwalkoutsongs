import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deliveryStatusLabel, playerStatusLabel, teamOrderStatusLabel } from "@/lib/status";

export const dynamic = "force-dynamic";

export default async function TeamDetailPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      players: { include: { prompts: true, songVersions: true }, orderBy: [{ jerseyNumber: "asc" }, { playerFirstName: "asc" }] },
      deliveries: true,
    },
  });
  if (!team) notFound();

  const totalPlayers = team.players.length;
  const playersNeedingIntake = team.players.filter((player) => player.status === "NEEDS_INTAKE").length;
  const promptsReady = team.players.filter((player) => player.prompts.length > 0 || player.status === "PROMPT_READY").length;
  const songsInProduction = team.players.filter((player) => ["IN_SUNO", "VERSIONS_CREATED"].includes(player.status)).length;
  const finalSongsSelected = team.players.filter((player) => player.songVersions.some((version) => version.selectedFinal)).length;
  const deliveryComplete = team.deliveries.some((delivery) => delivery.deliveryStatus === "COMPLETE");

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">{teamOrderStatusLabel(team.orderStatus)}</div>
          <h1>{team.teamName}</h1>
          <p className="muted">
            {team.ageGroup} {team.sport}
            {team.season ? ` · ${team.season}` : ""}
          </p>
        </div>
        <div className="actions">
          <Link className="button secondary" href={`/teams/${team.id}/edit`}>
            Edit Team
          </Link>
          <Link className="button" href={`/teams/${team.id}/players/new`}>
            Add Player
          </Link>
          <Link className="button secondary" href={`/teams/${team.id}/delivery`}>
            Delivery
          </Link>
        </div>
      </div>

      <section className="grid three">
        <div className="card stat">
          <strong>{totalPlayers}</strong>
          <span>Total players</span>
        </div>
        <div className="card stat">
          <strong>{playersNeedingIntake}</strong>
          <span>Players needing intake</span>
        </div>
        <div className="card stat">
          <strong>{promptsReady}</strong>
          <span>Prompts ready</span>
        </div>
        <div className="card stat">
          <strong>{songsInProduction}</strong>
          <span>Songs in production</span>
        </div>
        <div className="card stat">
          <strong>{finalSongsSelected}</strong>
          <span>Final songs selected</span>
        </div>
        <div className="card stat">
          <strong>{deliveryComplete ? "Yes" : "No"}</strong>
          <span>Delivery complete</span>
        </div>
      </section>

      <section style={{ marginTop: 22 }}>
        <div className="page-header">
          <h2>Players</h2>
        </div>
        <div className="table">
          <div className="row header">
            <span>Player</span>
            <span>Jersey</span>
            <span>Status</span>
            <span>Versions</span>
            <span>Open</span>
          </div>
          {team.players.map((player) => (
            <div className="row" key={player.id}>
              <div>
                <strong>
                  {player.playerFirstName} {player.playerLastName}
                </strong>
                <div className="muted">{player.nickname || "No nickname yet"}</div>
              </div>
              <span>{player.jerseyNumber || "TBD"}</span>
              <span className="badge">{playerStatusLabel(player.status)}</span>
              <span>{player.songVersions.length}</span>
              <Link className="button secondary" href={`/players/${player.id}`}>
                View
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="card" style={{ marginTop: 22 }}>
        <h2>Delivery Snapshot</h2>
        <p className="muted">
          Current delivery status:{" "}
          <strong>{deliveryStatusLabel(team.deliveries[0]?.deliveryStatus)}</strong>
        </p>
      </section>
    </main>
  );
}
