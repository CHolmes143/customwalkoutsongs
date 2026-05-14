import Link from "next/link";
import { Field, TeamStatusSelect, TextArea } from "@/components/forms";
import { createTeam } from "@/lib/actions";

export default function NewTeamPage() {
  return (
    <main className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">New order</div>
          <h1>Add Team</h1>
        </div>
        <Link className="button secondary" href="/teams">
          Back
        </Link>
      </div>

      <form action={createTeam} className="card form-grid">
        <Field label="Team name" name="teamName" required />
        <Field label="Sport" name="sport" defaultValue="Baseball" required />
        <Field label="Age group" name="ageGroup" required />
        <Field label="Season" name="season" />
        <Field label="Organization name" name="organizationName" />
        <Field label="Coach name" name="coachName" />
        <Field label="Team contact name" name="teamContactName" />
        <Field label="Team contact email" name="teamContactEmail" type="email" />
        <Field label="Team contact phone" name="teamContactPhone" />
        <TeamStatusSelect />
        <TextArea label="Notes" name="notes" />
        <div className="actions span-2">
          <button className="button" type="submit">
            Save Team
          </button>
        </div>
      </form>
    </main>
  );
}
