import {
  Archive,
  BookOpenCheck,
  ClipboardCheck,
  FileCheck2,
  FileSignature,
  Gauge,
  LayoutDashboard,
  LibraryBig,
  LockKeyhole,
  PenLine,
  Scale,
  ShieldCheck,
  UserCheck,
  UserCog,
  Users,
} from "lucide-react";

export const journalName = "Chuyên san Khoa học Kinh tế - Luật";

export const navItems = [
  { href: "/", label: "Tạp chí", icon: LibraryBig },
  { href: "/gioi-thieu", label: "Giới thiệu", icon: BookOpenCheck },
  { href: "/luu-tru", label: "Lưu trữ", icon: Archive },
  { href: "/tac-gia", label: "Tác giả", icon: PenLine },
  { href: "/phan-bien", label: "Phản biện", icon: ClipboardCheck },
  { href: "/workspace", label: "Workspace", icon: LayoutDashboard },
];

export const authLinks = [
  { href: "/dang-nhap", label: "Đăng nhập", icon: LockKeyhole },
  { href: "/dang-ky", label: "Đăng ký", icon: UserCheck },
];

export const roleJurisdictions = [
  {
    role: "Tác giả",
    code: "AUTHOR",
    icon: FileSignature,
    scope: "Hồ sơ và bản thảo của chính mình",
    permissions: [
      "Tạo bản thảo nháp và nộp hồ sơ",
      "Theo dõi trạng thái xử lý",
      "Gửi bản sửa và thư giải trình",
      "Xem quyết định biên tập đã công bố cho mình",
    ],
  },
  {
    role: "Phản biện",
    code: "REVIEWER",
    icon: ClipboardCheck,
    scope: "Bản thảo được mời hoặc được phân công",
    permissions: [
      "Nhận hoặc từ chối lời mời phản biện",
      "Đọc bản thảo ẩn danh",
      "Gửi nhận xét cho tác giả và ghi chú mật cho biên tập",
      "Đề xuất chấp nhận, sửa nhỏ, sửa lớn hoặc từ chối",
    ],
  },
  {
    role: "Biên tập viên",
    code: "SECTION_EDITOR",
    icon: UserCheck,
    scope: "Chuyên mục được giao phụ trách",
    permissions: [
      "Sàng lọc hình thức và đạo đức công bố",
      "Mời phản biện và theo dõi hạn xử lý",
      "Tổng hợp nhận xét và yêu cầu sửa bài",
      "Đề xuất quyết định cho tổng biên tập",
    ],
  },
  {
    role: "Tổng biên tập",
    code: "EDITOR_IN_CHIEF",
    icon: Scale,
    scope: "Toàn bộ quy trình học thuật",
    permissions: [
      "Phân công biên tập viên phụ trách",
      "Ra quyết định gửi phản biện, sửa, chấp nhận hoặc từ chối",
      "Duyệt bài vào số xuất bản",
      "Giám sát chất lượng và xung đột lợi ích",
    ],
  },
  {
    role: "Quản trị",
    code: "ADMIN",
    icon: ShieldCheck,
    scope: "Hệ thống, người dùng, cấu hình tạp chí",
    permissions: [
      "Quản lý tài khoản, vai trò và trạng thái hoạt động",
      "Cấu hình chuyên mục, số xuất bản, biểu mẫu",
      "Xem nhật ký hệ thống và sao lưu dữ liệu",
      "Khóa phiên đăng nhập hoặc vô hiệu hóa tài khoản",
    ],
  },
];

