import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const declarationSchema = z.object({
  copyright: z.literal(true),
  originality: z.literal(true),
  plagiarismCheck: z.literal(true),
  aiUse: z.literal(true),
  conflictOfInterest: z.literal(true),
  publicationEthics: z.literal(true),
});

export const submissionInfoSchema = z.object({
  manuscriptId: z.string().optional(),
  issueId: z.string().min(1),
  section: z.string().trim().min(2).max(120),
  title: z.string().trim().min(10).max(500),
  declarations: declarationSchema,
});

export const contributorSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  middleLastName: z.string().trim().min(1).max(120),
  email: z.string().trim().email(),
  affiliation: z.string().trim().min(2).max(240),
  bio: z.string().trim().max(1000).optional().default(""),
  isCorresponding: z.boolean(),
});

export const authorsSchema = z.object({
  confirmed: z.literal(true),
  authors: z.array(contributorSchema).min(1).max(30),
}).refine((data) => data.authors.filter((author) => author.isCorresponding).length === 1, "Phải có đúng một tác giả liên hệ.");

export const metadataSchema = z.object({
  abstract: z.string().trim().min(40),
  keywords: z.array(z.string().trim().min(1).max(80)).min(1).max(10),
  funding: z.string().trim().max(1000).optional().default(""),
}).refine((data) => data.abstract.split(/\s+/u).filter(Boolean).length <= 200, "Tóm tắt không được vượt quá 200 từ.");

export async function findOwnedDraft(id: string, userId: string) {
  return prisma.manuscript.findFirst({ where: { id, authorId: userId, status: "DRAFT" }, select: { id: true, code: true } });
}
