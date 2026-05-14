import { musicStyleSummary } from "@/lib/musicStyles";

type PromptInput = {
  playerFirstName: string;
  playerLastName: string;
  jerseyNumber?: string | null;
  nickname?: string | null;
  musicStyles?: string | null;
  cleanLyricsRequired: boolean;
  team: {
    teamName: string;
    sport: string;
    ageGroup: string;
  };
};

export function generateSunoPrompt(player: PromptInput) {
  const fullName = `${player.playerFirstName} ${player.playerLastName}`.trim();
  const jersey = player.jerseyNumber ? `#${player.jerseyNumber}` : "their jersey number";
  const nickname =
    player.nickname && player.nickname.toLowerCase() !== "use first name"
      ? ` Nickname to include if it fits naturally: "${player.nickname}".`
      : ` Use the player's first name, ${player.playerFirstName}, in the song.`;
  const clean = player.cleanLyricsRequired
    ? "Clean lyrics are required."
    : "Keep the lyrics family-friendly and appropriate for a youth sports event.";
  const musicStyles = musicStyleSummary(player.musicStyles);

  return [
    `Create a short youth baseball walkout song for ${fullName}, jersey ${jersey}, on ${player.team.teamName}.`,
    `${nickname}Team context: ${player.team.ageGroup} ${player.team.sport}.`,
    `Music direction: ${musicStyles}. Make it a high-energy youth baseball walkout song with a stadium-ready hook.`,
    `${clean} Avoid profanity, insults, adult themes, copyrighted lyrics, and references to real copyrighted songs.`,
    "Requirements: high-energy intro, strong hook within the first 5 seconds, include the player name and jersey number, no profanity, no copyrighted lyrics, no references to real copyrighted songs or melodies, no adult themes, and make it exciting for a family-friendly youth baseball crowd.",
    "Total length must be 15-20 seconds and under 20 seconds overall.",
    "Return only original lyrics and performance direction suitable to paste into Suno.",
  ].join("\n\n");
}
