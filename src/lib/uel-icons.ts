const officialIconBase = "https://www.uel.edu.vn/storage/icon";

export const uelIcons = {
  brandIdentity: {
    src: "/icons/uel/brand-identity.png",
    label: "Nhận diện UEL",
    source: `${officialIconBase}/cac-lien-ket-8-150x150.png`,
  },
  admissions: {
    src: "/icons/uel/admissions.png",
    label: "Tuyển sinh",
    source: `${officialIconBase}/cac-lien-ket-150x150.png`,
  },
  qualityAssurance: {
    src: "/icons/uel/quality-assurance.png",
    label: "Bảo đảm chất lượng",
    source: `${officialIconBase}/cac-lien-ket-9-150x150.png`,
  },
  recruitment: {
    src: "/icons/uel/recruitment.png",
    label: "Tuyển dụng",
    source: `${officialIconBase}/cac-lien-ket-10-150x150.png`,
  },
  library: {
    src: "/icons/uel/library.png",
    label: "Thư viện",
    source: `${officialIconBase}/cac-lien-ket-2-150x150.png`,
  },
  myUel: {
    src: "/icons/uel/my-uel.png",
    label: "MyUEL",
    source: `${officialIconBase}/cac-lien-ket-7-150x150.png`,
  },
  lms: {
    src: "/icons/uel/lms.png",
    label: "LMS",
    source: `${officialIconBase}/cac-lien-ket-4-150x150.png`,
  },
  hrm: {
    src: "/icons/uel/hrm.png",
    label: "HRM",
    source: `${officialIconBase}/cac-lien-ket-3-150x150.png`,
  },
  store: {
    src: "/icons/uel/store.png",
    label: "UEL Store",
    source: `${officialIconBase}/cac-lien-ket-6-150x150.png`,
  },
  virtualTour: {
    src: "/icons/uel/virtual-tour.png",
    label: "UEL Virtual Tour",
    source: `${officialIconBase}/cac-lien-ket-5-150x150.png`,
  },
  yearFounded: {
    src: "/icons/uel/year-founded.png",
    label: "Năm thành lập",
    source: `${officialIconBase}/uel-icon-4.png`,
  },
  staff: {
    src: "/icons/uel/staff.png",
    label: "Nhân sự",
    source: `${officialIconBase}/trietlygiaoduc-4.png`,
  },
  studyPrograms: {
    src: "/icons/uel/study-programs.png",
    label: "Chương trình đào tạo",
    source: `${officialIconBase}/info-networth.png`,
  },
  publications: {
    src: "/icons/uel/publications.png",
    label: "Công bố khoa học",
    source: `${officialIconBase}/info-underwriting-1.png`,
  },
  socialReview: {
    src: "/icons/uel/social-review.png",
    label: "Phản biện xã hội",
    source: `${officialIconBase}/trietlygiaoduc-3.png`,
  },
  alumni: {
    src: "/icons/uel/alumni.png",
    label: "Cựu người học",
    source: `${officialIconBase}/uel-icon.png`,
  },
  partners: {
    src: "/icons/uel/partners.png",
    label: "Đối tác",
    source: `${officialIconBase}/uel-icon-2.png`,
  },
  ranking: {
    src: "/icons/uel/ranking.png",
    label: "Xếp hạng",
    source: `${officialIconBase}/info-accomplishment-1.png`,
  },
} as const;

export type UelIconName = keyof typeof uelIcons;

export const uelIconCatalog = Object.entries(uelIcons).map(([name, icon]) => ({
  name: name as UelIconName,
  ...icon,
}));
