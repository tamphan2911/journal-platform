import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { authorizeAdminApi } from "@/lib/admin-auth";
import { defaultSiteSettings, siteSettingDefinitions } from "@/lib/site-settings";
import { prisma } from "@/lib/prisma";

const schema = z.object({ settings: z.record(z.string(), z.string().trim().min(1).max(300)) });

export async function PUT(request: Request) {
  const auth = await authorizeAdminApi();
  if ("response" in auth) return auth.response;
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Cấu hình chưa hợp lệ." }, { status: 422 });

  const allowed = new Set(Object.keys(defaultSiteSettings));
  const updates = siteSettingDefinitions
    .filter((definition) => allowed.has(definition.key) && parsed.data.settings[definition.key] !== undefined)
    .map((definition) => prisma.siteSetting.upsert({
      where: { key: definition.key },
      update: { value: parsed.data.settings[definition.key], group: definition.group, label: definition.label },
      create: { key: definition.key, value: parsed.data.settings[definition.key], group: definition.group, label: definition.label },
    }));
  await prisma.$transaction(updates);
  revalidateTag("site-settings", { expire: 0 });
  return NextResponse.json({ ok: true });
}
