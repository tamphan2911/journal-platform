import { Users, ShieldCheck, Archive, ScrollText } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { adminTools } from "@/lib/journal-data";

export default function AdminWorkspacePage() {
  return (
    <AppShell>
      <section className="mx-auto min-h-screen max-w-[1320px] px-4 py-8 md:px-8 lg:py-12">
        <PageHeader
          kicker="Admin workspace"
          title="Quản trị người dùng, vai trò và cấu hình tạp chí"
          description="Khu vực admin đặt nền cho quản lý tài khoản, phân quyền, số xuất bản, chuyên mục, nhật ký hệ thống và cấu hình vận hành."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {adminTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div key={tool.label} className="panel p-5">
                <Icon className="text-[var(--nav-blue)]" size={24} />
                <p className="mt-4 text-4xl font-extrabold text-[var(--uel-navy)]">{tool.value}</p>
                <p className="text-sm text-[var(--muted)]">{tool.label}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {[
            { title: "Quản lý tài khoản", text: "Duyệt tài khoản phản biện, khóa tài khoản không hoạt động, đặt lại vai trò.", icon: Users },
            { title: "Phân quyền", text: "Kiểm tra quyền mặc định theo vai trò và quyền override theo từng người dùng.", icon: ShieldCheck },
            { title: "Số xuất bản", text: "Tạo tập, số, chủ đề, ngày xuất bản và gán bài đã chấp nhận.", icon: Archive },
            { title: "Nhật ký hệ thống", text: "Theo dõi đăng nhập, thay đổi quyền, quyết định biên tập và thao tác nhạy cảm.", icon: ScrollText },
          ].map((item) => {
            const Icon = item.icon;
            return (
            <article key={item.title} className="panel p-5">
              <Icon className="text-[var(--nav-blue)]" size={26} />
              <h2 className="mt-4 text-2xl font-bold text-[var(--uel-navy)]">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.text}</p>
            </article>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
