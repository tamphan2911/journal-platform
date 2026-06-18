ALTER TABLE "JournalMember"
  ADD COLUMN "term" TEXT NOT NULL DEFAULT '2024-2025';

DROP INDEX "JournalMember_group_isActive_sortOrder_idx";

CREATE INDEX "JournalMember_term_group_isActive_sortOrder_idx"
  ON "JournalMember"("term", "group", "isActive", "sortOrder");

INSERT INTO "JournalMember"
  ("id", "name", "academicTitle", "role", "organization", "bio", "email", "photoUrl", "group", "term", "sortOrder", "updatedAt")
VALUES
  ('demo-previous-executive-01', 'Nguyễn Thành Công', 'TS.', 'Trưởng Ban Điều hành', 'Trường Đại học Kinh tế - Luật, ĐHQG-HCM', 'Phụ trách kế hoạch hoạt động và phối hợp công tác xuất bản trong nhiệm kỳ 2023-2024.', NULL, '/demo-members/member-02.jpg', 'EXECUTIVE', '2023-2024', 10, CURRENT_TIMESTAMP),
  ('demo-previous-content-01', 'Trần Ngọc Minh', 'TS.', 'Trưởng Ban Nội dung', 'Khoa Kinh tế, UEL', 'Điều phối biên tập học thuật và phát triển chủ đề nghiên cứu trong nhiệm kỳ 2023-2024.', NULL, '/demo-members/member-04.jpg', 'CONTENT', '2023-2024', 10, CURRENT_TIMESTAMP),
  ('demo-previous-communication-01', 'Lê Hoàng Phúc', 'ThS.', 'Trưởng Ban Truyền thông', 'Trung tâm Truyền thông, UEL', 'Phụ trách truyền thông khoa học và kết nối cộng đồng trong nhiệm kỳ 2023-2024.', NULL, '/demo-members/member-03.jpg', 'COMMUNICATION', '2023-2024', 10, CURRENT_TIMESTAMP),
  ('demo-previous-hr-01', 'Phạm Thu Trang', 'ThS.', 'Trưởng Ban Nhân sự', 'Trường Đại học Kinh tế - Luật, ĐHQG-HCM', 'Điều phối nhân sự và mạng lưới cộng tác viên trong nhiệm kỳ 2023-2024.', NULL, '/demo-members/member-01.jpg', 'HUMAN_RESOURCES', '2023-2024', 10, CURRENT_TIMESTAMP);
