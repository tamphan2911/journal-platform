import {
  Archive,
  ClipboardCheck,
  FileSignature,
  LayoutDashboard,
  LibraryBig,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Tạp chí", icon: LibraryBig },
  { href: "/nop-bai", label: "Nộp bài", icon: FileSignature },
  { href: "/dashboard", label: "Điều hành", icon: LayoutDashboard },
  { href: "/luu-tru", label: "Lưu trữ", icon: Archive },
];

export const roles = [
  {
    title: "Tác giả",
    icon: FileSignature,
    detail: "Nộp bản thảo, theo dõi phản biện, gửi bản sửa và thư giải trình.",
    stats: "26 hồ sơ",
  },
  {
    title: "Phản biện",
    icon: ClipboardCheck,
    detail: "Nhận lời mời, đọc bản thảo ẩn danh, gửi nhận xét và khuyến nghị.",
    stats: "14 hạn xử lý",
  },
  {
    title: "Biên tập viên",
    icon: UserCheck,
    detail: "Sàng lọc, phân công phản biện, ra quyết định và quản lý vòng sửa.",
    stats: "9 đang chờ",
  },
  {
    title: "Quản trị",
    icon: ShieldCheck,
    detail: "Quản lý người dùng, chuyên mục, kỳ xuất bản, chỉ số và nhật ký hệ thống.",
    stats: "182 người dùng",
  },
];

export const manuscripts = [
  {
    code: "CS-2026-014",
    title: "Năng lực chuyển đổi số trong quản trị giáo dục đại học",
    author: "Nguyễn Minh Anh",
    field: "Giáo dục",
    status: "Đang phản biện",
    accent: "blue",
    progress: 66,
    reviews: "2/3",
    due: "18/06/2026",
  },
  {
    code: "CS-2026-011",
    title: "Tác động của dữ liệu mở đến đổi mới sáng tạo địa phương",
    author: "Trần Hoàng Nam",
    field: "Kinh tế số",
    status: "Yêu cầu sửa",
    accent: "cyan",
    progress: 48,
    reviews: "3/3",
    due: "21/06/2026",
  },
  {
    code: "CS-2026-009",
    title: "Mô hình chăm sóc sức khỏe cộng đồng dựa trên bằng chứng",
    author: "Lê Thảo Vy",
    field: "Y tế công cộng",
    status: "Chờ biên tập",
    accent: "green",
    progress: 82,
    reviews: "2/2",
    due: "24/06/2026",
  },
  {
    code: "CS-2026-006",
    title: "Đạo đức AI trong phân tích dữ liệu khoa học xã hội",
    author: "Phạm Quốc Huy",
    field: "Công nghệ",
    status: "Đã chấp nhận",
    accent: "dark",
    progress: 100,
    reviews: "3/3",
    due: "Đóng",
  },
];

export const issueArticles = [
  {
    title: "Chuyển đổi số và năng lực nghiên cứu trong trường đại học",
    authors: "Nguyễn Minh Anh, Lê Hữu Phúc",
    pages: "05-18",
    field: "Giáo dục",
  },
  {
    title: "Dữ liệu mở cho hoạch định chính sách địa phương",
    authors: "Trần Hoàng Nam",
    pages: "19-34",
    field: "Chính sách công",
  },
  {
    title: "Mô hình phản biện kín trong tạp chí chuyên ngành",
    authors: "Đỗ Bảo Châu, Phạm Hà",
    pages: "35-46",
    field: "Xuất bản khoa học",
  },
  {
    title: "AI có trách nhiệm trong phân tích dữ liệu xã hội",
    authors: "Phạm Quốc Huy",
    pages: "47-62",
    field: "Công nghệ",
  },
];

export const metrics = [
  { label: "Bản thảo mới", value: "35", helper: "189 đã xử lý" },
  { label: "Đang phản biện", value: "21", helper: "66% đúng hạn" },
  { label: "Bài đã xuất bản", value: "128", helper: "12 số lưu trữ" },
  { label: "Phản biện viên", value: "74", helper: "18 chuyên ngành" },
];

export const workflow = [
  "Tác giả nộp bài",
  "Sàng lọc hình thức",
  "Phân công phản biện",
  "Tổng hợp nhận xét",
  "Sửa bài",
  "Quyết định",
  "Xuất bản",
];

export const adminTools = [
  { label: "Người dùng", value: "182", icon: Users },
  { label: "Vai trò", value: "5", icon: ShieldCheck },
  { label: "Kỳ xuất bản", value: "12", icon: Archive },
  { label: "Bản thảo", value: "247", icon: FileSignature },
];
