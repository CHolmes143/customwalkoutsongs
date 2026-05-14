import Link from "next/link";
import { notFound } from "next/navigation";
import { DeliveryStatusSelect, TextArea } from "@/components/forms";
import { updateDelivery } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { songApprovalStatusLabel } from "@/lib/status";

export default async function TeamDeliveryPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      deliveries: true,
      players: {
        include: { songVersions: { where: { selectedFinal: true }, orderBy: { updatedAt: "desc" } } },
        orderBy: [{ jerseyNumber: "asc" }, { playerFirstName: "asc" }],
      },
    },
  });
  if (!team) notFound();

  const delivery = team.deliveries[0] ?? (await prisma.delivery.create({ data: { teamId: team.id } }));
  const action = updateDelivery.bind(null, delivery.id);
  const finalRows = team.players.flatMap((player) =>
    player.songVersions.map((version) => ({ player, version })),
  );

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">Delivery tracker</div>
          <h1>{team.teamName}</h1>
          <p className="muted">All final selected songs for this team.</p>
        </div>
        <Link className="button secondary" href={`/teams/${team.id}`}>
          Team
        </Link>
      </div>

      <section className="card">
        <form action={action} className="form-grid">
          <DeliveryStatusSelect defaultValue={delivery.deliveryStatus} />
          <label className="field">
            <span>Delivery URL</span>
            <input name="deliveryUrl" defaultValue={delivery.deliveryUrl ?? ""} />
          </label>
          <TextArea label="Final notes" name="finalNotes" defaultValue={delivery.finalNotes} />
          <div className="actions span-2">
            <button className="button" type="submit">
              Save Delivery
            </button>
          </div>
        </form>
      </section>

      <section style={{ marginTop: 22 }}>
        <h2>Final Songs</h2>
        <div className="table" style={{ marginTop: 12 }}>
          <div className="row header">
            <span>Player</span>
            <span>Version</span>
            <span>Status</span>
            <span>Audio URL</span>
            <span>Open</span>
          </div>
          {finalRows.map(({ player, version }) => (
            <div className="row" key={version.id}>
              <div>
                <strong>
                  {player.playerFirstName} {player.playerLastName}
                </strong>
                <div className="muted">Jersey {player.jerseyNumber || "TBD"}</div>
              </div>
              <span>{version.versionName}</span>
              <span className="badge">{songApprovalStatusLabel(version.approvalStatus)}</span>
              <span>{version.audioFileUrl || "No final URL yet"}</span>
              <Link className="button secondary" href={`/players/${player.id}`}>
                Player
              </Link>
            </div>
          ))}
          {finalRows.length === 0 ? <div className="card">No final songs selected yet.</div> : null}
        </div>
      </section>
    </main>
  );
}
