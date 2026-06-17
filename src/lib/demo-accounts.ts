import type { Role } from "@/generated/prisma/enums";

export const demoAccounts: Array<{
  label: string;
  role: Role;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organization: string;
  affiliation: string;
  profession: string;
}> = [
  {
    label: "Admin",
    role: "ADMIN",
    email: "admin@chuyensan.vn",
    password: "Admin@2026!",
    firstName: "System",
    lastName: "Admin",
    organization: "Chuyên san Khoa học Kinh tế - Luật",
    affiliation: "Quản trị hệ thống",
    profession: "Administrator",
  },
  {
    label: "Editor",
    role: "SECTION_EDITOR",
    email: "editor@chuyensan.vn",
    password: "Editor@2026!",
    firstName: "Hoài",
    lastName: "Nam",
    organization: "Trường Đại học Kinh tế - Luật",
    affiliation: "Ban biên tập chuyên mục",
    profession: "Lecturer",
  },
  {
    label: "Chief editor",
    role: "EDITOR_IN_CHIEF",
    email: "chief.editor@chuyensan.vn",
    password: "Chief@2026!",
    firstName: "Minh",
    lastName: "Khang",
    organization: "Trường Đại học Kinh tế - Luật",
    affiliation: "Hội đồng biên tập",
    profession: "Lecturer",
  },
  {
    label: "Author",
    role: "AUTHOR",
    email: "author@example.edu.vn",
    password: "Author@2026!",
    firstName: "Minh",
    lastName: "Anh",
    organization: "Trường Đại học Khoa học",
    affiliation: "Khoa Chính sách công",
    profession: "Researcher",
  },
  {
    label: "Reviewer",
    role: "REVIEWER",
    email: "reviewer@chuyensan.vn",
    password: "Reviewer@2026!",
    firstName: "Bảo",
    lastName: "Châu",
    organization: "Viện Nghiên cứu Dữ liệu",
    affiliation: "Nhóm Kinh tế số",
    profession: "Researcher",
  },
  {
    label: "Normal user",
    role: "USER",
    email: "user@example.edu.vn",
    password: "User@2026!",
    firstName: "Thanh",
    lastName: "Bình",
    organization: "Trường Đại học Kinh tế - Luật",
    affiliation: "Khoa Kinh tế",
    profession: "Student",
  },
];
