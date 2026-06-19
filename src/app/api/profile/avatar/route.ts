import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import sharp from "sharp";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

const maxUploadBytes = 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export const runtime = "nodejs";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ error: "Bạn cần đăng nhập." }, { status: 401 });

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxUploadBytes + 128 * 1024) return NextResponse.json({ error: "Ảnh đại diện không được vượt quá 1 MB." }, { status: 413 });

  const formData = await request.formData();
  const file = formData.get("avatar");
  if (!(file instanceof File)) return NextResponse.json({ error: "Vui lòng chọn một tệp ảnh." }, { status: 422 });
  if (!allowedTypes.has(file.type)) return NextResponse.json({ error: "Chỉ chấp nhận ảnh JPG, PNG hoặc WebP." }, { status: 415 });
  if (file.size > maxUploadBytes) return NextResponse.json({ error: "Ảnh đại diện không được vượt quá 1 MB." }, { status: 413 });

  try {
    const transformed = await sharp(Buffer.from(await file.arrayBuffer()))
      .rotate()
      .resize(800, 800, { fit: "cover", position: "attention", withoutEnlargement: true })
      .webp({ quality: 84 })
      .toBuffer({ resolveWithObject: true });

    const asset = await prisma.mediaAsset.create({
      data: {
        fileName: `${file.name.replace(/\.[^.]+$/, "").slice(0, 100) || "avatar"}.webp`,
        mimeType: "image/webp",
        sizeBytes: transformed.data.byteLength,
        width: transformed.info.width,
        height: transformed.info.height,
        data: Uint8Array.from(transformed.data),
        uploadedById: currentUser.id,
      },
      select: { id: true },
    });

    await prisma.user.update({ where: { id: currentUser.id }, data: { avatarId: asset.id } });
    revalidateTag("journal-members", { expire: 0 });
    return NextResponse.json({ avatarId: asset.id, url: `/api/media/${asset.id}` }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Tệp đã chọn không phải ảnh hợp lệ." }, { status: 422 });
  }
}
