import { unstable_cache } from "next/cache";
import { connection } from "next/server";
import { z } from "zod";
import { memberGroups, type PublicJournalMember } from "@/lib/member-types";
import { prisma } from "@/lib/prisma";

const optionalImage = z
  .string()
  .trim()
  .max(500)
  .refine((value) => !value || value.startsWith("/") || URL.canParse(value), "Đường dẫn ảnh không hợp lệ.");

export const journalMemberInputSchema = z.object({
  name: z.string().trim().min(2).max(120),
  academicTitle: z.string().trim().max(40).optional().default(""),
  role: z.string().trim().min(2).max(140),
  organization: z.string().trim().max(220).optional().default(""),
  bio: z.string().trim().min(10).max(1200),
  email: z.union([z.literal(""), z.string().trim().email()]).optional().default(""),
  photoUrl: optionalImage.optional().default(""),
  group: z.enum(memberGroups),
  term: z.string().trim().regex(/^\d{4}-\d{4}$/, "Nhiệm kỳ phải có định dạng 2024-2025."),
  sortOrder: z.coerce.number().int().min(0).max(9999),
  isActive: z.boolean(),
});

export const fallbackJournalMembers: PublicJournalMember[] = [
  {
    id: "fallback-editor",
    name: "Nguyễn Minh Anh",
    academicTitle: "PGS.TS.",
    role: "Tổng biên tập",
    organization: "Trường Đại học Kinh tế - Luật, ĐHQG-HCM",
    bio: "Phụ trách định hướng học thuật, chính sách biên tập và chất lượng công bố của Chuyên san.",
    email: "minhanh@uel.edu.vn",
    photoUrl: "/demo-members/member-01.jpg",
    group: "EDITORIAL_BOARD",
    term: "2024-2025",
    sortOrder: 10,
  },
  {
    id: "fallback-executive",
    name: "Phạm Đức Long",
    academicTitle: "PGS.TS.",
    role: "Trưởng Ban Điều hành",
    organization: "Trường Đại học Kinh tế - Luật, ĐHQG-HCM",
    bio: "Tổ chức kế hoạch hoạt động và phối hợp nguồn lực cho các kỳ xuất bản của Chuyên san.",
    email: null,
    photoUrl: "/demo-members/member-03.jpg",
    group: "EXECUTIVE",
    term: "2024-2025",
    sortOrder: 10,
  },
  {
    id: "fallback-content",
    name: "Đỗ Hoàng Nam",
    academicTitle: "TS.",
    role: "Trưởng Ban Nội dung",
    organization: "Khoa Kinh tế, UEL",
    bio: "Phụ trách kế hoạch chủ đề, chất lượng bản thảo và quy trình chuẩn hóa nội dung.",
    email: null,
    photoUrl: "/demo-members/member-02.jpg",
    group: "CONTENT",
    term: "2024-2025",
    sortOrder: 10,
  },
  {
    id: "fallback-communication",
    name: "Bùi Quốc Khánh",
    academicTitle: "ThS.",
    role: "Trưởng Ban Truyền thông",
    organization: "Trung tâm Truyền thông, UEL",
    bio: "Phát triển nội dung truyền thông và kết nối kết quả nghiên cứu với cộng đồng.",
    email: null,
    photoUrl: "/demo-members/member-03.jpg",
    group: "COMMUNICATION",
    term: "2024-2025",
    sortOrder: 10,
  },
  {
    id: "fallback-hr",
    name: "Lê Thanh Tùng",
    academicTitle: "ThS.",
    role: "Trưởng Ban Nhân sự",
    organization: "Trường Đại học Kinh tế - Luật, ĐHQG-HCM",
    bio: "Điều phối nhân sự cộng tác, chuyên gia phản biện và hoạt động phát triển năng lực.",
    email: null,
    photoUrl: "/demo-members/member-02.jpg",
    group: "HUMAN_RESOURCES",
    term: "2024-2025",
    sortOrder: 10,
  },
];

const readJournalMembers = unstable_cache(
  async () =>
    prisma.journalMember.findMany({
      where: { isActive: true },
      orderBy: [{ term: "desc" }, { group: "asc" }, { sortOrder: "asc" }, { name: "asc" }],
      select: {
        id: true,
        name: true,
        academicTitle: true,
        role: true,
        organization: true,
        bio: true,
        email: true,
        photoUrl: true,
        group: true,
        term: true,
        sortOrder: true,
      },
    }),
  ["journal-members"],
  { revalidate: 300, tags: ["journal-members"] },
);

export async function getJournalMembers(): Promise<PublicJournalMember[]> {
  await connection();
  try {
    const members = await readJournalMembers();
    return members.length ? members : fallbackJournalMembers;
  } catch {
    return fallbackJournalMembers;
  }
}
