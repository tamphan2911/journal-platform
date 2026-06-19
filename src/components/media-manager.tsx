"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type MediaRecord = {
  id: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  width: number | null;
  height: number | null;
  createdAt: string;
  uploadedBy: { name: string; email: string } | null;
  avatarFor: { name: string; email: string } | null;
};

export function MediaManager({ initialAssets }: { initialAssets: MediaRecord[] }) {
  const [assets, setAssets] = useState(initialAssets);
  const [message, setMessage] = useState("");

  async function remove(asset: MediaRecord) {
    const usage = asset.avatarFor ? ` Ảnh đang là ảnh đại diện của ${asset.avatarFor.name}.` : "";
    if (!window.confirm(`Xóa ảnh “${asset.fileName}”?${usage}`)) return;
    const response = await fetch(`/api/admin/media/${asset.id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) {
      setMessage(result.error ?? "Không thể xóa ảnh.");
      return;
    }
    setAssets((current) => current.filter((item) => item.id !== asset.id));
    setMessage("Đã xóa ảnh.");
  }

  return (
    <section className="panel overflow-hidden">
      <div className="flex min-h-12 items-center justify-between border-b border-[#dbe4ee] px-5">
        <p className="text-xs font-semibold text-[var(--muted)]">{assets.length} ảnh đã tải lên</p>
        {message ? <p className="text-xs font-semibold text-[var(--uel-brand-blue)]">{message}</p> : null}
      </div>
      <div className="divide-y divide-[#e2e8f0]">
        {assets.map((asset) => (
          <article key={asset.id} className="grid gap-4 px-5 py-4 sm:grid-cols-[72px_minmax(0,1fr)_180px_44px] sm:items-start">
            <div className="size-[72px] overflow-hidden border border-[#d5dfeb] bg-[#eef3f8]">
              <Image src={`/api/media/${asset.id}`} alt={asset.fileName} width={144} height={144} unoptimized className="size-full object-cover" />
            </div>
            <div className="min-w-0">
              <p className="truncate font-bold text-[var(--uel-navy)]">{asset.fileName}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">{asset.mimeType} · {formatBytes(asset.sizeBytes)} · {asset.width ?? "-"} × {asset.height ?? "-"} px</p>
              <p className="mt-2 text-xs text-[var(--muted)]">Tải lên bởi {asset.uploadedBy?.name ?? "Tài khoản đã xóa"} · {new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(asset.createdAt))}</p>
            </div>
            <div className="text-xs text-[var(--muted)]">
              <p className="font-bold uppercase text-[var(--uel-brand-blue)]">Đang sử dụng</p>
              <p className="mt-1">{asset.avatarFor ? `Ảnh đại diện · ${asset.avatarFor.name}` : "Chưa được sử dụng"}</p>
            </div>
            <button type="button" onClick={() => remove(asset)} title="Xóa ảnh" aria-label="Xóa ảnh" className="grid size-9 place-items-center text-[#b42318]"><Trash2 size={18} /></button>
          </article>
        ))}
        {!assets.length ? <p className="py-16 text-center text-sm text-[var(--muted)]">Chưa có ảnh nào được tải lên.</p> : null}
      </div>
    </section>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}
