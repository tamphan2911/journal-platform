import { AppShell } from "@/components/app-shell";
import { AboutTabs } from "@/components/about-tabs";
import { PageHeader } from "@/components/page-header";

export default function AboutPage() {
  return (
    <AppShell>
      <section className="mx-auto min-h-screen max-w-[1320px] px-4 py-8 md:px-8 lg:py-12">
        <PageHeader
          kicker="Thông tin tạp chí"
          title="Một cổng xuất bản học thuật nghiêm túc cho kinh tế, luật và chính sách"
          description="Trang này đặt nền cho phần giới thiệu, mục tiêu, phạm vi, quy trình phản biện và chuẩn đạo đức công bố của chuyên san."
        />
        <AboutTabs />
      </section>
    </AppShell>
  );
}
