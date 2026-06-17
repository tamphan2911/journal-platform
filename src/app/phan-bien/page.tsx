import { ClipboardCheck, Clock3, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { InfoCard, PageHeader } from "@/components/page-header";

export default function ReviewerGuidePage() {
  return (
    <AppShell>
      <section className="mx-auto min-h-screen max-w-[1320px] px-4 py-8 md:px-8 lg:py-12">
        <PageHeader
          kicker="Dành cho phản biện"
          title="Quy trình phản biện kín, đúng hạn và có kiểm soát xung đột lợi ích"
          description="Phản biện viên nhận lời mời, xác nhận khả năng tham gia, gửi nhận xét cho tác giả và ghi chú mật cho biên tập viên."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <InfoCard title="Lời mời">
            <Clock3 className="mb-3 text-[var(--nav-blue)]" />
            Xem tiêu đề, tóm tắt, chuyên mục và hạn phản biện trước khi nhận hoặc từ chối lời mời.
          </InfoCard>
          <InfoCard title="Đạo đức">
            <ShieldCheck className="mb-3 text-[var(--green)]" />
            Khai báo xung đột lợi ích, giữ bí mật bản thảo và không sử dụng dữ liệu trước công bố.
          </InfoCard>
          <InfoCard title="Biểu mẫu">
            <ClipboardCheck className="mb-3 text-[var(--cyan)]" />
            Gửi nhận xét có cấu trúc, điểm mạnh, điểm cần sửa và khuyến nghị biên tập rõ ràng.
          </InfoCard>
        </div>
      </section>
    </AppShell>
  );
}
