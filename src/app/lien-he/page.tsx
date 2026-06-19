import { Clock3, Mail, MapPin, Phone, Send, UserRoundCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { getSiteSettings } from "@/lib/site-settings";

const contactPurposes = [
  {
    title: "Nộp bài và hồ sơ tác giả",
    detail: "Hỗ trợ tài khoản, quy trình nộp bản thảo, metadata và yêu cầu định dạng.",
  },
  {
    title: "Phản biện và biên tập",
    detail: "Trao đổi về lời mời phản biện, thời hạn xử lý và các vòng chỉnh sửa bản thảo.",
  },
  {
    title: "Xuất bản và hợp tác",
    detail: "Thông tin về số xuất bản, bản quyền, truyền thông học thuật và đề xuất hợp tác.",
  },
];

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const phoneHref = settings.footer_phone.replace(/[^+\d]/g, "");
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.footer_address)}`;

  return (
    <AppShell>
      <section className="mx-auto min-h-[calc(100dvh-var(--site-header-height))] max-w-[1220px] px-4 py-8 md:px-8 lg:py-12">
        <PageHeader
          kicker="Liên hệ tòa soạn"
          title="Kết nối với Chuyên san"
          description="Liên hệ đúng đầu mối để được hỗ trợ về bản thảo, phản biện, xuất bản và các hoạt động học thuật."
        />

        <div className="mt-9 grid gap-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-12">
          <main>
            <div className="divide-y divide-[#dbe4ee] border-y border-[#dbe4ee]">
              {contactPurposes.map((item, index) => (
                <article key={item.title} className="grid gap-3 py-6 sm:grid-cols-[48px_210px_minmax(0,1fr)] sm:items-start">
                  <span className="text-sm font-extrabold text-[var(--uel-gold)]">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="uel-block-title text-lg">{item.title}</h2>
                  <p className="uel-block-copy text-sm leading-7">{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="mt-9 border-l-4 border-[var(--uel-gold)] bg-[#fff9e9] p-5">
              <div className="flex items-start gap-3">
                <UserRoundCheck size={21} className="mt-0.5 shrink-0 text-[var(--uel-brand-blue)]" />
                <div>
                  <h2 className="font-extrabold text-[var(--uel-navy)]">Khi liên hệ về bản thảo</h2>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">Vui lòng ghi rõ mã bản thảo, tên bài viết và email tài khoản đã dùng để nộp bài. Không gửi bản thảo hoặc dữ liệu nghiên cứu nhạy cảm qua các kênh không chính thức.</p>
                </div>
              </div>
            </div>
          </main>

          <aside className="panel self-start overflow-hidden">
            <div className="border-t-4 border-[var(--uel-gold)] p-6">
              <p className="text-xs font-extrabold uppercase text-[var(--uel-brand-blue)]">Văn phòng Chuyên san</p>
              <div className="mt-5 space-y-5">
                <a href={`mailto:${settings.footer_email}`} className="group flex items-start gap-4">
                  <Mail size={20} className="mt-0.5 shrink-0 text-[var(--uel-brand-blue)]" />
                  <span><span className="block text-xs font-bold text-[var(--muted)]">Email</span><span className="mt-1 block text-sm font-bold text-[var(--uel-navy)] group-hover:underline">{settings.footer_email}</span></span>
                </a>
                <a href={`tel:${phoneHref}`} className="group flex items-start gap-4">
                  <Phone size={20} className="mt-0.5 shrink-0 text-[var(--uel-brand-blue)]" />
                  <span><span className="block text-xs font-bold text-[var(--muted)]">Điện thoại</span><span className="mt-1 block text-sm font-bold text-[var(--uel-navy)] group-hover:underline">{settings.footer_phone}</span></span>
                </a>
                <a href={mapHref} target="_blank" rel="noreferrer" className="group flex items-start gap-4">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-[var(--uel-brand-blue)]" />
                  <span><span className="block text-xs font-bold text-[var(--muted)]">Địa chỉ</span><span className="mt-1 block text-sm font-bold leading-6 text-[var(--uel-navy)] group-hover:underline">{settings.footer_address}</span></span>
                </a>
                <div className="flex items-start gap-4">
                  <Clock3 size={20} className="mt-0.5 shrink-0 text-[var(--uel-brand-blue)]" />
                  <span><span className="block text-xs font-bold text-[var(--muted)]">Thời gian phản hồi</span><span className="mt-1 block text-sm font-bold leading-6 text-[var(--uel-navy)]">Trong vòng 2-3 ngày làm việc</span></span>
                </div>
              </div>
              <a href={`mailto:${settings.footer_email}?subject=${encodeURIComponent("Liên hệ Chuyên san")}`} className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 bg-[var(--uel-brand-blue)] px-4 text-sm font-bold text-white hover:bg-[var(--uel-navy)]">
                <Send size={17} /> Gửi email cho tòa soạn
              </a>
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}
