CREATE TYPE "MemberGroup" AS ENUM (
  'EDITORIAL_BOARD',
  'EXECUTIVE',
  'CONTENT',
  'COMMUNICATION',
  'HUMAN_RESOURCES'
);

CREATE TABLE "JournalMember" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "academicTitle" TEXT,
  "role" TEXT NOT NULL,
  "organization" TEXT,
  "bio" TEXT NOT NULL,
  "email" TEXT,
  "photoUrl" TEXT,
  "group" "MemberGroup" NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "JournalMember_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "JournalMember_group_isActive_sortOrder_idx"
  ON "JournalMember"("group", "isActive", "sortOrder");

INSERT INTO "JournalMember"
  ("id", "name", "academicTitle", "role", "organization", "bio", "email", "photoUrl", "group", "sortOrder", "updatedAt")
VALUES
  ('demo-editor-01', 'Nguyễn Minh Anh', 'PGS.TS.', 'Tổng biên tập', 'Trường Đại học Kinh tế - Luật, ĐHQG-HCM', 'Phụ trách định hướng học thuật, chính sách biên tập và chất lượng công bố của Chuyên san.', 'minhanh@uel.edu.vn', '/demo-members/member-01.jpg', 'EDITORIAL_BOARD', 10, CURRENT_TIMESTAMP),
  ('demo-editor-02', 'Trần Quốc Huy', 'TS.', 'Phó Tổng biên tập', 'Trường Đại học Kinh tế - Luật, ĐHQG-HCM', 'Điều phối hoạt động phản biện và phát triển mạng lưới chuyên gia trong lĩnh vực kinh tế và chính sách.', 'quochuy@uel.edu.vn', '/demo-members/member-02.jpg', 'EDITORIAL_BOARD', 20, CURRENT_TIMESTAMP),
  ('demo-editor-03', 'Lê Thu Hà', 'TS.', 'Ủy viên Ban biên tập', 'Khoa Luật Kinh tế, UEL', 'Phụ trách chuyên môn về pháp luật kinh doanh, quản trị công và chuẩn mực đạo đức nghiên cứu.', 'thuha@uel.edu.vn', '/demo-members/member-04.jpg', 'EDITORIAL_BOARD', 30, CURRENT_TIMESTAMP),
  ('demo-executive-01', 'Phạm Đức Long', 'PGS.TS.', 'Trưởng Ban Điều hành', 'Trường Đại học Kinh tế - Luật, ĐHQG-HCM', 'Tổ chức kế hoạch hoạt động và phối hợp nguồn lực cho các kỳ xuất bản của Chuyên san.', NULL, '/demo-members/member-03.jpg', 'EXECUTIVE', 10, CURRENT_TIMESTAMP),
  ('demo-executive-02', 'Võ Thanh Mai', 'ThS.', 'Thư ký điều hành', 'Phòng Quản lý khoa học, UEL', 'Theo dõi tiến độ, hồ sơ và các hoạt động phối hợp giữa các ban chuyên môn.', NULL, '/demo-members/member-01.jpg', 'EXECUTIVE', 20, CURRENT_TIMESTAMP),
  ('demo-content-01', 'Đỗ Hoàng Nam', 'TS.', 'Trưởng Ban Nội dung', 'Khoa Kinh tế, UEL', 'Phụ trách kế hoạch chủ đề, chất lượng bản thảo và quy trình chuẩn hóa nội dung.', NULL, '/demo-members/member-02.jpg', 'CONTENT', 10, CURRENT_TIMESTAMP),
  ('demo-content-02', 'Nguyễn Ngọc Lan', 'ThS.', 'Biên tập viên', 'Khoa Tài chính - Ngân hàng, UEL', 'Biên tập học thuật, kiểm tra trích dẫn và chuẩn hóa metadata trước xuất bản.', NULL, '/demo-members/member-04.jpg', 'CONTENT', 20, CURRENT_TIMESTAMP),
  ('demo-communication-01', 'Bùi Quốc Khánh', 'ThS.', 'Trưởng Ban Truyền thông', 'Trung tâm Truyền thông, UEL', 'Phát triển nội dung truyền thông và kết nối kết quả nghiên cứu với cộng đồng.', NULL, '/demo-members/member-03.jpg', 'COMMUNICATION', 10, CURRENT_TIMESTAMP),
  ('demo-communication-02', 'Trần Mỹ Linh', 'CN.', 'Chuyên viên truyền thông', 'Trường Đại học Kinh tế - Luật, ĐHQG-HCM', 'Quản trị kênh số, tin tức và hoạt động giới thiệu các số xuất bản mới.', NULL, '/demo-members/member-01.jpg', 'COMMUNICATION', 20, CURRENT_TIMESTAMP),
  ('demo-hr-01', 'Lê Thanh Tùng', 'ThS.', 'Trưởng Ban Nhân sự', 'Trường Đại học Kinh tế - Luật, ĐHQG-HCM', 'Điều phối nhân sự cộng tác, chuyên gia phản biện và hoạt động phát triển năng lực.', NULL, '/demo-members/member-02.jpg', 'HUMAN_RESOURCES', 10, CURRENT_TIMESTAMP),
  ('demo-hr-02', 'Nguyễn Hồng Phương', 'CN.', 'Chuyên viên nhân sự', 'Trường Đại học Kinh tế - Luật, ĐHQG-HCM', 'Quản lý hồ sơ thành viên và hỗ trợ tổ chức các hoạt động chuyên môn nội bộ.', NULL, '/demo-members/member-04.jpg', 'HUMAN_RESOURCES', 20, CURRENT_TIMESTAMP);
