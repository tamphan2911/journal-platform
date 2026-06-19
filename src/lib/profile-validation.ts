import { z } from "zod";

const optionalUrl = z.union([
  z.literal(""),
  z.string().trim().url().refine((value) => value.startsWith("https://") || value.startsWith("http://"), "Liên kết phải dùng HTTP hoặc HTTPS."),
]);

export const profileInputSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(30).optional().default(""),
  facebookUrl: optionalUrl.optional().default(""),
  organization: z.string().trim().max(220).optional().default(""),
  affiliation: z.string().trim().max(220).optional().default(""),
  profession: z.string().trim().max(120).optional().default(""),
  orcid: z.string().trim().max(40).optional().default(""),
});
