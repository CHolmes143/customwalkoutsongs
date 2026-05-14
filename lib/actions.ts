"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  DeliveryStatus,
  SongApprovalStatus,
  TeamOrderStatus,
} from "@/lib/status";
import { prisma } from "@/lib/prisma";
import { generateSunoPrompt } from "@/lib/prompts";
import { encodeMusicStyles } from "@/lib/musicStyles";

function value(formData: FormData, key: string) {
  const item = formData.get(key);
  return typeof item === "string" && item.trim() ? item.trim() : null;
}

function numberValue(formData: FormData, key: string) {
  const raw = value(formData, key);
  return raw ? Number(raw) : null;
}

export async function createTeam(formData: FormData) {
  const team = await prisma.team.create({
    data: {
      teamName: value(formData, "teamName") ?? "Untitled Team",
      sport: value(formData, "sport") ?? "Baseball",
      ageGroup: value(formData, "ageGroup") ?? "",
      season: value(formData, "season"),
      organizationName: value(formData, "organizationName"),
      coachName: value(formData, "coachName"),
      teamContactName: value(formData, "teamContactName"),
      teamContactEmail: value(formData, "teamContactEmail"),
      teamContactPhone: value(formData, "teamContactPhone"),
      orderStatus: (value(formData, "orderStatus") as TeamOrderStatus) ?? "NEW",
      notes: value(formData, "notes"),
    },
  });

  await prisma.delivery.create({ data: { teamId: team.id } });

  // Future public order form and payment checkout can create Team records here.
  revalidatePath("/teams");
  redirect(`/teams/${team.id}`);
}

export async function updateTeam(teamId: string, formData: FormData) {
  await prisma.team.update({
    where: { id: teamId },
    data: {
      teamName: value(formData, "teamName") ?? "Untitled Team",
      sport: value(formData, "sport") ?? "Baseball",
      ageGroup: value(formData, "ageGroup") ?? "",
      season: value(formData, "season"),
      organizationName: value(formData, "organizationName"),
      coachName: value(formData, "coachName"),
      teamContactName: value(formData, "teamContactName"),
      teamContactEmail: value(formData, "teamContactEmail"),
      teamContactPhone: value(formData, "teamContactPhone"),
      orderStatus: (value(formData, "orderStatus") as TeamOrderStatus) ?? "NEW",
      notes: value(formData, "notes"),
    },
  });

  revalidatePath(`/teams/${teamId}`);
  redirect(`/teams/${teamId}`);
}

export async function createPlayer(teamId: string, formData: FormData) {
  const player = await prisma.player.create({
    data: playerData(teamId, formData),
  });

  // Future parent intake form can submit into Player fields through this boundary.
  revalidatePath(`/teams/${teamId}`);
  redirect(`/players/${player.id}`);
}

export async function updatePlayer(playerId: string, formData: FormData) {
  const existing = await prisma.player.findUniqueOrThrow({ where: { id: playerId } });

  await prisma.player.update({
    where: { id: playerId },
    data: playerData(existing.teamId, formData, existing.status),
  });

  revalidatePath(`/players/${playerId}`);
  redirect(`/players/${playerId}`);
}

function playerData(teamId: string, formData: FormData, status = "READY_FOR_PROMPT") {
  return {
    teamId,
    playerFirstName: value(formData, "playerFirstName") ?? "First",
    playerLastName: value(formData, "playerLastName") ?? "Last",
    jerseyNumber: value(formData, "jerseyNumber"),
    nickname: value(formData, "nickname") ?? "use first name",
    musicStyles: encodeMusicStyles(formData.getAll("musicStyles").filter((style): style is string => typeof style === "string")),
    parentName: value(formData, "parentName"),
    parentEmail: value(formData, "parentEmail"),
    parentContactNumber: value(formData, "parentContactNumber"),
    cleanLyricsRequired: true,
    status,
  };
}

