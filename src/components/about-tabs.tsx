"use client";

import { BookOpenCheck, Network, UsersRound } from "lucide-react";
import { useState } from "react";
import { UelIcon } from "@/components/uel-icon";

const tabs = [
  { id: "ve-chuyen-san", label: "Về chuyên san", icon: BookOpenCheck },
  { id: "ban-bien-tap", label: "Ban biên tập", icon: UsersRound },
  { id: "co-cau-to-chuc", label: "Cơ cấu tổ chức", icon: Network },
] as const;

type TabId = (typeof tabs)[number]["id"];

const editorialRoles = [
  {
    title: "Hội đồng biên tập",
    detail: "Định hướng học thuật, phạm vi công bố và tiêu chuẩn chất lượng dài hạn của chuyên san.",
  },
  {
    title: "Tổng biên tập",
    detail: "Chịu trách nhiệm cao nhất về chính sách biên tập và quyết định đối với từng bản thảo.",
  },
  {
    title: "Biên tập viên chuyên mục",
    detail: "Sàng lọc chuyên môn, lựa chọn phản biện và theo dõi quá trình sửa bài trong lĩnh vực phụ trách.",
  },
  {
    title: "Ban thư ký",
    detail: "Tiếp nhận hồ sơ, kiểm tra hình thức, điều phối tiến độ và chuẩn bị nội dung trước xuất bản.",
  },
];

const organizationUnits = [
  { level: "01", title: "Hội đồng xuất bản", detail: "Định hướng và giám sát học thuật" },
  { level: "02", title: "Tổng biên tập", detail: "Điều hành và quyết định biên tập" },
  { level: "03", title: "Ban biên tập", detail: "Tổ chức phản biện và phát triển nội dung" },
  { level: "03", title: "Ban thư ký", detail: "Tiếp nhận, điều phối và chuẩn hóa hồ sơ" },
  { level: "03", title: "Bộ phận xuất bản số", detail: "Metadata, lưu trữ và phát hành trực tuyến" },
];

export function AboutTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("ve-chuyen-san");

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_270px]">
      <section
        id="about-tabpanel"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="panel min-h-[520px] p-5 md:p-8"
      >
        {activeTab === "ve-chuyen-san" ? <AboutJournal /> : null}
        {activeTab === "ban-bien-tap" ? <EditorialBoard /> : null}
        {activeTab === "co-cau-to-chuc" ? <Organization /> : null}
      </section>

      <aside className="order-first lg:order-none lg:sticky lg:top-[145px]">
        <p className="mb-3 text-xs font-extrabold uppercase text-[var(--muted)]">Mục giới thiệu</p>
        <div
          role="tablist"
          aria-label="Nội dung giới thiệu"
          className="flex overflow-x-auto border-b border-[#d8e1ec] lg:block lg:border-b-0 lg:border-l"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="about-tabpanel"
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-h-14 shrink-0 items-center gap-3 border-b-4 px-4 text-left text-sm font-bold transition-colors lg:w-full lg:border-b-0 lg:border-l-4 lg:py-4 ${
                  active
                    ? "border-[var(--uel-gold)] bg-white text-[var(--uel-brand-blue)]"
                    : "border-transparent text-[var(--muted)] hover:bg-white/70 hover:text-[var(--uel-brand-blue)]"
                }`}
              >
                <Icon size={19} strokeWidth={2} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}

function AboutJournal() {
  return (
    <div>
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="section-kicker">Về chuyên san</p>
          <h2 className="uel-block-title mt-2 max-w-2xl text-3xl md:text-4xl">
            Nghiên cứu phục vụ tri thức, chính sách và cộng đồng
          </h2>
        </div>
        <UelIcon name="brandIdentity" size={68} className="hidden sm:block" />
      </div>
      <p className="uel-block-copy mt-6 max-w-3xl text-base leading-8">
        Chuyên san Khoa học Kinh tế - Luật là diễn đàn công bố nghiên cứu bằng tiếng Việt trong
        các lĩnh vực kinh tế, luật, quản trị, tài chính, dữ liệu và phát triển bền vững.
      </p>
      <div className="mt-10 grid border-y border-[#dbe4ee] md:grid-cols-3 md:divide-x md:divide-[#dbe4ee]">
        {[
          ["Tôn chỉ", "Ưu tiên đóng góp học thuật có giá trị thực tiễn và hàm ý chính sách rõ ràng."],
          ["Phản biện", "Áp dụng quy trình phản biện kín, kiểm tra đạo đức và xung đột lợi ích."],
          ["Xuất bản mở", "Tổ chức metadata và lưu trữ số để phục vụ tìm kiếm, trích dẫn lâu dài."],
        ].map(([title, detail]) => (
          <div key={title} className="py-6 md:px-6 md:first:pl-0 md:last:pr-0">
            <h3 className="uel-block-title text-xl">{title}</h3>
            <p className="uel-block-copy mt-3 text-sm">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditorialBoard() {
  return (
    <div>
      <p className="section-kicker">Ban biên tập</p>
      <h2 className="uel-block-title mt-2 text-3xl md:text-4xl">Trách nhiệm biên tập và học thuật</h2>
      <p className="uel-block-copy mt-5 max-w-3xl text-base">
        Cơ chế phân quyền bảo đảm mỗi bản thảo được xử lý độc lập, minh bạch và đúng chuyên môn.
        Danh sách nhân sự chính thức sẽ được công bố theo quyết định kiện toàn của đơn vị chủ quản.
      </p>
      <div className="mt-8 divide-y divide-[#dbe4ee] border-y border-[#dbe4ee]">
        {editorialRoles.map((role, index) => (
          <article key={role.title} className="grid gap-3 py-5 sm:grid-cols-[52px_220px_1fr] sm:items-start">
            <span className="text-sm font-extrabold text-[var(--uel-gold)]">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="uel-block-title text-lg">{role.title}</h3>
            <p className="uel-block-copy text-sm">{role.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function Organization() {
  return (
    <div>
      <p className="section-kicker">Cơ cấu tổ chức</p>
      <h2 className="uel-block-title mt-2 text-3xl md:text-4xl">Mô hình vận hành chuyên san</h2>
      <p className="uel-block-copy mt-5 max-w-3xl text-base">
        Các đơn vị phối hợp theo ba cấp trách nhiệm, từ định hướng xuất bản đến xử lý biên tập và
        phát hành số.
      </p>
      <div className="relative mt-9 space-y-3 before:absolute before:bottom-6 before:left-[27px] before:top-6 before:w-px before:bg-[#cbd8e8]">
        {organizationUnits.map((unit, index) => (
          <article key={`${unit.title}-${index}`} className="relative grid grid-cols-[56px_1fr] gap-4 bg-white py-3">
            <span className="z-10 grid size-14 place-items-center border-4 border-white bg-[#edf3fa] text-xs font-extrabold text-[var(--uel-brand-blue)]">
              {unit.level}
            </span>
            <div className="self-center border-b border-[#e0e7f0] pb-4">
              <h3 className="uel-block-title text-lg">{unit.title}</h3>
              <p className="uel-block-copy mt-1 text-sm">{unit.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
