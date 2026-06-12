# Chuyên san Khoa học

Nền tảng tạp chí học thuật tiếng Việt xây bằng Next.js, Prisma và PostgreSQL.

## Chức năng đã có trong starter

- Trang landing cho tạp chí, số hiện hành và quy trình xuất bản.
- Cổng tác giả nộp bản thảo tại `/nop-bai`.
- API `POST /api/submissions` để tạo tác giả, bản thảo, tệp metadata và audit log.
- Bàn điều hành `/dashboard` cho admin, tổng biên tập, biên tập viên, phản biện và tác giả.
- Trang lưu trữ `/luu-tru` cho các số đã xuất bản.
- Prisma schema cho người dùng, vai trò, bản thảo, phản biện, vòng sửa, quyết định, số tạp chí, bài xuất bản và nhật ký.
- Railway config-as-code với standalone Next.js, healthcheck và pre-deploy migration.

## Chạy local

```bash
npm install
cp .env.example .env
# sửa DATABASE_URL trỏ tới Postgres local hoặc Railway Postgres
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Mở `http://localhost:3000`.

## Deploy Railway

1. Push thư mục này lên GitHub.
2. Railway: New Project -> Deploy from GitHub repo.
3. Add PostgreSQL trên Project Canvas.
4. Trong service Next.js, Variables -> Add Reference Variable -> chọn `DATABASE_URL` từ PostgreSQL service.
5. Redeploy. `railway.json` sẽ chạy `npm run db:migrate` trước khi start.
6. Settings -> Networking -> Generate Domain để lấy URL public.

## Mở rộng cho production

- Thêm xác thực bằng Auth.js hoặc Clerk, map session sang `User.role`.
- Dùng Railway Object Storage hoặc S3/R2 cho file bản thảo thay vì chỉ lưu metadata.
- Tách worker gửi email/thông báo khi bản thảo đổi trạng thái.
- Thêm chỉ mục tìm kiếm PostgreSQL full text cho bài viết và bản thảo.
- Bật backup PostgreSQL, quan sát bằng logs/metrics và tách môi trường staging/production.
