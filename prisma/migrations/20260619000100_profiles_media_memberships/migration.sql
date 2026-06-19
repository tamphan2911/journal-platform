ALTER TABLE "User"
  ADD COLUMN "phone" TEXT,
  ADD COLUMN "facebookUrl" TEXT,
  ADD COLUMN "avatarId" TEXT;

CREATE TABLE "MediaAsset" (
  "id" TEXT NOT NULL,
  "fileName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "sizeBytes" INTEGER NOT NULL,
  "width" INTEGER,
  "height" INTEGER,
  "data" BYTEA NOT NULL,
  "uploadedById" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "JournalMember"
  ADD COLUMN "userId" TEXT,
  ADD COLUMN "note" TEXT;

CREATE UNIQUE INDEX "User_avatarId_key" ON "User"("avatarId");
CREATE INDEX "MediaAsset_createdAt_idx" ON "MediaAsset"("createdAt");
CREATE INDEX "MediaAsset_uploadedById_idx" ON "MediaAsset"("uploadedById");
CREATE INDEX "JournalMember_userId_idx" ON "JournalMember"("userId");
CREATE UNIQUE INDEX "JournalMember_userId_group_term_key" ON "JournalMember"("userId", "group", "term");

ALTER TABLE "User"
  ADD CONSTRAINT "User_avatarId_fkey"
  FOREIGN KEY ("avatarId") REFERENCES "MediaAsset"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "MediaAsset"
  ADD CONSTRAINT "MediaAsset_uploadedById_fkey"
  FOREIGN KEY ("uploadedById") REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "JournalMember"
  ADD CONSTRAINT "JournalMember_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;
