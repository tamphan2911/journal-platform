ALTER TABLE "Manuscript"
  ADD COLUMN "submissionStep" INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN "declarations" JSONB,
  ADD COLUMN "funding" TEXT,
  ADD COLUMN "authorsConfirmed" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "completedAt" TIMESTAMP(3);

ALTER TABLE "SubmissionFile"
  ADD COLUMN "data" BYTEA;

CREATE TABLE "ManuscriptContributor" (
  "id" TEXT NOT NULL,
  "manuscriptId" TEXT NOT NULL,
  "firstName" TEXT NOT NULL,
  "middleLastName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "affiliation" TEXT NOT NULL,
  "bio" TEXT,
  "isCorresponding" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "ManuscriptContributor_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ManuscriptContributor_manuscriptId_sortOrder_idx"
  ON "ManuscriptContributor"("manuscriptId", "sortOrder");

ALTER TABLE "ManuscriptContributor"
  ADD CONSTRAINT "ManuscriptContributor_manuscriptId_fkey"
  FOREIGN KEY ("manuscriptId") REFERENCES "Manuscript"("id")
  ON DELETE CASCADE ON UPDATE CASCADE;
