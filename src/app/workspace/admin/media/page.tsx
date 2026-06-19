import { MediaManager } from "@/components/media-manager";
import { prisma } from "@/lib/prisma";

export default async function AdminMediaPage() {
  const records = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      fileName: true,
      mimeType: true,
      sizeBytes: true,
      width: true,
      height: true,
      createdAt: true,
      uploadedBy: { select: { name: true, email: true } },
      avatarFor: { select: { name: true, email: true } },
    },
  });
  const assets = records.map((asset) => ({ ...asset, createdAt: asset.createdAt.toISOString() }));

  return (
    <div>
      <p className="section-kicker">Quản lý website</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[var(--uel-navy)]">Thư viện ảnh</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">Kiểm tra dung lượng, mục đích sử dụng và xóa các ảnh do người dùng tải lên.</p>
      <div className="mt-6"><MediaManager initialAssets={assets} /></div>
    </div>
  );
}