export async function generatePromptForPlayer(playerId: string) {
  const player = await prisma.player.findUniqueOrThrow({
    where: { id: playerId },
    include: { team: true, prompts: { orderBy: { promptVersion: "desc" }, take: 1 } },
  });

  const promptVersion = (player.prompts[0]?.promptVersion ?? 0) + 1;
  const promptText = generateSunoPrompt(player);

  await prisma.songPrompt.create({
    data: {
      playerId,
      promptText,
      promptVersion,
      styleTags: player.musicStyles,
      durationTargetSeconds: 20,
      isApprovedForSuno: true,
    },
  });

  await prisma.player.update({
    where: { id: playerId },
    data: { status: "PROMPT_READY" },
  });

  // Future Suno/API integration can consume SongPrompt records after this point.
  revalidatePath(`/players/${playerId}`);
  redirect(`/players/${playerId}/prompts`);
}

export async function createDefaultSongVersions(playerId: string) {
  const latestPrompt = await prisma.songPrompt.findFirst({
    where: { playerId },
    orderBy: { promptVersion: "desc" },
  });

  const existingCount = await prisma.songVersion.count({ where: { playerId } });
  if (existingCount === 0) {
    await prisma.songVersion.createMany({
      data: [
        { playerId, promptId: latestPrompt?.id, versionName: "Version 1" },
        { playerId, promptId: latestPrompt?.id, versionName: "Version 2" },
      ],
    });
  }

  await prisma.player.update({ where: { id: playerId }, data: { status: "VERSIONS_CREATED" } });
  revalidatePath(`/players/${playerId}`);
}

export async function createSongVersion(playerId: string, formData: FormData) {
  const latestPrompt = await prisma.songPrompt.findFirst({
    where: { playerId },
    orderBy: { promptVersion: "desc" },
  });
  const count = await prisma.songVersion.count({ where: { playerId } });

  await prisma.songVersion.create({
    data: {
      playerId,
      promptId: latestPrompt?.id,
      versionName: value(formData, "versionName") ?? `Version ${count + 1}`,
      approvalStatus: (value(formData, "approvalStatus") as SongApprovalStatus) ?? "NEEDS_REVIEW",
    },
  });

  revalidatePath(`/players/${playerId}`);
}

export async function updateSongVersion(versionId: string, formData: FormData) {
  const existing = await prisma.songVersion.findUniqueOrThrow({ where: { id: versionId } });
  const selectedFinal = formData.get("selectedFinal") === "on";

  if (selectedFinal) {
    await prisma.songVersion.updateMany({
      where: { playerId: existing.playerId, id: { not: versionId } },
      data: { selectedFinal: false },
    });
  }

  await prisma.songVersion.update({
    where: { id: versionId },
    data: {
      versionName: value(formData, "versionName") ?? existing.versionName,
      sunoSongTitle: value(formData, "sunoSongTitle"),
      sunoUrl: value(formData, "sunoUrl"),
      audioFileUrl: value(formData, "audioFileUrl"),
      durationSeconds: numberValue(formData, "durationSeconds"),
      lyricsText: value(formData, "lyricsText"),
      internalNotes: value(formData, "internalNotes"),
      approvalStatus: (value(formData, "approvalStatus") as SongApprovalStatus) ?? "NEEDS_REVIEW",
      selectedFinal,
    },
  });

  if (selectedFinal) {
    await prisma.player.update({
      where: { id: existing.playerId },
      data: { status: "FINAL_SELECTED" },
    });
  }

  // Future file upload/storage can replace or populate audioFileUrl here.
  revalidatePath(`/players/${existing.playerId}`);
  revalidatePath(`/teams`);
}

export async function updateDelivery(deliveryId: string, formData: FormData) {
  const deliveryStatus = (value(formData, "deliveryStatus") as DeliveryStatus) ?? "NOT_STARTED";
  const delivery = await prisma.delivery.update({
    where: { id: deliveryId },
    data: {
      deliveryStatus,
      deliveryUrl: value(formData, "deliveryUrl"),
      finalNotes: value(formData, "finalNotes"),
      deliveredAt: deliveryStatus === "COMPLETE" ? new Date() : null,
    },
  });

  if (deliveryStatus === "COMPLETE") {
    await prisma.team.update({ where: { id: delivery.teamId }, data: { orderStatus: "DELIVERED" } });
  }

  // Future automated email delivery can send final links after this update.
  revalidatePath(`/teams/${delivery.teamId}/delivery`);
  redirect(`/teams/${delivery.teamId}/delivery`);
}
