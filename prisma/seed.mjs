import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const samplePlayers = [
  { playerFirstName: "Kanyon", playerLastName: "Gold", nickname: "KG" },
  { playerFirstName: "Mason", playerLastName: "Brooks", nickname: "Mase" },
  { playerFirstName: "Liam", playerLastName: "Carter", nickname: "Lightning" },
  { playerFirstName: "Noah", playerLastName: "Davis", nickname: "No-No" },
  { playerFirstName: "Easton", playerLastName: "Reed", nickname: "Easty" },
  { playerFirstName: "Wyatt", playerLastName: "Hayes", nickname: "Wild Wyatt" },
  { playerFirstName: "Hudson", playerLastName: "Miller", nickname: "Huddy" },
  { playerFirstName: "Grayson", playerLastName: "Parker", nickname: "Gray" },
  { playerFirstName: "Cooper", playerLastName: "Johnson", nickname: "Coop" },
  { playerFirstName: "Beckett", playerLastName: "Stone", nickname: "Beck" },
  { playerFirstName: "Jaxon", playerLastName: "Wells", nickname: "Jax" },
  { playerFirstName: "Ryder", playerLastName: "Cole", nickname: "Ry" },
];

async function main() {
  const team = await prisma.team.upsert({
    where: { id: "sample-kanyons-gold" },
    update: {},
    create: {
      id: "sample-kanyons-gold",
      teamName: "DS Tigers Gold 8U",
      sport: "Baseball",
      ageGroup: "6U or 7U",
      season: "Spring/Summer",
      organizationName: "Gold All Stars",
      coachName: "Coach TBD",
      teamContactName: "Team Parent TBD",
      teamContactEmail: "team@example.com",
      teamContactPhone: "555-0100",
      orderStatus: "NEW",
      notes: "Sample team for the walkout song workflow MVP.",
      deliveries: {
        create: {
          deliveryStatus: "NOT_STARTED",
          finalNotes: "Final MP3 delivery links will be tracked here.",
        },
      },
      players: {
        create: samplePlayers.map((player, index) => ({
          ...player,
          jerseyNumber: String(index + 1),
          musicStyles: JSON.stringify(index % 2 === 0 ? ["Country", "Modern Pop"] : ["80's Rock", "Rap Pop"]),
          parentName: "Parent TBD",
          parentEmail: "parent@example.com",
          parentContactNumber: "555-0100",
          status: "READY_FOR_PROMPT",
          cleanLyricsRequired: true,
        })),
      },
    },
  });

  console.log(`Seeded ${team.teamName}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
