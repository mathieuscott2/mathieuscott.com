import "./matrix.css";

type MatrixRow = {
  domain: string;
  capability: string;
  feature: string;
  ctv: boolean;
  peer39?: string;
  dv?: string;
  ias?: string;
  product?: string;
  platforms?: string;
  stage?: string;
  evidence?: string;
};

const rows: MatrixRow[] = [
  { domain: "Brand Safety & Suitability", capability: "Brand Suitability", feature: "Custom suitability controls", ctv: false, dv: "GA", product: "Authentic Brand Suitability", stage: "Pre-bid", evidence: "Official DV product documentation" },
  { domain: "Inventory & Media Quality", capability: "MFA", feature: "Made-for-Advertising detection", ctv: false, dv: "GA", product: "Authentic Brand Suitability", stage: "Pre + Post", evidence: "DV MFA tiered categories" },
  { domain: "Inventory & Media Quality", capability: "Synthetic Content", feature: "Generative AI content detection", ctv: false, dv: "GA", product: "DV AI Verification", platforms: "TTD · Amazon · Yahoo · Microsoft · YouTube", stage: "Pre-bid", evidence: "DV AI SlopStopper" },
  { domain: "CTV & Video Intelligence", capability: "CTV Intelligence", feature: "Program-level intelligence", ctv: true, dv: "GA", product: "Authentic Streaming TV", platforms: "TTD · Microsoft", stage: "Planning + Pre-bid", evidence: "DV Authentic Streaming TV" },
  { domain: "CTV & Video Intelligence", capability: "CTV Viewability", feature: "TV power-state awareness", ctv: true, dv: "GA", product: "Authentic Streaming TV", stage: "Post-bid", evidence: "DV Authentic Streaming TV" },
  { domain: "CTV & Video Intelligence", capability: "CTV Activation", feature: "OM SDK support", ctv: true, dv: "GA", product: "Authentic Streaming TV", stage: "Post-bid", evidence: "DV Authentic Streaming TV" },
  { domain: "AI & Agentic Activation", capability: "AI Planning", feature: "Natural-language planning agent", ctv: true, dv: "GA", product: "Authentic Streaming TV", stage: "Planning", evidence: "DV CES 2026 launch" },
  { domain: "AI & Agentic Activation", capability: "Autonomous Optimization", feature: "AI bid optimization", ctv: false, dv: "GA", product: "Scibids AI", platforms: "TTD · DV360 · Microsoft", stage: "In-flight", evidence: "Scibids AI product documentation" },
  { domain: "Fraud & IVT", capability: "Sophisticated IVT", feature: "SIVT detection", ctv: false, dv: "GA", product: "Authentic Ad", stage: "Pre + Post", evidence: "DV Fraud Lab" },
  { domain: "CTV & Video Intelligence", capability: "CTV Fraud", feature: "CTV-native fraud detection", ctv: true, dv: "GA", product: "Authentic Ad", stage: "Post-bid", evidence: "DV CTV documentation" },
  { domain: "Attention", capability: "Attention Measurement", feature: "Exposure + engagement scoring", ctv: false, dv: "GA", product: "Authentic Attention", stage: "Post-bid", evidence: "Authentic Attention" },
  { domain: "Measurement & Analytics", capability: "Reporting", feature: "Unified reporting platform", ctv: false, dv: "GA", product: "Pinnacle", stage: "Post-bid", evidence: "DV Pinnacle" },
];

const domains = [...new Set(rows.map((r) => r.domain))];

function Status({ value }: { value?: string }) {
  if (!value) return <span className="status unknown">—</span>;
  return <span className={`status ${value.toLowerCase()}`}>{value}</span>;
}

export default function CompetitiveAnalysis() {
  return (
    <main className="matrix-page">
      <header className="matrix-header">
        <div>
          <div className="eyebrow">PEER39 // COMPETITIVE INTELLIGENCE</div>
          <h1>COMPETITIVE<br />CAPABILITY MATRIX</h1>
          <p>Peer39 vs DoubleVerify vs IAS — capability, product, activation and evidence.</p>
        </div>
        <div className="header-stats"><b>228</b><span>CAPABILITIES</span><b>54</b><span>DV FACTS LOADED</span></div>
      </header>

      <section className="filters">
        <input placeholder="Search capabilities…" />
        <select defaultValue=""><option value="">All domains</option>{domains.map(d => <option key={d}>{d}</option>)}</select>
        <select defaultValue=""><option value="">All formats</option><option>CTV</option><option>OLV</option><option>Display</option></select>
        <select defaultValue=""><option value="">All stages</option><option>Planning</option><option>Pre-bid</option><option>Post-bid</option><option>In-flight</option></select>
        <select defaultValue=""><option value="">All platforms</option><option>The Trade Desk</option><option>DV360</option><option>Amazon DSP</option><option>Microsoft</option><option>YouTube</option></select>
        <button>CTV ONLY</button>
        <button>AI / AGENTIC</button>
      </section>

      <div className="matrix-note"><b>V1 DATA STATUS:</b> DoubleVerify cold start loaded. Peer39 and IAS cells intentionally remain unpopulated until evidence-backed cold starts are completed.</div>

      <section className="table-wrap">
        <table>
          <thead><tr><th>Capability</th><th>Peer39</th><th>DoubleVerify</th><th>IAS</th><th>Product / Integration</th><th>Stage</th><th>Evidence</th></tr></thead>
          <tbody>
            {rows.map((r, i) => <tr key={i} className={r.ctv ? "ctv-row" : ""}>
              <td><small>{r.domain}</small><strong>{r.feature}</strong>{r.ctv && <em>CTV NATIVE</em>}</td>
              <td><Status value={r.peer39} /></td>
              <td><Status value={r.dv} /></td>
              <td><Status value={r.ias} /></td>
              <td><strong>{r.product || "—"}</strong>{r.platforms && <small>{r.platforms}</small>}</td>
              <td>{r.stage || "—"}</td>
              <td><span className="evidence">↗ {r.evidence || "—"}</span></td>
            </tr>)}
          </tbody>
        </table>
      </section>

      <footer className="matrix-footer">DATA MODEL: L1 DOMAIN → L2 CAPABILITY → L3 FEATURE // LAST VERIFIED: AUG 27 2026</footer>
    </main>
  );
}
