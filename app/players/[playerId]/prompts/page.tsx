import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyButton } from "@/components/CopyButton";
import { generatePromptForPlayer } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function PromptGeneratorPage({ params }: { params: Promise<{ playerId: string }> }) {
  const { playerId } = await params;
  const player = await prisma.player.findUnique({
    where: { id: playerId },
    include: { team: true, prompts: { orderBy: { promptVersion: "desc" } } },
  });
  if (!player) notFound();

  const action = generatePromptForPlayer.bind(null, player.id);

  return (
    <main className="page">
      <div className="page-header">
        <div>
          <div className="eyebrow">Prompt generator</div>
          <h1>
            {player.playerFirstName} {player.playerLastName}
          </h1>
          <p className="muted">Copy-ready Suno prompts for manual paste into Suno.</p>
        </div>
        <div className="actions">
          <Link className="button secondary" href={`/players/${player.id}`}>
            Player
          </Link>
          <form action={action}>
            <button className="button" type="submit">
              Generate Prompt
            </button>
          </form>
        </div>
      </div>

      <div className="grid">
        {player.prompts.map((prompt) => (
          <section className="card" key={prompt.id}>
            <div className="page-header">
              <div>
                <h2>Prompt Version {prompt.promptVersion}</h2>
                <p className="muted">
                  Target: {prompt.durationTargetSeconds} seconds · {prompt.isApprovedForSuno ? "Approved for Suno" : "Needs review"}
                </p>
              </div>
              <CopyButton text={prompt.promptText} />
            </div>
            <div className="prompt-box">{prompt.promptText}</div>
          </section>
        ))}
        {player.prompts.length === 0 ? <div className="card">No prompts yet.</div> : null}
      </div>
    </main>
  );
}
