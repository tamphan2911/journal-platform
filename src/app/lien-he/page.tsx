import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { getSiteSettings } from "@/lib/site-settings";

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
            <ContactForm recipientEmail={settings.footer_email} />
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
            </div>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}
