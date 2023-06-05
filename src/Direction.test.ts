import { left, right } from "fp-ts/Either";
import { Direction, fromString } from "./Direction";

describe("Direction.fromString", () => {
  describe("when the string is 'A'", () => {
    it("returns a right of Across", () => {
      const actual = fromString("A");

      const expected = right(Direction.Across);
      expect(actual).toEqual(expected);
    });
  });

  describe("when the string is 'a'", () => {
    it("returns a right of Across", () => {
      const actual = fromString("a");

      const expected = right(Direction.Across);
      expect(actual).toEqual(expected);
    });
  });

  describe("when the string is 'D'", () => {
    it("returns a right of Down", () => {
      const actual = fromString("D");

      const expected = right(Direction.Down);
      expect(actual).toEqual(expected);
    });
  });

  describe("when the string is 'd'", () => {
    it("returns a right of Down", () => {
      const actual = fromString("d");

      const expected = right(Direction.Down);
      expect(actual).toEqual(expected);
    });
  });

  describe("when the string is something else", () => {
    it("returns a left of a parse error", () => {
      const actual = fromString("hello");

      const expected = left(new Error("Cannot parse hello as a direction."));
      expect(actual).toEqual(expected);
    });
  });
});
