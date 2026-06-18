import { SettingsManager } from "@/components/settings-manager";
import { getSiteSettings, siteSettingDefinitions } from "@/lib/site-settings";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();
  const items = siteSettingDefinitions.map((definition) => ({ ...definition, value: settings[definition.key] }));
  return (
    <div>
      <p className="section-kicker">Giao diện công khai</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[var(--uel-navy)]">Header & footer</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Cập nhật nhãn điều hướng và thông tin liên hệ hiển thị trên toàn bộ website.</p>
      <div className="mt-6"><SettingsManager initialSettings={items} /></div>
    </div>
  );
}
