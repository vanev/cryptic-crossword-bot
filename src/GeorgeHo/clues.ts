import request from "./request";

type SelectParams = {
  rowid?: number;
  clue?: string;
  answer?: string;
  definition?: string;
  clue_number?: string;
  puzzle_date?: string;
  puzzle_name?: string;
  source_url?: string;
  source?: string;
};

type SelectResponse = {
  database: "data";
  table: "clues";
  is_view: boolean;
  human_description_en: string;
  rows: Array<
    [
      number,
      string | null,
      string | null,
      string | null,
      string | null,
      string | null,
      string | null,
      string | null,
      string | null
    ]
  >;
  truncated: boolean;
  filtered_table_rows_count: number;
  expanded_columns: Array<unknown>; // Probably string?
  expandable_columns: Array<unknown>; // Probably string?
  columns: [
    "rowid",
    "clue",
    "answer",
    "definition",
    "clue_number",
    "puzzle_date",
    "puzzle_name",
    "source_url",
    "source"
  ];
  primary_keys: Array<string>;
  units: unknown; // Some kind of Record?
  query: {
    sql: string;
    params: Record<string, string>;
  };
  facet_results: unknown; // Some kind of Record?
  suggested_facets: Array<unknown>; // Probably string?
  next: string;
  next_url: string;
  private: boolean;
  allow_execute_sql: boolean;
  query_ms: number;
  license: string;
  license_url: string;
};

export const select = (data?: SelectParams) =>
  request.get<SelectResponse>("clues.json", {
    data,
  });

type FindResponse = {
  database: string;
  table: string;
  rows: Array<
    [
      number,
      string | null,
      string | null,
      string | null,
      string | null,
      string | null,
      string | null,
      string | null,
      string | null
    ]
  >;
  columns: [
    "rowid",
    "clue",
    "answer",
    "definition",
    "clue_number",
    "puzzle_date",
    "puzzle_name",
    "source_url",
    "source"
  ];
  primary_keys: Array<string>;
  primary_key_values: Array<string>;
  units: unknown; // Some kind of Record?
  query_ms: number;
  license: string;
  license_url: string;
};

export const find = (id: number) =>
  request.get<FindResponse>(`clues/${id}.json`);
