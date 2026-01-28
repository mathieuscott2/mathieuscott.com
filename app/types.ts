// app/types.ts

export type Sport = "Football" | "Basketball" | "Baseball" | "Hockey";

export type SportsTableRow = {
  sport: Sport;
  eventName: string;
  whyItMatters: string;
  projectedViewsMillions: number;
  dates: string;
};

export type SportsTable = {
  title: string;
  rows: SportsTableRow[];
};

export type SportsTablesResponse = {
  generatedAt: string;
  window: { start: string; end: string };
  tables: [SportsTable, SportsTable, SportsTable];
};
