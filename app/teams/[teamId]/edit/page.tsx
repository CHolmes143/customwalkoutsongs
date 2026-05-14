import Link from "next/link";
import { notFound } from "next/navigation";
import { Field, TeamStatusSelect, TextArea } from "@/components/forms";
import { updateTeam } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditTeamPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const team = await prisma.team.findUnique({ where: { id: teamId } });
  if (!team) notFound();

  const action = updateTeam.bind(null, team.id);

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">Edit team</div>
          <h1>{team.teamName}</h1>
        </div>
        <Link className="button secondary" href={`/teams/${team.id}`}>
          Back
        </Link>
      </div>

      <form action={action} className="card form-grid">
        <Field label="Team name" name="teamName" defaultValue={team.teamName} required />
        <Field label="Sport" name="sport" defaultValue={team.sport} required />
        <Field label="Age group" name="ageGroup" defaultValue={team.ageGroup} required />
        <Field label="Season" name="season" defaultValue={team.season} />
        <Field label="Organization name" name="organizationName" defaultValue={team.organizationName} />
        <Field label="Coach name" name="coachName" defaultValue={team.coachName} />
        <Field label="Team contact name" name="teamContactName" defaultValue={team.teamContactName} />
        <Field label="Team contact email" name="teamContactEmail" defaultValue={team.teamContactEmail} type="email" />
        <Field label="Team contact phone" name="teamContactPhone" defaultValue={team.teamContactPhone} />
        <TeamStatusSelect defaultValue={team.orderStatus} />
        <TextArea label="Notes" name="notes" defaultValue={team.notes} />
        <div className="actions span-2">
          <button className="button" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}
