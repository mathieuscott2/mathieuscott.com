"use client";

import { useEffect, useMemo, useState } from "react";

type RecordItem = Record<string, unknown>;
const DATA_URL = "/movies-catalog.json";
const norm = (s: unknown) => String(s ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
function distance(a: string, b: string): number {
  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev.splice(0, prev.length, ...curr);
  }
  return prev[b.length];
}
function score(text: string, query: string): number {
  const t = norm(text), q = norm(query);
  if (!q) return 0;
  if (t === q) return 0;
  if (t.startsWith(q)) return 1;
  if (t.includes(q)) return 2;
  const words = t.split(" ");
  const qw = q.split(" ");
  if (qw.every(w => words.some(x => x.startsWith(w)))) return 3;
  const closest = Math.min(distance(t, q), ...words.map(w => distance(w, q)));
  return closest <= Math.max(1, Math.floor(q.length * 0.3)) ? 4 + closest : Infinity;
}
const titleKeys = ["title", "name", "primary_title", "original_title", "series_title", "movie_title", "show_title"];
function titleOf(row: RecordItem): string {
  const key = Object.keys(row).find(k => titleKeys.includes(k.toLowerCase().replace(/\s+/g, "_")));
  return String((key && row[key]) || Object.values(row).find(v => typeof v === "string" && v.trim()) || "Untitled");
}
export default function MoviesRankingPage() {
  const [rows, setRows] = useState<RecordItem[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(DATA_URL).then(async response => {
      if (!response.ok) throw new Error("The catalog has not been published yet.");
      const data: unknown = await response.json();
      if (!Array.isArray(data)) throw new Error("Catalog must be a JSON array of records.");
      setRows(data.filter((x): x is RecordItem => x !== null && typeof x === "object" && !Array.isArray(x)));
    }).catch(e => setError(e instanceof Error ? e.message : "Could not load catalog.")).finally(() => setLoading(false));
  }, []);
  const results = useMemo(() => {
    const q = norm(query);
    if (!q) return rows.slice(0, 100);
    return rows.map((row, index) => {
      const primary = score(titleOf(row), q);
      const original = score(String(row.original_title ?? ""), q);
      return { row, index, rank: Math.min(primary, original + 1) };
    }).filter(x => Number.isFinite(x.rank)).sort((a, b) => a.rank - b.rank || a.index - b.index).slice(0, 100).map(x => x.row);
  }, [query, rows]);
  return (
    <main style={{ minHeight: "100vh", background: "#0b1020", color: "#f1f5f9", fontFamily: "Arial, sans-serif", padding: "clamp(24px,5vw,72px)" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <a href="/" style={{ color: "#93c5fd", textDecoration: "none" }}>← mathieuscott.com</a>
        <header style={{ margin: "48px 0 32px" }}>
          <div style={{ color: "#a5b4fc", textTransform: "uppercase", letterSpacing: 3, fontSize: 12 }}>Searchable catalog</div>
          <h1 style={{ fontSize: "clamp(32px,5vw,56px)", lineHeight: 1.1, margin: "14px 0" }}>Movies & TV Show Ranking</h1>
          <p style={{ color: "#94a3b8", fontSize: 17 }}>Search titles and catalog details, even with partial names or typos.</p>
        </header>
        <label htmlFor="catalog-search" style={{ display: "block", marginBottom: 10, fontWeight: 600 }}>Search the catalog</label>
        <input id="catalog-search" type="search" autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search for a movie or TV show…" style={{ width: "100%", boxSizing: "border-box", padding: "18px 20px", borderRadius: 12, border: "1px solid #475569", background: "#172033", color: "white", fontSize: 18, outlineOffset: 3 }} />
        <p aria-live="polite" style={{ color: "#94a3b8", margin: "16px 0 24px" }}>{loading ? "Loading catalog…" : error ? error : `${results.length} result${results.length === 1 ? "" : "s"} displayed · ${rows.length} total titles${!query && rows.length > 100 ? " · showing first 100" : ""}`}</p>
        {!error && !loading && results.length === 0 && <p>No matches found. Try a shorter search.</p>}
        <div style={{ display: "grid", gap: 12 }}>
          {results.map((row, i) => <article key={i} style={{ padding: "18px 22px", borderRadius: 12, border: "1px solid #334155", background: "#151e30" }}>
            <h2 style={{ fontSize: 20, margin: "0 0 12px" }}>{titleOf(row)}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px" }}>
              {Object.entries(row).filter(([, v]) => true).map(([k, v]) => <div key={k} style={{ fontSize: 13, maxWidth: "100%", overflowWrap: "anywhere" }}><span style={{ color: "#94a3b8" }}>{k.replace(/_/g, " ")}: </span><span>{v === null || v === "" ? "N/A" : typeof v === "object" ? JSON.stringify(v) : String(v)}</span></div>)}
            </div>
          </article>)}
        </div>
      </div>
    </main>
  );
}
