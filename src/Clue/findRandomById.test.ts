import { AxiosHeaders } from "axios";
import { some, none } from "fp-ts/Option";
import { Direction } from "../Direction";
import { clues } from "../GeorgeHo";
import Clue from "./Clue";
import findRandomById from "./findRandomById";

jest.mock("../GeorgeHo", () => ({
  clues: {
    select: jest.fn(),
  },
}));

const mockCluesSelect = clues.select as jest.MockedFn<typeof clues.select>;

describe("Clue.findRandomById", () => {
  describe("when there are no results for the given clue id", () => {
    it("returns a none", () => {
      mockCluesSelect.mockResolvedValue({
        status: 0,
        statusText: "",
        headers: {},
        config: {
          headers: new AxiosHeaders(),
        },
        data: {
          database: "data",
          table: "clues",
          is_view: false,
          human_description_en: "",
          rows: [],
          truncated: false,
          filtered_table_rows_count: 0,
          expanded_columns: [],
          expandable_columns: [],
          columns: [
            "rowid",
            "clue",
            "answer",
            "definition",
            "clue_number",
            "puzzle_date",
            "puzzle_name",
            "source_url",
            "source",
          ],
          primary_keys: [],
          units: {},
          query: {
            sql: "",
            params: {},
          },
          facet_results: {},
          suggested_facets: [],
          next: "",
          next_url: "",
          private: false,
          allow_execute_sql: false,
          query_ms: 0,
          license: "",
          license_url: "",
        },
      });

      return findRandomById({ index: 1, direction: Direction.Across }).then(
        (actual) => {
          expect(actual).toEqual(none);
        }
      );
    });
  });

  describe("when there are any results for the given clue id", () => {
    it("returns a some of a random clue in the results", () => {
      // NOTE: We don't _actually_ want randomness in our tests, we want to
      // confirm the logic in the function works as expected so we're mocking
      // Math.random to always return this nice value.
      jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);

      mockCluesSelect.mockResolvedValue({
        status: 0,
        statusText: "",
        headers: {},
        config: {
          headers: new AxiosHeaders(),
        },
        data: {
          database: "data",
          table: "clues",
          is_view: false,
          human_description_en: "",
          rows: [
            [
              1,
              "Initial tree on street (5)",
              "FIRST",
              null,
              "1a",
              "2022-01-01",
              "Test Cryptic Puzzle",
              null,
              null,
            ],
            [
              2,
              "This succeeds first time (6)",
              "SECOND",
              null,
              "2d",
              "2022-01-01",
              "Test Cryptic Puzzle",
              null,
              null,
            ],
          ],
          truncated: false,
          filtered_table_rows_count: 0,
          expanded_columns: [],
          expandable_columns: [],
          columns: [
            "rowid",
            "clue",
            "answer",
            "definition",
            "clue_number",
            "puzzle_date",
            "puzzle_name",
            "source_url",
            "source",
          ],
          primary_keys: [],
          units: {},
          query: {
            sql: "",
            params: {},
          },
          facet_results: {},
          suggested_facets: [],
          next: "",
          next_url: "",
          private: false,
          allow_execute_sql: false,
          query_ms: 0,
          license: "",
          license_url: "",
        },
      });

      return findRandomById({ index: 1, direction: Direction.Across }).then(
        (actual) => {
          expect(actual).toEqual(
            some(
              new Clue(
                { index: 1, direction: Direction.Across },
                "Initial tree on street (5)",
                "FIRST",
                "Test Cryptic Puzzle_2022-01-01",
                1
              )
            )
          );
        }
      );
    });
  });
});
