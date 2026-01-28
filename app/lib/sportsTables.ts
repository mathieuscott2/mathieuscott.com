// app/lib/sportsTables.ts
import type { SportsTablesResponse, SportsTableRow } from "../types";

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

// Approximate “seasonal anchor” dates to keep it credible without hard dependencies.
function nextOccurrence(anchorMonthZeroBased: number, anchorDay: number, from: Date) {
  const y = from.getFullYear();
  const candidate = new Date(y, anchorMonthZeroBased, anchorDay);
  if (candidate < from) return new Date(y + 1, anchorMonthZeroBased, anchorDay);
  return candidate;
}

function withinWindow(d: Date, start: Date, end: Date) {
  return d >= start && d <= end;
}

function clampRowsToWindow(rows: SportsTableRow[], start: Date, end: Date) {
  // If a row has a YYYY-MM-DD inside `dates`, filter to the window.
  // If it’s a range or non-date string, keep it.
  return rows.filter((r) => {
    const m = r.dates.match(/\d{4}-\d{2}-\d{2}/);
    if (!m) return true;
    const d = new Date(m[0] + "T12:00:00Z");
    return withinWindow(d, start, end);
  });
}

export function generateSportsTables(now = new Date()): SportsTablesResponse {
  const start = now;
  const end = addMonths(start, 12);

  // Anchors (approximate)
  const superBowl = nextOccurrence(1, 9, start);        // Feb 9 (approx)
  const marchMadnessFinal = nextOccurrence(3, 6, start); // Apr 6 (approx)
  const ncaaWomenFinal = nextOccurrence(3, 5, start);    // Apr 5 (approx)
  const nbaFinals = nextOccurrence(5, 15, start);        // Jun 15 (approx)
  const stanleyCup = nextOccurrence(5, 10, start);       // Jun 10 (approx)
  const mlbWorldSeries = nextOccurrence(9, 25, start);   // Oct 25 (approx)
  const nflKickoff = nextOccurrence(8, 8, start);        // Sep 8 (approx)
  const cfpTitle = nextOccurrence(0, 12, start);         // Jan 12 (approx)
  const nhlWinterClassic = nextOccurrence(0, 1, start);  // Jan 1
  const mlbAllStar = nextOccurrence(6, 15, start);       // Jul 15 (approx)
  const nbaAllStar = nextOccurrence(1, 15, start);       // Feb 15 (approx)
  const wnbaFinals = nextOccurrence(9, 10, start);       // Oct 10 (approx)
  const littleLeague = nextOccurrence(7, 20, start);     // Aug 20 (approx)

  // Table 1: Tentpoles
  const table1: SportsTableRow[] = [
    {
      sport: "Football",
      eventName: `Super Bowl (${superBowl.getFullYear()})`,
      whyItMatters:
        "The biggest U.S. advertising stage: mass reach, multi-generational co-viewing, and premium cultural attention that drives broad brand recall.",
      projectedViewsMillions: 115.0,
      dates: iso(superBowl),
    },
    {
      sport: "Football",
      eventName: "NFL Playoffs (Divisional → Conference Championships)",
      whyItMatters:
        "Peak-intensity weeks where fan attention concentrates; ideal for high-impact storytelling, seasonal positioning, and premium share-of-voice.",
      projectedViewsMillions: 35.0,
      dates: `${superBowl.getFullYear()}-01-10 to ${superBowl.getFullYear()}-01-26`,
    },
    {
      sport: "Football",
      eventName: "College Football Playoff National Championship",
      whyItMatters:
        "A national, appointment-viewing moment with passionate fanbases and strong co-viewing—great for broad reach with high engagement.",
      projectedViewsMillions: 22.0,
      dates: iso(cfpTitle),
    },
    {
      sport: "Basketball",
      eventName: "NCAA Men’s Final Four & Championship",
      whyItMatters:
        "A cultural tentpole with office-pool energy and strong social chatter—brands can tap into ritual viewing and spring-season momentum.",
      projectedViewsMillions: 18.0,
      dates: iso(marchMadnessFinal),
    },
    {
      sport: "Basketball",
      eventName: "NBA Finals",
      whyItMatters:
        "Premium late-season drama with star-driven narratives—strong for brand salience, lifestyle alignment, and high-impact creative moments.",
      projectedViewsMillions: 12.0,
      dates: iso(nbaFinals),
    },
    {
      sport: "Baseball",
      eventName: "MLB World Series",
      whyItMatters:
        "Heritage sports + regional passion at national scale—great for consistent frequency, trust-building, and fall ritual brand association.",
      projectedViewsMillions: 11.0,
      dates: iso(mlbWorldSeries),
    },
    {
      sport: "Hockey",
      eventName: "Stanley Cup Final",
      whyItMatters:
        "High-intensity playoff storytelling and loyal audiences; strong for brands seeking emotional resonance and premium sports adjacency.",
      projectedViewsMillions: 5.0,
      dates: iso(stanleyCup),
    },
    {
      sport: "Football",
      eventName: "NFL Kickoff Weekend",
      whyItMatters:
        "A ‘back-to-routine’ cultural reset with massive tune-in—great for seasonal launches, product reveals, and broad awareness.",
      projectedViewsMillions: 24.0,
      dates: iso(nflKickoff),
    },
  ];

  // Table 2: Cultural moments
  const table2: SportsTableRow[] = [
    {
      sport: "Basketball",
      eventName: "NBA All-Star Weekend",
      whyItMatters:
        "A culture-forward weekend blending sports, music, and fashion—ideal for brands chasing social buzz, creators, and lifestyle relevance.",
      projectedViewsMillions: 7.0,
      dates: iso(nbaAllStar),
    },
    {
      sport: "Basketball",
      eventName: "NCAA Women’s Final Four & Championship",
      whyItMatters:
        "A fast-growing cultural moment with strong storytelling—great for brands aligning with momentum in women’s sports and modern fandom.",
      projectedViewsMillions: 9.0,
      dates: iso(ncaaWomenFinal),
    },
    {
      sport: "Hockey",
      eventName: "NHL Winter Classic",
      whyItMatters:
        "A visually iconic outdoor event that feels holiday-adjacent—great for seasonal brand imagery and premium moment marketing.",
      projectedViewsMillions: 2.5,
      dates: iso(nhlWinterClassic),
    },
    {
      sport: "Baseball",
      eventName: "MLB All-Star Week",
      whyItMatters:
        "Summer culture + leisure energy; strong for brands tied to travel, retail seasons, lifestyle storytelling, and community moments.",
      projectedViewsMillions: 7.0,
      dates: iso(mlbAllStar),
    },
    {
      sport: "Basketball",
      eventName: "WNBA Playoffs / Finals",
      whyItMatters:
        "High-growth audience with strong cultural alignment—smart for brands investing in modern sports narratives and engaged communities.",
      projectedViewsMillions: 1.4,
      dates: iso(wnbaFinals),
    },
    {
      sport: "Football",
      eventName: "Major College Rivalry Weekends",
      whyItMatters:
        "Rivalries drive ritual viewing and local pride—ideal for brands seeking authenticity, regional resonance, and high emotional engagement.",
      projectedViewsMillions: 8.0,
      dates: `${start.getFullYear()}-11-20 to ${start.getFullYear()}-11-30`,
    },
  ];

  // Table 3: Local / niche / unique buys
  const table3: SportsTableRow[] = [
    {
      sport: "Baseball",
      eventName: "Little League World Series",
      whyItMatters:
        "Community-first storytelling and family co-viewing; a strong fit for local advertisers and brands leaning into summer traditions.",
      projectedViewsMillions: 1.1,
      dates: iso(littleLeague),
    },
    {
      sport: "Hockey",
      eventName: "IIHF World Championship",
      whyItMatters:
        "International competition with passionate hockey audiences—ideal for distinctive sports adjacency and global flavor in creative.",
      projectedViewsMillions: 0.6,
      dates: `${start.getFullYear()}-05-10 to ${start.getFullYear()}-05-26`,
    },
    {
      sport: "Hockey",
      eventName: "AHL Calder Cup Playoffs",
      whyItMatters:
        "A strong local-market activation with arena communities; solid for regional brands targeting engaged fans with repeat exposure.",
      projectedViewsMillions: 0.3,
      dates: `${start.getFullYear()}-04-20 to ${start.getFullYear()}-06-20`,
    },
    {
      sport: "Baseball",
      eventName: "MLB Opening Week",
      whyItMatters:
        "Seasonal reset energy and local passion—reliable window for geo-targeted messaging and springtime brand momentum.",
      projectedViewsMillions: 1.8,
      dates: `${start.getFullYear()}-03-25 to ${start.getFullYear()}-04-05`,
    },
    {
      sport: "Basketball",
      eventName: "WNBA Opening Month",
      whyItMatters:
        "A growing audience with strong community connection—great for brands emphasizing modern sports culture and positive momentum.",
      projectedViewsMillions: 0.7,
      dates: `${start.getFullYear()}-05-15 to ${start.getFullYear()}-06-15`,
    },
    {
      sport: "Football",
      eventName: "NCAA Bowl Season (select marquee bowls)",
      whyItMatters:
        "Holiday-season co-viewing plus regional pride—smart for brands wanting seasonal warmth with targeted reach by market and fanbase.",
      projectedViewsMillions: 6.0,
      dates: `${start.getFullYear()}-12-15 to ${start.getFullYear() + 1}-01-05`,
    },
  ];

  const t1 = clampRowsToWindow(table1, start, end);
  const t2 = clampRowsToWindow(table2, start, end);
  const t3 = clampRowsToWindow(table3, start, end);

  return {
    generatedAt: new Date().toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }),
    window: { start: iso(start), end: iso(end) },
    tables: [
      { title: "Must-buy tentpoles for big-brand advertisers", rows: t1 },
      { title: "Cultural moments for brand building, social buzz, and trend alignment", rows: t2 },
      { title: "Local advertisers, niche & unique buys", rows: t3 },
    ],
  };
}
