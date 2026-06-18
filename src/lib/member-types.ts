export const memberGroups = [
  "EDITORIAL_BOARD",
  "EXECUTIVE",
  "CONTENT",
  "COMMUNICATION",
  "HUMAN_RESOURCES",
] as const;

export type MemberGroupValue = (typeof memberGroups)[number];

export type PublicJournalMember = {
  id: string;
  name: string;
  academicTitle: string | null;
  role: string;
  organization: string | null;
  bio: string;
  email: string | null;
  photoUrl: string | null;
  group: MemberGroupValue;
  sortOrder: number;
};

export const memberGroupLabels: Record<MemberGroupValue, string> = {
  EDITORIAL_BOARD: "Ban biên tập",
  EXECUTIVE: "Ban Điều hành",
  CONTENT: "Ban Nội dung",
  COMMUNICATION: "Ban Truyền thông",
  HUMAN_RESOURCES: "Ban Nhân sự",
};
