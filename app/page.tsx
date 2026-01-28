// app/page.tsx
import { generateSportsTables } from "./lib/sportsTables";
import type { SportsTablesResponse } from "./types";



export const dynamic = "force-dynamic";

export default async function Home() {
  // Fresh on every request
  const data: SportsTablesResponse = generateSportsTables(new Date());

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-5xl px-6 py-14 space-y-16">
        {/* Top header */}
        <header className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/40 px-3 py-1 text-xs text-neutral-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
            <span>mathieuscott.com</span>
            <span className="text-neutral-600">/</span>
            <span>vibe-coding sandbox</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Product systems, shipped fast.
          </h1>

          <p className="text-neutral-400 max-w-3xl">
            Professional, geeky, signal-over-polish. AI-first product experiments,
            architecture patterns, and prototypes.
          </p>
        </header>

        {/* Section 1 */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
          <div className="space-y-4 leading-relaxed text-neutral-200">
            <p>
              I’m a product leader by trade and a builder by instinct. This space is my
              sandbox for vibe-coding, system thinking, and AI-first product experiments—where
              ideas move fast from concept to working architecture.
            </p>
            <p>
              With a background in connected TV, programmatic advertising, and large-scale
              platforms, I spend most of my time thinking about how complex systems should
              actually work for humans: clearer workflows, smarter automation, and products
              that feel obvious once they exist.
            </p>
            <p>
              Here, I explore AI-assisted product design, prototyping, and architectural
              patterns, pressure-testing ideas before they become roadmaps. Less polish, more
              signal. Curiosity over perfection.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-neutral-100 mb-4">
            Case study: Live Sports buying clarity
          </h2>
          <p className="text-neutral-200 leading-relaxed">
            Live sports operate on a highly specialized and unpredictable cadence, yet buyers
            should not need deep sports expertise to decide whether sports inventory aligns
            with their advertiser objectives. While there is no clean or reliable data layer
            that fully captures the real-time rhythm of sports—especially for playoffs and
            late-breaking matchups—I led the development of a standalone Live Sports platform
            leveraging patented technology to target only live sports, enabling buyers to
            make confident, informed go/no-go decisions despite schedule uncertainty. This
            platform emerged as the strongest solution to translate sports complexity into
            actionable buying clarity.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">
                Upcoming live sports: next 12 months
              </h2>
              <p className="text-neutral-400 text-sm">
                Generated on load • advertiser-facing framing • viewership estimates (U.S., millions)
              </p>
              <p className="text-neutral-600 text-xs mt-1">
                Window: {data.window.start} → {data.window.end}
              </p>
            </div>

            <div className="text-xs text-neutral-500">
              As of: <span className="text-neutral-300">{data.generatedAt}</span>
            </div>
          </div>

          <TableBlock title={data.tables[0].title} rows={data.tables[0].rows} />
          <TableBlock title={data.tables[1].title} rows={data.tables[1].rows} />
          <TableBlock title={data.tables[2].title} rows={data.tables[2].rows} />

          <footer className="pt-8 text-xs text-neutral-600">
            Debug endpoint:{" "}
            <a
              className="text-neutral-300 underline decoration-neutral-700 hover:decoration-neutral-400"
              href="/api/sports-tables"
            >
              /api/sports-tables
            </a>
          </footer>
        </section>
      </div>
    </main>
  );
}

function TableBlock({
  title,
  rows,
}: {
  title: string;
  rows: {
    sport: string;
    eventName: string;
    whyItMatters: string;
    projectedViewsMillions: number;
    dates: string;
  }[];
}) {
  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 overflow-hidden">
      <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
        <h3 className="font-semibold text-neutral-100">{title}</h3>
        <span className="text-xs text-neutral-500">{rows.length} items</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-950/40 text-neutral-300">
            <tr className="[&>th]:px-6 [&>th]:py-3 [&>th]:text-left [&>th]:font-medium">
              <th>Sport</th>
              <th>Event Name</th>
              <th>Why It Matters (Cultural Relevance)</th>
              <th className="whitespace-nowrap">Projected Views (U.S.)</th>
              <th className="whitespace-nowrap">Dates</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-neutral-800">
            {rows.map((r, idx) => (
              <tr key={`${r.eventName}-${idx}`} className="hover:bg-neutral-950/30">
                <td className="px-6 py-4 text-neutral-200 whitespace-nowrap">
                  {r.sport}
                </td>

                <td className="px-6 py-4 text-neutral-100 whitespace-nowrap">
                  {r.eventName}
                </td>

                <td className="px-6 py-4 text-neutral-300 min-w-[520px]">
                  {r.whyItMatters}
                </td>

                <td className="px-6 py-4 text-neutral-200 whitespace-nowrap">
                  {r.projectedViewsMillions.toFixed(1)}M
                </td>

                <td className="px-6 py-4 text-neutral-200 whitespace-nowrap">
                  {r.dates}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
