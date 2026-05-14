import Link from "next/link";
import { notFound } from "next/navigation";
import { Field, MusicStyleCheckboxes } from "@/components/forms";
import { createPlayer } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function NewPlayerPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const team = await prisma.team.findUnique({ where: { id: teamId } });
  if (!team) notFound();

  const action = createPlayer.bind(null, team.id);

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">{team.teamName}</div>
          <h1>Add Player</h1>
        </div>
        <Link className="button secondary" href={`/teams/${team.id}`}>
          Back
        </Link>
      </div>

      <form action={action} className="card form-grid">
        <Field label="First name" name="playerFirstName" required />
        <Field label="Last name" name="playerLastName" required />
        <Field label="Jersey number" name="jerseyNumber" />
        <Field label="Nickname to be used in song" name="nickname" defaultValue="use first name" />
        <Field label="Parent name" name="parentName" />
        <Field label="Parent email" name="parentEmail" type="email" />
        <Field label="Parent contact number" name="parentContactNumber" />
        <MusicStyleCheckboxes />
        <label className="checkbox span-2">
          <input name="cleanLyricsRequired" type="checkbox" checked readOnly />
          Clean lyrics required
        </label>
        <div className="actions span-2">
          <button className="button" type="submit">
            Save Player
          </button>
        </div>
      </form>
    </main>
  );
}
