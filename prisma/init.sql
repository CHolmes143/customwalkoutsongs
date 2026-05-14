PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "Team" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "teamName" TEXT NOT NULL,
  "sport" TEXT NOT NULL DEFAULT 'Baseball',
  "ageGroup" TEXT NOT NULL,
  "season" TEXT,
  "organizationName" TEXT,
  "coachName" TEXT,
  "teamContactName" TEXT,
  "teamContactEmail" TEXT,
  "teamContactPhone" TEXT,
  "orderStatus" TEXT NOT NULL DEFAULT 'NEW',
  "notes" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Player" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "teamId" TEXT NOT NULL,
  "playerFirstName" TEXT NOT NULL,
  "playerLastName" TEXT NOT NULL,
  "jerseyNumber" TEXT,
  "nickname" TEXT,
  "musicStyles" TEXT,
  "parentName" TEXT,
  "parentEmail" TEXT,
  "parentContactNumber" TEXT,
  "cleanLyricsRequired" BOOLEAN NOT NULL DEFAULT true,
  "status" TEXT NOT NULL DEFAULT 'NEEDS_INTAKE',
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Player_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "SongPrompt" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "playerId" TEXT NOT NULL,
  "promptText" TEXT NOT NULL,
  "promptVersion" INTEGER NOT NULL DEFAULT 1,
  "styleTags" TEXT,
  "durationTargetSeconds" INTEGER NOT NULL DEFAULT 20,
  "isApprovedForSuno" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SongPrompt_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "SongVersion" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "playerId" TEXT NOT NULL,
  "promptId" TEXT,
  "versionName" TEXT NOT NULL,
  "sunoSongTitle" TEXT,
  "sunoUrl" TEXT,
  "audioFileUrl" TEXT,
  "durationSeconds" INTEGER,
  "lyricsText" TEXT,
  "internalNotes" TEXT,
  "approvalStatus" TEXT NOT NULL DEFAULT 'NEEDS_REVIEW',
  "selectedFinal" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "SongVersion_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "SongVersion_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "SongPrompt" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Delivery" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "teamId" TEXT NOT NULL,
  "deliveryStatus" TEXT NOT NULL DEFAULT 'NOT_STARTED',
  "deliveryUrl" TEXT,
  "finalNotes" TEXT,
  "deliveredAt" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Delivery_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS "Player_teamId_idx" ON "Player"("teamId");
CREATE INDEX IF NOT EXISTS "SongPrompt_playerId_idx" ON "SongPrompt"("playerId");
CREATE INDEX IF NOT EXISTS "SongVersion_playerId_idx" ON "SongVersion"("playerId");
CREATE INDEX IF NOT EXISTS "SongVersion_promptId_idx" ON "SongVersion"("promptId");
CREATE INDEX IF NOT EXISTS "Delivery_teamId_idx" ON "Delivery"("teamId");
