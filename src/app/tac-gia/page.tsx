import Link from "next/link";
import { FileSignature, Send, UploadCloud } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { InfoCard, PageHeader } from "@/components/page-header";

const checklist = [
  "Bản thảo ẩn danh ở định dạng DOCX hoặc PDF",
  "Tên tác giả, email, ORCID và đơn vị công tác",
  "Tóm tắt, từ khóa, chuyên mục và cam kết đạo đức công bố",
  "Tệp bổ sung, dữ liệu nghiên cứu hoặc phụ lục nếu có",
];

export default function AuthorGuidePage() {
  return (
    <AppShell>
      <section className="mx-auto min-h-screen max-w-[1320px] px-4 py-8 md:px-8 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <main>
            <PageHeader
              kicker="Dành cho tác giả"
              title="Nộp bài, sửa bài và theo dõi hồ sơ trong một không gian làm việc"
              description="Tác giả có thể tạo hồ sơ, nộp bản thảo, nhận yêu cầu sửa, gửi bản giải trình và theo dõi quyết định biên tập."
            />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <InfoCard title="1. Chuẩn bị">Kiểm tra phạm vi, định dạng, trích dẫn và tính ẩn danh trước khi nộp.</InfoCard>
              <InfoCard title="2. Nộp hồ sơ">Nhập metadata, tải tệp bản thảo và xác nhận cam kết đạo đức công bố.</InfoCard>
              <InfoCard title="3. Theo dõi">Xem trạng thái, trả lời yêu cầu sửa và nhận quyết định qua workspace.</InfoCard>
            </div>
          </main>
          <aside className="panel p-5">
            <UploadCloud className="text-[var(--nav-blue)]" />
            <h2 className="mt-4 text-2xl font-bold text-[var(--uel-navy)]">Checklist nộp bài</h2>
            <div className="mt-5 space-y-3">
              {checklist.map((item) => (
                <div key={item} className="flex gap-3 rounded-[4px] border border-[#dbe6f7] p-3 text-sm leading-6 text-[var(--muted)]">
                  <FileSignature className="mt-0.5 shrink-0 text-[var(--green)]" size={17} />
                  {item}
                </div>
              ))}
            </div>
            <Link href="/nop-bai" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-[var(--nav-blue)] px-4 py-3 text-sm font-extrabold text-white">
              Nộp bản thảo <Send size={17} />
            </Link>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}
