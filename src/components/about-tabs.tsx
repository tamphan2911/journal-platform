"use client";

import { BookOpenCheck, Network, TableProperties, UserRound, UsersRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { MemberGroupValue, PublicJournalMember } from "@/lib/member-types";

const tabs = [
  { id: "ve-chuyen-san", label: "Về chuyên san", icon: BookOpenCheck },
  { id: "ban-bien-tap", label: "Ban biên tập", icon: UsersRound },
  { id: "thanh-vien", label: "Thành viên Chuyên san", icon: Network },
] as const;

const departmentTabs: Array<{ id: Exclude<MemberGroupValue, "EDITORIAL_BOARD">; label: string }> = [
  { id: "EXECUTIVE", label: "Ban Điều hành" },
  { id: "CONTENT", label: "Ban Nội dung" },
  { id: "COMMUNICATION", label: "Ban Truyền thông" },
  { id: "HUMAN_RESOURCES", label: "Ban Nhân sự" },
];

type TabId = (typeof tabs)[number]["id"];

const editorialRoles = [
  {
    title: "Hội đồng biên tập",
    detail: "Định hướng học thuật, phạm vi công bố và tiêu chuẩn chất lượng dài hạn của Chuyên san.",
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

export function AboutTabs({ members }: { members: PublicJournalMember[] }) {
  const [activeTab, setActiveTab] = useState<TabId>("ve-chuyen-san");

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
      <aside className="order-first lg:sticky lg:top-[145px]">
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

      <section
        id="about-tabpanel"
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="panel min-h-[520px] p-5 md:p-8"
      >
        {activeTab === "ve-chuyen-san" ? <AboutJournal /> : null}
        {activeTab === "ban-bien-tap" ? (
          <EditorialBoard members={members.filter((member) => member.group === "EDITORIAL_BOARD")} />
        ) : null}
        {activeTab === "thanh-vien" ? <Departments members={members} /> : null}
      </section>
    </div>
  );
}

function AboutJournal() {
  const principles = [
    {
      title: "Sứ mạng",
      detail:
        "Kiến tạo diễn đàn học thuật tin cậy, kết nối nghiên cứu kinh tế, luật và chính sách với nhu cầu phát triển của cộng đồng.",
    },
    {
      title: "Tầm nhìn",
      detail:
        "Trở thành ấn phẩm học thuật có uy tín, thúc đẩy công bố mở và lan tỏa tri thức Việt Nam trong khu vực.",
    },
  ];

  return (
    <div className="flex min-h-[440px] flex-col justify-center">
      <p className="uel-block-copy mx-auto max-w-3xl text-center text-base leading-8">
        Chuyên san Khoa học Kinh tế - Luật là diễn đàn công bố nghiên cứu bằng tiếng Việt trong
        các lĩnh vực kinh tế, luật, quản trị, tài chính, dữ liệu và phát triển bền vững.
      </p>
      <div className="mt-10 grid md:grid-cols-2 md:divide-x md:divide-[#cbd8e8]">
        {principles.map((principle) => (
          <div key={principle.title} className="px-5 py-7 text-center md:px-10">
            <h2 className="uel-block-title text-2xl">{principle.title}</h2>
            <p className="uel-block-copy mx-auto mt-4 max-w-md text-sm leading-7">{principle.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function EditorialBoard({ members }: { members: PublicJournalMember[] }) {
  const [view, setView] = useState<"people" | "roles">("people");

  return (
    <div>
      <div className="flex justify-end">
        <div className="inline-flex border border-[#cbd8e8] bg-[#f4f7fa] p-1" role="group" aria-label="Chế độ xem Ban biên tập">
          <ViewButton active={view === "people"} onClick={() => setView("people")} icon={UsersRound} label="Thành viên" />
          <ViewButton active={view === "roles"} onClick={() => setView("roles")} icon={TableProperties} label="Vai trò" />
        </div>
      </div>
      <div className="mt-5">
        {view === "people" ? <MemberList members={members} /> : <EditorialRoles />}
      </div>
    </div>
  );
}

function ViewButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof UsersRound;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-9 items-center gap-2 px-3 text-xs font-bold transition-colors ${
        active ? "bg-[var(--uel-brand-blue)] text-white" : "text-[var(--muted)] hover:bg-white hover:text-[var(--uel-brand-blue)]"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function EditorialRoles() {
  return (
    <div className="divide-y divide-[#dbe4ee]">
      {editorialRoles.map((role, index) => (
        <article key={role.title} className="grid gap-3 py-6 sm:grid-cols-[52px_210px_1fr] sm:items-start">
          <span className="text-sm font-extrabold text-[var(--uel-gold)]">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="uel-block-title text-lg">{role.title}</h3>
          <p className="uel-block-copy text-sm">{role.detail}</p>
        </article>
      ))}
    </div>
  );
}

function Departments({ members }: { members: PublicJournalMember[] }) {
  const [department, setDepartment] = useState<Exclude<MemberGroupValue, "EDITORIAL_BOARD">>("EXECUTIVE");

  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-[#d8e1ec]" role="tablist" aria-label="Các ban của Chuyên san">
        {departmentTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={department === tab.id}
            onClick={() => setDepartment(tab.id)}
            className={`min-h-12 shrink-0 border-b-3 px-4 text-sm font-bold transition-colors ${
              department === tab.id
                ? "border-[var(--uel-gold)] text-[var(--uel-brand-blue)]"
                : "border-transparent text-[var(--muted)] hover:text-[var(--uel-brand-blue)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-5">
        <MemberList members={members.filter((member) => member.group === department)} />
      </div>
    </div>
  );
}

function MemberList({ members }: { members: PublicJournalMember[] }) {
  if (!members.length) {
    return <p className="py-16 text-center text-sm text-[var(--muted)]">Thông tin thành viên đang được cập nhật.</p>;
  }

  return (
    <div className="divide-y divide-[#dbe4ee]">
      {members.map((member) => (
        <article key={member.id} className="grid grid-cols-[minmax(0,1fr)_104px] gap-5 py-6 sm:grid-cols-[minmax(0,1fr)_132px] sm:gap-8">
          <div className="min-w-0 self-center">
            <p className="text-xs font-extrabold uppercase text-[var(--uel-gold)]">{member.role}</p>
            <h2 className="uel-block-title mt-2 text-xl sm:text-2xl">
              {member.academicTitle ? `${member.academicTitle} ` : ""}{member.name}
            </h2>
            {member.organization ? <p className="mt-2 text-sm font-semibold text-[var(--uel-brand-blue)]">{member.organization}</p> : null}
            <p className="uel-block-copy mt-4 text-sm leading-7">{member.bio}</p>
            {member.email ? <a href={`mailto:${member.email}`} className="mt-3 inline-block text-sm font-semibold text-[var(--uel-brand-blue)] hover:underline">{member.email}</a> : null}
          </div>
          <div className="aspect-[4/5] self-start overflow-hidden bg-[#edf2f7]">
            {member.photoUrl ? (
              <Image
                src={member.photoUrl}
                alt={`Ảnh ${member.name}`}
                width={396}
                height={495}
                className="h-full w-full object-cover"
                unoptimized
              />
            ) : (
              <div className="grid h-full place-items-center text-[#9aaabd]"><UserRound size={42} strokeWidth={1.4} /></div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
