import { Direction } from "../Direction";
import Clue from "./Clue";
import fromRow from "./fromRow";

describe("Clue.fromRow", () => {
  describe("when the row is missing the clue", () => {
    it("throws an error", () => {
      expect(() =>
        fromRow([
          1,
          null,
          "TEST",
          null,
          "1a",
          "2022-01-01",
          "Test Cryptic Puzzle",
          null,
          null,
        ])
      ).toThrowError("Missing required value.");
    });
  });

  describe("when the row is missing the answer", () => {
    it("throws an error", () => {
      expect(() =>
        fromRow([
          1,
          "Touchy having failed to finish exam (4)",
          null,
          null,
          "1a",
          "2022-01-01",
          "Test Cryptic Puzzle",
          null,
          null,
        ])
      ).toThrowError("Missing required value.");
    });
  });

  describe("when the row is missing the clue_number", () => {
    it("throws an error", () => {
      expect(() =>
        fromRow([
          1,
          "Touchy having failed to finish exam (4)",
          "TEST",
          null,
          null,
          "2022-01-01",
          "Test Cryptic Puzzle",
          null,
          null,
        ])
      ).toThrowError("Missing required value.");
    });
  });

  describe("when the row is missing the puzzle_date", () => {
    it("throws an error", () => {
      expect(() =>
        fromRow([
          1,
          "Touchy having failed to finish exam (4)",
          "TEST",
          null,
          "1a",
          null,
          "Test Cryptic Puzzle",
          null,
          null,
        ])
      ).toThrowError("Missing required value.");
    });
  });

  describe("when the row is missing the puzzle_name", () => {
    it("throws an error", () => {
      expect(() =>
        fromRow([
          1,
          "Touchy having failed to finish exam (4)",
          "TEST",
          null,
          "1a",
          "2022-01-01",
          null,
          null,
          null,
        ])
      ).toThrowError("Missing required value.");
    });
  });

  describe("when the row's clue_number is not a clue id string", () => {
    it("throws an error", () => {
      expect(() =>
        fromRow([
          1,
          "Touchy having failed to finish exam (4)",
          "TEST",
          null,
          "hello",
          "2022-01-01",
          "Test Cryptic Puzzle",
          null,
          null,
        ])
      ).toThrowError("Cannot create a clue with an invalid id.");
    });
  });

  describe("when the row is complete with a valid clue_number", () => {
    it("returns a Clue", () => {
      const actual = fromRow([
        1,
        "Touchy having failed to finish exam (4)",
        "TEST",
        null,
        "1a",
        "2022-01-01",
        "Test Cryptic Puzzle",
        null,
        null,
      ]);

      const expected = new Clue(
        { index: 1, direction: Direction.Across },
        "Touchy having failed to finish exam (4)",
        "TEST",
        "Test Cryptic Puzzle_2022-01-01",
        1
      );
      expect(actual).toEqual(expected);
    });
  });
});
