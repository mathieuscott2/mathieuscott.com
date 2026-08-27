import "./matrix.css";
import MatrixClient, { type MatrixFact } from "./MatrixClient";

export const dynamic = "force-dynamic";

async function getFacts(): Promise<{ facts: MatrixFact[]; error?: string }> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return { facts: [], error: "Supabase environment variables are not configured yet." };
  }

  try {
    const response = await fetch(
      `${url}/rest/v1/public_competitive_matrix?select=*&order=l1_domain.asc,l2_capability.asc,l3_feature.asc`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      return { facts: [], error: `Supabase returned ${response.status}: ${await response.text()}` };
    }

    return { facts: (await response.json()) as MatrixFact[] };
  } catch (error) {
    return { facts: [], error: error instanceof Error ? error.message : "Unable to load Supabase data." };
  }
}

export default async function CompetitiveAnalysis() {
  const { facts, error } = await getFacts();

  return (
    <main className="matrix-page">
      <header className="matrix-header">
        <div>
          <div className="eyebrow">PEER39 // COMPETITIVE INTELLIGENCE</div>
          <h1>COMPETITIVE<br />CAPABILITY MATRIX</h1>
          <p>Peer39 vs DoubleVerify vs IAS — capability, product, activation, integrations and evidence.</p>
        </div>
        <div className="header-stats">
          <b>228</b><span>CAPABILITIES</span>
          <b>{facts.length}</b><span>LIVE FACTS</span>
        </div>
      </header>

      {error ? (
        <div className="matrix-note error-note"><b>SETUP REQUIRED:</b> {error}</div>
      ) : (
        <div className="matrix-note"><b>LIVE DATA:</b> This matrix is reading the public competitive-intelligence view in Supabase. Peer39 and IAS remain blank until their evidence-backed cold starts are loaded.</div>
      )}

      <MatrixClient facts={facts} />

      <footer className="matrix-footer">DATA MODEL: L1 DOMAIN → L2 CAPABILITY → L3 FEATURE // LIVE FROM SUPABASE</footer>
    </main>
  );
}
