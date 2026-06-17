import { AppShell } from "@/components/app-shell";
import { InfoCard, PageHeader } from "@/components/page-header";
import { roleJurisdictions } from "@/lib/journal-data";

export default function AboutPage() {
  return (
    <AppShell>
      <section className="mx-auto min-h-screen max-w-[1320px] px-4 py-8 md:px-8 lg:py-12">
        <PageHeader
          kicker="Thông tin tạp chí"
          title="Một cổng xuất bản học thuật nghiêm túc cho kinh tế, luật và chính sách"
          description="Trang này đặt nền cho phần giới thiệu, mục tiêu, phạm vi, quy trình phản biện và chuẩn đạo đức công bố của chuyên san."
        />
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <InfoCard title="Tôn chỉ">
            Chuyên san ưu tiên các nghiên cứu có đóng góp học thuật và giá trị chính sách trong
            kinh tế, luật, quản trị, tài chính, dữ liệu và phát triển bền vững.
          </InfoCard>
          <InfoCard title="Phản biện">
            Bản thảo phù hợp phạm vi sẽ được sàng lọc hình thức, kiểm tra đạo đức công bố và gửi
            phản biện kín bởi các chuyên gia phù hợp chuyên ngành.
          </InfoCard>
          <InfoCard title="Xuất bản mở">
            Bài được chấp nhận sẽ được biên tập, gắn metadata, xếp vào số xuất bản và lưu trữ để
            phục vụ tìm kiếm, trích dẫn và thống kê truy cập.
          </InfoCard>
        </div>
        <div className="mt-6 panel p-5 md:p-6">
          <h2 className="text-3xl font-bold text-[var(--uel-navy)]">Jurisdiction theo vai trò</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-5">
            {roleJurisdictions.map((role) => (
              <article key={role.code} className="rounded-[4px] border border-[#dbe6f7] bg-white p-4">
                <p className="text-xs font-extrabold text-[var(--nav-blue)]">{role.code}</p>
                <h3 className="mt-2 text-xl font-bold text-[var(--uel-navy)]">{role.role}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{role.scope}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
