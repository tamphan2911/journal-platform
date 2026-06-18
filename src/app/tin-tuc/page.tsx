import { CalendarDays } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { UelIcon } from "@/components/uel-icon";

const newsItems = [
  {
    date: "18/06/2026",
    title: "Thông báo tiếp nhận bài viết cho số chuyên đề năm 2026",
    summary: "Chuyên san tiếp nhận các nghiên cứu mới trong lĩnh vực kinh tế, luật, quản trị và chính sách công.",
  },
  {
    date: "10/06/2026",
    title: "Cập nhật hướng dẫn trình bày và chuẩn metadata bài viết",
    summary: "Tác giả vui lòng sử dụng biểu mẫu mới cho tóm tắt, từ khóa, thông tin tài trợ và tuyên bố đạo đức.",
  },
  {
    date: "30/05/2026",
    title: "Tập 12, Số 2 chuẩn bị phát hành",
    summary: "Số mới tập trung vào dữ liệu, chính sách và chuyển đổi số, dự kiến xuất bản cuối tháng 6/2026.",
  },
];

export default function NewsPage() {
  return (
    <AppShell>
      <section className="mx-auto min-h-[70vh] w-full max-w-[1120px] px-4 py-8 md:px-8 lg:py-12">
        <PageHeader
          kicker="Thông báo và hoạt động"
          title="Tin tức"
          description="Cập nhật thông báo xuất bản, hướng dẫn tác giả và hoạt động học thuật của chuyên san."
        />
        <div className="mt-8 space-y-4">
          {newsItems.map((item) => (
            <article key={item.title} className="panel grid gap-5 p-5 sm:grid-cols-[64px_1fr] md:p-6">
              <UelIcon name="publications" size={56} />
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold text-[var(--muted)]">
                  <CalendarDays size={15} />
                  {item.date}
                </p>
                <h2 className="uel-block-title mt-2 text-xl md:text-2xl">{item.title}</h2>
                <p className="uel-block-copy mt-3 text-sm">{item.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
