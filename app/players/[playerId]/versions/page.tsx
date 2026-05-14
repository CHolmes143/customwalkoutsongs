import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { songApprovalStatusLabel } from "@/lib/status";

export default async function SongVersionTrackerPage({ params }: { params: Promise<{ playerId: string }> }) {
  const { playerId } = await params;
  const player = await prisma.player.findUnique({
    where: { id: playerId },
    include: { team: true, songVersions: { orderBy: { createdAt: "asc" } } },
  });
  if (!player) notFound();

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">Song version tracker</div>
          <h1>
            {player.playerFirstName} {player.playerLastName}
          </h1>
        </div>
        <Link className="button secondary" href={`/players/${player.id}`}>
          Edit Versions
        </Link>
      </div>

      <div className="table">
        <div className="row header">
          <span>Version</span>
          <span>Title</span>
          <span>Status</span>
          <span>Final</span>
          <span>Audio</span>
        </div>
        {player.songVersions.map((version) => (
          <div className="row" key={version.id}>
            <strong>{version.versionName}</strong>
            <span>{version.sunoSongTitle || "Untitled"}</span>
            <span className="badge">{songApprovalStatusLabel(version.approvalStatus)}</span>
            <span>{version.selectedFinal ? "Yes" : "No"}</span>
            {version.audioFileUrl ? (
              <a className="button secondary" href={version.audioFileUrl}>
                Open
              </a>
            ) : (
              <span className="muted">No URL</span>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
