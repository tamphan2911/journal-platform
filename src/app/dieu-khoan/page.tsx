import { AppShell } from "@/components/app-shell";
import { InfoCard, PageHeader } from "@/components/page-header";

export default function TermsPage() {
  return (
    <AppShell>
      <section className="mx-auto min-h-screen max-w-[980px] px-4 py-8 md:px-8 lg:py-12">
        <PageHeader
          kicker="Điều khoản và điều kiện"
          title="Điều khoản sử dụng nền tảng tạp chí"
          description="Bản tóm tắt tạm thời cho giai đoạn phát triển. Nội dung pháp lý chi tiết có thể được thay thế khi tòa soạn hoàn thiện chính sách chính thức."
        />
        <div className="mt-8 space-y-5">
          <InfoCard title="Tài khoản">
            Người dùng chịu trách nhiệm bảo mật thông tin đăng nhập, cung cấp email hợp lệ và xác minh email trước khi tài khoản được kích hoạt.
          </InfoCard>
          <InfoCard title="Đạo đức công bố">
            Tác giả, phản biện và biên tập viên cam kết tuân thủ bảo mật bản thảo, khai báo xung đột lợi ích và không sử dụng dữ liệu ngoài phạm vi xử lý học thuật.
          </InfoCard>
          <InfoCard title="Dữ liệu">
            Nền tảng lưu thông tin hồ sơ, bản thảo, phản biện, quyết định và nhật ký thao tác để phục vụ quy trình xuất bản học thuật.
          </InfoCard>
        </div>
      </section>
    </AppShell>
  );
}
