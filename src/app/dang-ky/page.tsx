import { UserCheck } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";

export default function RegisterPage() {
  return (
    <AppShell>
      <section className="mx-auto grid min-h-screen max-w-[1180px] gap-8 px-4 py-8 md:px-8 lg:grid-cols-[1fr_520px] lg:py-12">
        <PageHeader
          kicker="Đăng ký"
          title="Tạo tài khoản học thuật"
          description="Tác giả có thể đăng ký trực tiếp. Tài khoản phản biện và biên tập sẽ được tòa soạn duyệt vai trò trước khi có quyền xử lý hồ sơ."
        />
        <form className="panel p-5 md:p-6">
          <UserCheck className="text-[var(--nav-blue)]" />
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label>
              <span className="text-sm font-bold text-[var(--uel-navy)]">Họ tên</span>
              <input className="field mt-2" placeholder="Nguyễn Minh Anh" />
            </label>
            <label>
              <span className="text-sm font-bold text-[var(--uel-navy)]">Email</span>
              <input className="field mt-2" type="email" placeholder="ten@truong.edu.vn" />
            </label>
            <label>
              <span className="text-sm font-bold text-[var(--uel-navy)]">Đơn vị công tác</span>
              <input className="field mt-2" placeholder="Trường / Viện / Cơ quan" />
            </label>
            <label>
              <span className="text-sm font-bold text-[var(--uel-navy)]">Vai trò mong muốn</span>
              <select className="field mt-2" defaultValue="AUTHOR">
                <option value="AUTHOR">Tác giả</option>
                <option value="REVIEWER">Phản biện viên</option>
              </select>
            </label>
          </div>
          <label className="mt-5 block">
            <span className="text-sm font-bold text-[var(--uel-navy)]">Mật khẩu</span>
            <input className="field mt-2" type="password" placeholder="Tối thiểu 8 ký tự" />
          </label>
          <button className="mt-6 w-full rounded-[4px] bg-[var(--nav-blue)] px-4 py-3 text-sm font-extrabold text-white">
            Tạo tài khoản
          </button>
        </form>
      </section>
    </AppShell>
  );
}
