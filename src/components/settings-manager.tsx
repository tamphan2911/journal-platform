"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import type { SiteSettingKey } from "@/lib/site-settings";

type SettingItem = { key: SiteSettingKey; label: string; group: string; value: string };

export function SettingsManager({ initialSettings }: { initialSettings: SettingItem[] }) {
  const [settings, setSettings] = useState(initialSettings);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings: Object.fromEntries(settings.map((item) => [item.key, item.value])) }),
    });
    const result = await response.json();
    setSaving(false);
    setMessage(response.ok ? "Đã cập nhật nội dung toàn site." : result.error ?? "Không thể lưu cấu hình.");
  }

  return (
    <form onSubmit={save} className="grid gap-5 xl:grid-cols-2">
      {["header", "footer"].map((group) => (
        <section key={group} className="panel p-5 md:p-6">
          <h2 className="uel-block-title text-xl">{group === "header" ? "Header" : "Footer"}</h2>
          <div className="mt-5 space-y-4">
            {settings.filter((item) => item.group === group).map((item) => (
              <label key={item.key} className="block">
                <span className="mb-1.5 block text-xs font-bold text-[var(--uel-navy)]">{item.label}</span>
                <input
                  className="field"
                  value={item.value}
                  onChange={(event) => setSettings((current) => current.map((candidate) => candidate.key === item.key ? { ...candidate, value: event.target.value } : candidate))}
                  required
                />
              </label>
            ))}
          </div>
        </section>
      ))}
      <div className="xl:col-span-2 flex items-center justify-end gap-4">
        {message ? <p className="text-sm font-semibold text-[var(--uel-brand-blue)]">{message}</p> : null}
        <button disabled={saving} className="inline-flex items-center gap-2 bg-[var(--uel-brand-blue)] px-5 py-3 text-sm font-bold text-white disabled:opacity-60"><Save size={18} />{saving ? "Đang lưu..." : "Lưu cấu hình"}</button>
      </div>
    </form>
  );
}
