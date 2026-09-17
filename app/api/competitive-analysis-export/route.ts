export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return Response.json({ error: "Supabase environment variables are not configured." }, { status: 500 });
  }

  const response = await fetch(
    `${url}/rest/v1/public_competitive_matrix?select=*&order=l1_domain.asc,l2_capability.asc,l3_feature.asc`,
    {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return Response.json({ error: `Supabase returned ${response.status}`, detail: await response.text() }, { status: 502 });
  }

  const facts = await response.json();
  return Response.json(facts, {
    headers: {
      "Content-Disposition": "attachment; filename=competitive-analysis-export.json",
      "Cache-Control": "no-store",
    },
  });
}
