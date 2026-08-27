"use client";

import { useMemo, useState } from "react";

export type MatrixFact = {
  fact_id: string;
  company: string;
  product: string | null;
  capability_code: string;
  l1_domain: string;
  l2_capability: string;
  l3_feature: string;
  ctv_native_relevance: boolean;
  status: string;
  maturity_score: number | null;
  format: string | null;
  environment: string | null;
  stage: string | null;
  execution_mode: string | null;
  media_model: string | null;
  confidence: string | null;
  strategic_significance: number | null;
  peer39_position: string | null;
  last_verified: string | null;
  platforms: string[] | null;
  evidence: { claim: string; title: string | null; url: string | null }[] | null;
};

type CapabilityRow = {
  key: string;
  domain: string;
  capability: string;
  feature: string;
  ctv: boolean;
  facts: Record<string, MatrixFact[]>;
};

const companyOrder = ["Peer39", "DoubleVerify", "Integral Ad Science"];

function Status({ facts }: { facts?: MatrixFact[] }) {
  if (!facts?.length) return <span className="status unknown">—</span>;
  const status = facts[0].status || "Unknown";
  return <span className={`status ${status.toLowerCase().replace(/\s+/g, "-")}`}>{status}</span>;
}

export default function MatrixClient({ facts }: { facts: MatrixFact[] }) {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("");
  const [format, setFormat] = useState("");
  const [stage, setStage] = useState("");
  const [platform, setPlatform] = useState("");
  const [ctvOnly, setCtvOnly] = useState(false);
  const [aiOnly, setAiOnly] = useState(false);

  const domains = useMemo(() => [...new Set(facts.map(f => f.l1_domain))].sort(), [facts]);
  const formats = useMemo(() => [...new Set(facts.map(f => f.format).filter(Boolean) as string[])].sort(), [facts]);
  const stages = useMemo(() => [...new Set(facts.map(f => f.stage).filter(Boolean) as string[])].sort(), [facts]);
  const platforms = useMemo(() => [...new Set(facts.flatMap(f => f.platforms || []))].sort(), [facts]);

  const rows = useMemo(() => {
    const grouped = new Map<string, CapabilityRow>();
    for (const fact of facts) {
      const key = fact.capability_code;
      if (!grouped.has(key)) {
        grouped.set(key, {
          key,
          domain: fact.l1_domain,
          capability: fact.l2_capability,
          feature: fact.l3_feature,
          ctv: fact.ctv_native_relevance,
          facts: {},
        });
      }
      const row = grouped.get(key)!;
      row.facts[fact.company] ||= [];
      row.facts[fact.company].push(fact);
    }

    return [...grouped.values()].filter(row => {
      const rowFacts = Object.values(row.facts).flat();
      const q = search.toLowerCase();
      if (q && !`${row.domain} ${row.capability} ${row.feature}`.toLowerCase().includes(q)) return false;
      if (domain && row.domain !== domain) return false;
      if (format && !rowFacts.some(f => f.format === format)) return false;
      if (stage && !rowFacts.some(f => f.stage === stage)) return false;
      if (platform && !rowFacts.some(f => f.platforms?.includes(platform))) return false;
      if (ctvOnly && !row.ctv && !rowFacts.some(f => f.format === "CTV" || f.media_model === "CTV-specific")) return false;
      if (aiOnly && row.domain !== "AI & Agentic Activation" && !rowFacts.some(f => f.execution_mode === "AI-assisted" || f.execution_mode === "Autonomous")) return false;
      return true;
    });
  }, [facts, search, domain, format, stage, platform, ctvOnly, aiOnly]);

  return (
    <>
      <section className="filters">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search capabilities…" />
        <select value={domain} onChange={e => setDomain(e.target.value)}><option value="">All domains</option>{domains.map(v => <option key={v}>{v}</option>)}</select>
        <select value={format} onChange={e => setFormat(e.target.value)}><option value="">All formats</option>{formats.map(v => <option key={v}>{v}</option>)}</select>
        <select value={stage} onChange={e => setStage(e.target.value)}><option value="">All stages</option>{stages.map(v => <option key={v}>{v}</option>)}</select>
        <select value={platform} onChange={e => setPlatform(e.target.value)}><option value="">All platforms</option>{platforms.map(v => <option key={v}>{v}</option>)}</select>
        <button className={ctvOnly ? "active-filter" : ""} onClick={() => setCtvOnly(v => !v)}>CTV ONLY</button>
        <button className={aiOnly ? "active-filter" : ""} onClick={() => setAiOnly(v => !v)}>AI / AGENTIC</button>
      </section>

      <div className="result-count">{rows.length} capabilities shown</div>

      <section className="table-wrap">
        <table>
          <thead><tr><th>Capability</th><th>Peer39</th><th>DoubleVerify</th><th>IAS</th><th>Product / Integration</th><th>Stage</th><th>Evidence</th></tr></thead>
          <tbody>
            {rows.map(row => {
              const allFacts = Object.values(row.facts).flat();
              const primary = allFacts[0];
              const products = [...new Set(allFacts.map(f => f.product).filter(Boolean))];
              const rowPlatforms = [...new Set(allFacts.flatMap(f => f.platforms || []))];
              const evidence = allFacts.flatMap(f => f.evidence || [])[0];
              return (
                <tr key={row.key} className={row.ctv ? "ctv-row" : ""}>
                  <td><small>{row.domain} // {row.capability}</small><strong>{row.feature}</strong>{row.ctv && <em>CTV NATIVE</em>}</td>
                  {companyOrder.map(company => <td key={company}><Status facts={row.facts[company]} /></td>)}
                  <td><strong>{products.join(" · ") || "—"}</strong>{rowPlatforms.length > 0 && <small>{rowPlatforms.join(" · ")}</small>}</td>
                  <td>{[...new Set(allFacts.map(f => f.stage).filter(Boolean))].join(" · ") || "—"}</td>
                  <td>{evidence?.url ? <a className="evidence" href={evidence.url} target="_blank" rel="noreferrer">↗ {evidence.title || evidence.claim}</a> : <span className="evidence">{evidence?.claim || "—"}</span>}<small>{primary?.confidence ? `Confidence: ${primary.confidence}` : ""}{primary?.last_verified ? ` · Verified ${primary.last_verified}` : ""}</small></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
