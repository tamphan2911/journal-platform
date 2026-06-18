import { prisma } from "@/lib/prisma";
import { connection } from "next/server";
import { unstable_cache } from "next/cache";

export const defaultSiteSettings = {
  header_about_label: "Giới thiệu",
  header_published_label: "Đã xuất bản",
  header_news_label: "Tin tức",
  header_author_label: "Thông tin cho tác giả",
  footer_address: "669 Đỗ Mười, phường Linh Xuân, TP.HCM",
  footer_phone: "(028) 3724 4555",
  footer_email: "journal@uel.edu.vn",
  footer_copyright: "Trường Đại học Kinh tế - Luật, ĐHQG-HCM",
};

export type SiteSettingKey = keyof typeof defaultSiteSettings;

export const siteSettingDefinitions: Array<{ key: SiteSettingKey; group: string; label: string }> = [
  { key: "header_about_label", group: "header", label: "Nhãn Giới thiệu" },
  { key: "header_published_label", group: "header", label: "Nhãn Đã xuất bản" },
  { key: "header_news_label", group: "header", label: "Nhãn Tin tức" },
  { key: "header_author_label", group: "header", label: "Nhãn thông tin tác giả" },
  { key: "footer_address", group: "footer", label: "Địa chỉ" },
  { key: "footer_phone", group: "footer", label: "Điện thoại" },
  { key: "footer_email", group: "footer", label: "Email" },
  { key: "footer_copyright", group: "footer", label: "Bản quyền" },
];

const readSiteSettings = unstable_cache(
  async () => {
    const records = await prisma.siteSetting.findMany({ where: { key: { in: siteSettingDefinitions.map((item) => item.key) } } });
    return records.reduce(
      (settings, record) => ({ ...settings, [record.key]: record.value }),
      { ...defaultSiteSettings } as Record<SiteSettingKey, string>,
    );
  },
  ["site-settings"],
  { revalidate: 300, tags: ["site-settings"] },
);

export async function getSiteSettings() {
  await connection();
  try {
    return await readSiteSettings();
  } catch {
    return { ...defaultSiteSettings };
  }
}
