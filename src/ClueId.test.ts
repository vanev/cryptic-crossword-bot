import { left, right } from "fp-ts/Either";
import { fromString, toString } from "./ClueId";
import { Direction } from "./Direction";

describe("ClueId.fromString", () => {
  describe("when the string is a clue id string", () => {
    it("returns a right of a clue id", () => {
      const actual = fromString("10a");

      const expected = right({ index: 10, direction: Direction.Across });
      expect(actual).toEqual(expected);
    });
  });

  describe("when the string is not a clue id string", () => {
    it("returns a left of a parse error", () => {
      const actual = fromString("hello");

      const expected = left(new Error("Cannot parse hello as a clue id."));
      expect(actual).toEqual(expected);
    });
  });
});

describe("ClueId.toString", () => {
  it("returns the clue id as a string", () => {
    const actual = toString({ index: 10, direction: Direction.Across });

    const expected = "10a";
    expect(actual).toEqual(expected);
  });
});
