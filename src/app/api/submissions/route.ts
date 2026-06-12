import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const submissionSchema = z.object({
  authorName: z.string().min(2),
  authorEmail: z.email(),
  affiliation: z.string().optional(),
  title: z.string().min(12),
  abstract: z.string().min(80),
  field: z.string().min(2),
  keywords: z.array(z.string()).default([]),
  fileName: z.string().min(1).default("manuscript.docx"),
  fileSize: z.number().int().nonnegative().default(0),
});

export async function POST(request: Request) {
  const json = await request.json();
  const parsed = submissionSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dữ liệu bản thảo chưa hợp lệ.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const year = new Date().getFullYear();
  const count = await prisma.manuscript.count({
    where: {
      submittedAt: {
        gte: new Date(`${year}-01-01T00:00:00.000Z`),
        lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
      },
    },
  });
  const code = `CS-${year}-${String(count + 1).padStart(3, "0")}`;

  const author = await prisma.user.upsert({
    where: { email: data.authorEmail.toLowerCase() },
    update: {
      name: data.authorName,
      affiliation: data.affiliation,
    },
    create: {
      email: data.authorEmail.toLowerCase(),
      name: data.authorName,
      affiliation: data.affiliation,
      role: "AUTHOR",
    },
  });

  const manuscript = await prisma.manuscript.create({
    data: {
      code,
      title: data.title,
      abstract: data.abstract,
      field: data.field,
      keywords: data.keywords,
      status: "SUBMITTED",
      authorId: author.id,
      files: {
        create: {
          kind: "MANUSCRIPT",
          fileName: data.fileName,
          storageKey: `submissions/${code}/${data.fileName}`,
          mimeType: "application/octet-stream",
          sizeBytes: data.fileSize,
        },
      },
      auditLogs: {
        create: {
          actorId: author.id,
          action: "SUBMISSION_CREATED",
          detail: "Tác giả nộp bản thảo qua cổng trực tuyến.",
        },
      },
    },
    select: {
      id: true,
      code: true,
      status: true,
    },
  });

  return NextResponse.json(manuscript, { status: 201 });
}
