import { AxiosHeaders } from "axios";
import { some, none } from "fp-ts/Option";
import { Direction } from "../Direction";
import { clues } from "../GeorgeHo";
import Clue from "./Clue";
import findByUUID from "./findByUUID";

jest.mock("../GeorgeHo", () => ({
  clues: {
    find: jest.fn(),
  },
}));

const mockCluesFind = clues.find as jest.MockedFn<typeof clues.find>;

describe("Clue.findByUUID", () => {
  describe("when there are no results for the given clue id", () => {
    it("returns a none", () => {
      mockCluesFind.mockResolvedValue({
        status: 0,
        statusText: "",
        headers: {},
        config: {
          headers: new AxiosHeaders(),
        },
        data: {
          database: "data",
          table: "clues",
          rows: [],
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
          primary_key_values: [],
          units: {},
          query_ms: 0,
          license: "",
          license_url: "",
        },
      });

      return findByUUID(1).then((actual) => {
        expect(actual).toEqual(none);
      });
    });
  });

  describe("when there are any results for the given clue id", () => {
    it("returns a some of a random clue in the results", () => {
      // NOTE: We don't _actually_ want randomness in our tests, we want to
      // confirm the logic in the function works as expected so we're mocking
      // Math.random to always return this nice value.
      jest.spyOn(global.Math, "random").mockReturnValue(0.123456789);

      mockCluesFind.mockResolvedValue({
        status: 0,
        statusText: "",
        headers: {},
        config: {
          headers: new AxiosHeaders(),
        },
        data: {
          database: "data",
          table: "clues",
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
          ],
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
          primary_key_values: [],
          units: {},
          query_ms: 0,
          license: "",
          license_url: "",
        },
      });

      return findByUUID(1).then((actual) => {
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
      });
    });
  });
});
