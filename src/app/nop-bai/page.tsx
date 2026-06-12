import { FileUp, ShieldCheck, UploadCloud } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { StatusPill } from "@/components/status-pill";
import { SubmitForm } from "./submit-form";

export default function SubmitPage() {
  return (
    <AppShell>
      <section className="mx-auto grid min-h-screen w-full max-w-[1320px] gap-8 px-5 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-12 lg:py-12">
        <main>
          <p className="text-sm font-bold uppercase text-[var(--nav-blue)]">Nộp bài trực tuyến</p>
          <h1 className="mt-2 max-w-3xl font-serif text-5xl font-extrabold leading-tight text-black">
            Gửi bản thảo cho tòa soạn
          </h1>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            Tác giả cung cấp metadata, tệp bản thảo và thư gửi biên tập. Hồ sơ
            sẽ vào bước sàng lọc hình thức trước khi phân công phản biện.
          </p>
          <SubmitForm />
        </main>

        <aside className="space-y-5">
          <div className="panel p-5">
            <div className="grid h-12 w-12 place-items-center rounded-md bg-[#dbe8ff] text-[var(--nav-blue)]">
              <UploadCloud />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-bold text-black">Checklist hồ sơ</h2>
            <div className="mt-5 space-y-3">
              {[
                "Bản thảo ẩn danh định dạng DOCX hoặc PDF",
                "Thông tin tác giả liên hệ và đơn vị công tác",
                "Tóm tắt tiếng Việt, từ khóa và chuyên mục",
                "Cam kết đạo đức công bố và xung đột lợi ích",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-md border border-[#dbe6f7] p-3">
                  <ShieldCheck className="mt-0.5 shrink-0 text-[#39a852]" size={18} />
                  <p className="text-sm leading-6 text-[var(--muted)]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <div className="flex items-center gap-3">
              <FileUp className="text-[#4fd0df]" />
              <h2 className="font-serif text-2xl font-bold text-black">Trạng thái sau nộp</h2>
            </div>
            <div className="mt-5 space-y-3">
              <StatusPill tone="blue">SUBMITTED</StatusPill>
              <p className="text-sm leading-6 text-[var(--muted)]">
                Sau khi nộp thành công, hệ thống sinh mã bản thảo, ghi nhật ký
                và đưa hồ sơ vào hàng đợi của biên tập viên.
              </p>
            </div>
          </div>
        </aside>
      </section>
    </AppShell>
  );
}
