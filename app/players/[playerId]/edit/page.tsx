import Link from "next/link";
import { notFound } from "next/navigation";
import { Field, MusicStyleCheckboxes } from "@/components/forms";
import { updatePlayer } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function EditPlayerPage({ params }: { params: Promise<{ playerId: string }> }) {
  const { playerId } = await params;
  const player = await prisma.player.findUnique({ where: { id: playerId }, include: { team: true } });
  if (!player) notFound();

  const action = updatePlayer.bind(null, player.id);

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">{player.team.teamName}</div>
          <h1>
            Edit {player.playerFirstName} {player.playerLastName}
          </h1>
        </div>
        <Link className="button secondary" href={`/players/${player.id}`}>
          Back
        </Link>
      </div>

      <form action={action} className="card form-grid">
        <Field label="First name" name="playerFirstName" defaultValue={player.playerFirstName} required />
        <Field label="Last name" name="playerLastName" defaultValue={player.playerLastName} required />
        <Field label="Jersey number" name="jerseyNumber" defaultValue={player.jerseyNumber} />
        <Field label="Nickname to be used in song" name="nickname" defaultValue={player.nickname || "use first name"} />
        <Field label="Parent name" name="parentName" defaultValue={player.parentName} />
        <Field label="Parent email" name="parentEmail" defaultValue={player.parentEmail} type="email" />
        <Field label="Parent contact number" name="parentContactNumber" defaultValue={player.parentContactNumber} />
        <MusicStyleCheckboxes defaultValue={player.musicStyles} />
        <label className="checkbox span-2">
          <input name="cleanLyricsRequired" type="checkbox" checked readOnly />
          Clean lyrics required
        </label>
        <div className="actions span-2">
          <button className="button" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}
