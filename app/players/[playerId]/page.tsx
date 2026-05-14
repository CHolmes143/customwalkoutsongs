import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/CopyButton";
import { SongApprovalSelect } from "@/components/forms";
import {
  createSongVersion,
  updateSongVersion,
} from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { playerStatusLabel, songApprovalStatusLabel } from "@/lib/status";
import { musicStyleSummary } from "@/lib/musicStyles";

export const dynamic = "force-dynamic";

export default async function PlayerDetailPage({ params }: { params: Promise<{ playerId: string }> }) {
  const { playerId } = await params;
  const player = await prisma.player.findUnique({
    where: { id: playerId },
    include: {
      team: true,
      prompts: { orderBy: { promptVersion: "desc" } },
      songVersions: { orderBy: { createdAt: "asc" } },
    },
  });
  if (!player) notFound();

  const latestPrompt = player.prompts[0];
  const createVersionAction = createSongVersion.bind(null, player.id);

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">{player.team.teamName}</div>
          <h1>
            {player.playerFirstName} {player.playerLastName}
          </h1>
          <p className="muted">
            Jersey {player.jerseyNumber ? `#${player.jerseyNumber}` : "TBD"} · {playerStatusLabel(player.status)}
          </p>
        </div>
        <div className="actions">
          <Link className="button secondary" href={`/teams/${player.teamId}`}>
            Team
          </Link>
          <Link className="button secondary" href={`/players/${player.id}/edit`}>
            Edit Player
          </Link>
        </div>
      </div>

      <section className="grid two">
        <div className="card">
          <h2>Player Details</h2>
          <p><strong>Nickname to be used in song:</strong> {player.nickname || "None"}</p>
          <p><strong>Parent name:</strong> {player.parentName || "None"}</p>
          <p><strong>Parent email:</strong> {player.parentEmail || "None"}</p>
          <p><strong>Parent contact number:</strong> {player.parentContactNumber || "None"}</p>
          <p><strong>Clean lyrics:</strong> {player.cleanLyricsRequired ? "Required" : "Preferred"}</p>
        </div>

        <div className="card">
          <div className="page-header">
            <h2>Favorite Music Style</h2>
            {latestPrompt ? <CopyButton text={latestPrompt.promptText} /> : null}
          </div>
          <p className="muted">{musicStyleSummary(player.musicStyles)}</p>
          {latestPrompt ? (
            <div className="prompt-box">{latestPrompt.promptText}</div>
          ) : (
            <p className="muted">No prompt yet. Generate one when intake is ready.</p>
          )}
          <div className="actions" style={{ marginTop: 14 }}>
            <Link className="button secondary" href={`/players/${player.id}/prompts`}>
              Prompt History
            </Link>
          </div>
        </div>
      </section>

      <section style={{ marginTop: 22 }}>
        <div className="page-header">
          <div>
            <h2>Song Versions</h2>
            <p className="muted">Paste Suno links, lyrics, notes, and final MP3 URLs here.</p>
          </div>
        </div>

        <form action={createVersionAction} className="card form-grid" style={{ marginBottom: 16 }}>
          <label className="field">
            <span>New version name</span>
            <input name="versionName" placeholder={`Version ${player.songVersions.length + 1}`} />
          </label>
          <SongApprovalSelect />
          <div className="actions">
            <button className="button" type="submit">
              Add Version
            </button>
          </div>
        </form>

        <div className="grid">
          {player.songVersions.map((version) => {
            const action = updateSongVersion.bind(null, version.id);
            return (
              <form action={action} className="card form-grid" key={version.id}>
                <label className="field">
                  <span>Version name</span>
                  <input name="versionName" defaultValue={version.versionName} />
                </label>
                <label className="field">
                  <span>Suno song title</span>
                  <input name="sunoSongTitle" defaultValue={version.sunoSongTitle ?? ""} />
                </label>
                <label className="field">
                  <span>Suno URL</span>
                  <input name="sunoUrl" defaultValue={version.sunoUrl ?? ""} />
                </label>
                <label className="field">
                  <span>Final audio file URL</span>
                  <input name="audioFileUrl" defaultValue={version.audioFileUrl ?? ""} />
                </label>
                <label className="field">
                  <span>Duration seconds</span>
                  <input name="durationSeconds" defaultValue={version.durationSeconds ?? ""} type="number" />
                </label>
                <SongApprovalSelect defaultValue={version.approvalStatus} />
                <label className="field span-2">
                  <span>Lyrics</span>
                  <textarea name="lyricsText" defaultValue={version.lyricsText ?? ""} rows={4} />
                </label>
                <label className="field span-2">
                  <span>Internal notes</span>
                  <textarea name="internalNotes" defaultValue={version.internalNotes ?? ""} rows={3} />
                </label>
                <label className="checkbox">
                  <input name="selectedFinal" type="checkbox" defaultChecked={version.selectedFinal} />
                  Selected final
                </label>
                <div className="actions">
                  <span className="badge">{songApprovalStatusLabel(version.approvalStatus)}</span>
                  <button className="button" type="submit">
                    Save Version
                  </button>
                </div>
              </form>
            );
          })}
        </div>
      </section>
    </main>
  );
}
