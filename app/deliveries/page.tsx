import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deliveryStatusLabel } from "@/lib/status";

export const dynamic = "force-dynamic";

export default async function DeliveriesPage() {
  const teams = await prisma.team.findMany({
    include: {
      deliveries: true,
      players: { include: { songVersions: { where: { selectedFinal: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">Delivery tracker</div>
          <h1>Deliveries</h1>
        </div>
      </div>
      <div className="table">
        <div className="row header">
          <span>Team</span>
          <span>Status</span>
          <span>Final songs</span>
          <span>Delivery URL</span>
          <span>Open</span>
        </div>
        {teams.map((team) => {
          const delivery = team.deliveries[0];
          const finals = team.players.filter((player) => player.songVersions.length > 0).length;
          return (
            <div className="row" key={team.id}>
              <strong>{team.teamName}</strong>
              <span className="badge">{deliveryStatusLabel(delivery?.deliveryStatus)}</span>
              <span>{finals}</span>
              <span>{delivery?.deliveryUrl || "No URL"}</span>
              <Link className="button secondary" href={`/teams/${team.id}/delivery`}>
                Open
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