export const manuscripts = [
  {
    code: "CS-2026-014",
    title: "Năng lực chuyển đổi số trong quản trị công tại đô thị lớn",
    author: "Nguyễn Minh Anh",
    field: "Quản trị công",
    status: "Đang phản biện",
    accent: "blue",
    progress: 66,
    reviews: "2/3",
    due: "18/06/2026",
  },
  {
    code: "CS-2026-011",
    title: "Tác động của dữ liệu mở đến năng lực cạnh tranh địa phương",
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
    title: "Bảo vệ người tiêu dùng trong giao dịch thương mại điện tử",
    author: "Lê Thảo Vy",
    field: "Luật kinh tế",
    status: "Chờ biên tập",
    accent: "green",
    progress: 82,
    reviews: "2/2",
    due: "24/06/2026",
  },
  {
    code: "CS-2026-006",
    title: "Quản trị AI có trách nhiệm trong phân tích dữ liệu tài chính",
    author: "Phạm Quốc Huy",
    field: "Tài chính",
    status: "Đã chấp nhận",
    accent: "dark",
    progress: 100,
    reviews: "3/3",
    due: "Đóng",
  },
];

export const issueArticles = [
  {
    title: "Chuyển đổi số và hiệu quả quản trị công tại đô thị lớn",
    authors: "Nguyễn Minh Anh, Lê Hữu Phúc",
    pages: "05-18",
    field: "Quản trị công",
  },
  {
    title: "Dữ liệu mở cho hoạch định chính sách phát triển địa phương",
    authors: "Trần Hoàng Nam",
    pages: "19-34",
    field: "Chính sách công",
  },
  {
    title: "Cơ chế bảo vệ người tiêu dùng trong nền tảng số",
    authors: "Đỗ Bảo Châu, Phạm Hà",
    pages: "35-46",
    field: "Luật kinh tế",
  },
  {
    title: "AI có trách nhiệm trong phân tích dữ liệu tài chính",
    authors: "Phạm Quốc Huy",
    pages: "47-62",
    field: "Tài chính",
  },
];

export const metrics = [
  { label: "Bản thảo mới", value: "35", helper: "189 hồ sơ đã xử lý" },
  { label: "Đang phản biện", value: "21", helper: "66% đúng hạn" },
  { label: "Bài đã xuất bản", value: "128", helper: "12 số lưu trữ" },
  { label: "Phản biện viên", value: "74", helper: "18 chuyên ngành" },
];

export const workflow = [
  "Tác giả nộp bài",
  "Sàng lọc hình thức",
  "Phân công biên tập",
  "Mời phản biện",
  "Tổng hợp nhận xét",
  "Sửa bài",
  "Quyết định",
  "Xuất bản",
];

export const workspaceCards = [
  {
    href: "/workspace/author",
    title: "Không gian tác giả",
    icon: FileSignature,
    detail: "Nộp bài, bổ sung hồ sơ, gửi bản sửa và theo dõi từng vòng xử lý.",
  },
  {
    href: "/workspace/reviewer",
    title: "Không gian phản biện",
    icon: ClipboardCheck,
    detail: "Quản lý lời mời, hạn phản biện, biểu mẫu nhận xét và khuyến nghị.",
  },
  {
    href: "/workspace/editor",
    title: "Không gian biên tập",
    icon: FileCheck2,
    detail: "Sàng lọc, phân công phản biện, tổng hợp nhận xét và chuẩn bị quyết định.",
  },
  {
    href: "/workspace/admin",
    title: "Quản trị hệ thống",
    icon: UserCog,
    detail: "Quản lý người dùng, vai trò, chuyên mục, số xuất bản và nhật ký.",
  },
];

export const adminTools = [
  { label: "Người dùng", value: "182", icon: Users },
  { label: "Vai trò", value: "5", icon: ShieldCheck },
  { label: "Số xuất bản", value: "12", icon: Archive },
  { label: "Bản thảo", value: "247", icon: FileSignature },
];

export const pageStats = [
  { label: "Thời gian sàng lọc trung vị", value: "11 ngày", icon: Gauge },
  { label: "Hồ sơ đủ metadata", value: "94%", icon: FileCheck2 },
  { label: "Tỷ lệ đúng hạn phản biện", value: "66%", icon: ClipboardCheck },
];
