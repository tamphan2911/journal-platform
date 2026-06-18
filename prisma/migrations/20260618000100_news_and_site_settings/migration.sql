-- CreateEnum
CREATE TYPE "NewsStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "NewsPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "status" "NewsStatus" NOT NULL DEFAULT 'DRAFT',
    "authorId" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsPost_slug_key" ON "NewsPost"("slug");
CREATE INDEX "NewsPost_status_publishedAt_idx" ON "NewsPost"("status", "publishedAt");
CREATE INDEX "NewsPost_authorId_idx" ON "NewsPost"("authorId");
CREATE INDEX "SiteSetting_group_idx" ON "SiteSetting"("group");

-- AddForeignKey
ALTER TABLE "NewsPost" ADD CONSTRAINT "NewsPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- SeedSettings
INSERT INTO "SiteSetting" ("key", "value", "group", "label", "updatedAt") VALUES
  ('header_about_label', 'Giới thiệu', 'header', 'Nhãn Giới thiệu', CURRENT_TIMESTAMP),
  ('header_published_label', 'Đã xuất bản', 'header', 'Nhãn Đã xuất bản', CURRENT_TIMESTAMP),
  ('header_news_label', 'Tin tức', 'header', 'Nhãn Tin tức', CURRENT_TIMESTAMP),
  ('header_author_label', 'Thông tin cho tác giả', 'header', 'Nhãn thông tin tác giả', CURRENT_TIMESTAMP),
  ('footer_address', '669 Đỗ Mười, phường Linh Xuân, TP.HCM', 'footer', 'Địa chỉ', CURRENT_TIMESTAMP),
  ('footer_phone', '(028) 3724 4555', 'footer', 'Điện thoại', CURRENT_TIMESTAMP),
  ('footer_email', 'journal@uel.edu.vn', 'footer', 'Email', CURRENT_TIMESTAMP),
  ('footer_copyright', 'Trường Đại học Kinh tế - Luật, ĐHQG-HCM', 'footer', 'Bản quyền', CURRENT_TIMESTAMP)
ON CONFLICT ("key") DO NOTHING;

-- SeedNews
INSERT INTO "NewsPost" ("id", "title", "slug", "summary", "content", "status", "publishedAt", "createdAt", "updatedAt") VALUES
  ('news_2026_call', 'Thông báo tiếp nhận bài viết cho số chuyên đề năm 2026', 'tiep-nhan-bai-viet-so-chuyen-de-2026', 'Chuyên san tiếp nhận các nghiên cứu mới trong lĩnh vực kinh tế, luật, quản trị và chính sách công.', 'Chuyên san Khoa học Kinh tế - Luật trân trọng thông báo tiếp nhận bài viết cho số chuyên đề năm 2026. Bản thảo cần tuân thủ hướng dẫn dành cho tác giả và các chuẩn mực đạo đức công bố của chuyên san.', 'PUBLISHED', '2026-06-18T00:00:00.000Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('news_2026_metadata', 'Cập nhật hướng dẫn trình bày và chuẩn metadata bài viết', 'cap-nhat-huong-dan-metadata-2026', 'Tác giả vui lòng sử dụng biểu mẫu mới cho tóm tắt, từ khóa, thông tin tài trợ và tuyên bố đạo đức.', 'Hướng dẫn trình bày đã được cập nhật nhằm chuẩn hóa tóm tắt, từ khóa, thông tin tác giả, nguồn tài trợ, xung đột lợi ích và tuyên bố đạo đức nghiên cứu.', 'PUBLISHED', '2026-06-10T00:00:00.000Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  ('news_2026_issue', 'Tập 12, Số 2 chuẩn bị phát hành', 'tap-12-so-2-chuan-bi-phat-hanh', 'Số mới tập trung vào dữ liệu, chính sách và chuyển đổi số, dự kiến xuất bản cuối tháng 6/2026.', 'Ban biên tập đang hoàn tất công tác biên tập và xuất bản Tập 12, Số 2 với chủ đề dữ liệu, chính sách và chuyển đổi số.', 'PUBLISHED', '2026-05-30T00:00:00.000Z', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("slug") DO NOTHING;
