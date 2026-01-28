// app/api/sports-tables/route.ts
import { NextResponse } from "next/server";
import { generateSportsTables } from "@/app/lib/sportsTables";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const payload = generateSportsTables(new Date());
  return NextResponse.json(payload, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}
