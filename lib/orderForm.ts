export const musicStyleOptions = [
  "Country Rock",
  "Alt Rock",
  "Pop Punk",
  "Trap / Hip Hop",
  "Hard Rock/Metal",
];

export const orderFieldLabels = {
  playerDivision: "Player Division",
  teamName: "Team Name",
  playerFirstName: "Player First Name",
  playerLastName: "Player Last Name",
  jerseyNumber: "Jersey Number",
  musicStyle: "Music Style",
  rushOrder: "Is this a rush order (+$25)?",
  parentGuardianName: "Parent/Guardian Name",
  parentGuardianPhoneNumber: "Parent/Guardian Phone Number",
  parentGuardianEmail: "Parent/Guardian Email",
} as const;

export type OrderFormPayload = Record<keyof typeof orderFieldLabels, string>;

export function normalizeOrderPayload(input: Partial<OrderFormPayload>): OrderFormPayload {
  return {
    playerDivision: input.playerDivision?.trim() ?? "",
    teamName: input.teamName?.trim() ?? "",
    playerFirstName: input.playerFirstName?.trim() ?? "",
    playerLastName: input.playerLastName?.trim() ?? "",
    jerseyNumber: input.jerseyNumber?.trim() ?? "",
    musicStyle: input.musicStyle?.trim() ?? "",
    rushOrder: input.rushOrder?.trim() ?? "No",
    parentGuardianName: input.parentGuardianName?.trim() ?? "",
    parentGuardianPhoneNumber: input.parentGuardianPhoneNumber?.trim() ?? "",
    parentGuardianEmail: input.parentGuardianEmail?.trim() ?? "",
  };
}
